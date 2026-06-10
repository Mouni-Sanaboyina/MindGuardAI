import time, base64, asyncio, tempfile, logging, subprocess, glob
from pathlib import Path
from fastapi import APIRouter, UploadFile, File, HTTPException
from services.bytez_service import transcribe_audio_bytez, analyse_text_bytez, analyse_image_bytez
from core.models import ModerationReport, TimestampFlag, compute_risk_level, compute_action
from core.config import settings

logger = logging.getLogger("mindguard.video")
router = APIRouter()

FRAME_INTERVAL = 10  # seconds
MAX_FRAMES = 8

def _extract_audio(video_path: str, audio_path: str) -> bool:
    r = subprocess.run(["ffmpeg", "-y", "-i", video_path, "-vn", "-acodec", "libmp3lame", "-q:a", "4", audio_path], capture_output=True)
    return r.returncode == 0

def _extract_frames(video_path: str, frames_dir: str) -> list:
    subprocess.run(["ffmpeg", "-y", "-i", video_path, "-vf", f"fps=1/{FRAME_INTERVAL},scale=640:-1", f"{frames_dir}/frame_%06d.jpg"], capture_output=True)
    frames = sorted(glob.glob(f"{frames_dir}/frame_*.jpg"))
    return [(i * FRAME_INTERVAL, p) for i, p in enumerate(frames[:MAX_FRAMES])]

def _fmt_time(s: float) -> str:
    m, sec = divmod(int(s), 60)
    return f"{m}:{sec:02d}"

@router.post("/", response_model=ModerationReport)
async def analyse_video(file: UploadFile = File(...)):
    start = time.perf_counter()
    video_bytes = await file.read()
    size_mb = len(video_bytes) / (1024 * 1024)
    if size_mb > settings.MAX_VIDEO_MB:
        raise HTTPException(status_code=413, detail=f"Video too large. Max: {settings.MAX_VIDEO_MB}MB.")

    with tempfile.TemporaryDirectory() as tmpdir:
        video_path = f"{tmpdir}/input{Path(file.filename or 'v.mp4').suffix}"
        with open(video_path, "wb") as f: f.write(video_bytes)
        audio_path = f"{tmpdir}/audio.mp3"
        frames_dir = f"{tmpdir}/frames"
        Path(frames_dir).mkdir(exist_ok=True)

        audio_ok = _extract_audio(video_path, audio_path)
        frame_list = _extract_frames(video_path, frames_dir)

        # Transcription
        transcript, segments, audio_risk, text_toxicity = "", [], 0, {}
        if audio_ok:
            try:
                with open(audio_path, "rb") as af:
                    tr = await transcribe_audio_bytez(af.read(), "audio.mp3")
                transcript = tr.get("text", "").strip()
                if transcript:
                    text_toxicity = await analyse_text_bytez(transcript)
                    audio_risk = int(text_toxicity.get("riskScore", 0))
            except Exception as e:
                logger.warning(f"Audio processing failed: {e}")

        # Frame analysis
        async def _analyse_frame(ts, path):
            try:
                with open(path, "rb") as f:
                    b64 = base64.b64encode(f.read()).decode()
                r = await analyse_image_bytez(b64)
                return {"ts": ts, "result": r}
            except Exception as e:
                return {"ts": ts, "result": None, "error": str(e)}

        frame_results = await asyncio.gather(*[_analyse_frame(ts, p) for ts, p in frame_list], return_exceptions=True)

        # Build timestamps
        all_ts = []
        if audio_risk >= 35 and transcript:
            all_ts.append(TimestampFlag(time="0:00", time_seconds=0, label=f"Audio: {transcript[:80]}", score=audio_risk, modality="audio"))

        visual_scores = []
        for fr in frame_results:
            if isinstance(fr, Exception) or not fr.get("result"): continue
            r = fr["result"]
            fscore = int(r.get("riskScore", 0))
            visual_scores.append(fscore)
            if fscore >= 35:
                all_ts.append(TimestampFlag(time=_fmt_time(fr["ts"]), time_seconds=fr["ts"],
                    label=f"Visual: {r.get('description', 'Content flagged')}", score=fscore, modality="visual"))

        all_ts.sort(key=lambda x: x.time_seconds)
        max_visual = max(visual_scores) if visual_scores else 0
        overall = max(audio_risk, max_visual)
        risk_level = compute_risk_level(overall)

        categories = {k: int(v) for k, v in text_toxicity.get("categories", {}).items()}
        elapsed = round((time.perf_counter() - start) * 1000, 2)

        return ModerationReport(
            content_type="video", risk_score=overall, risk_level=risk_level,
            flagged=overall >= 35, recommended_action=compute_action(risk_level),
            categories=categories, transcript=transcript or None,
            timestamps=all_ts[:12], processing_time_ms=elapsed,
            model_used="Bytez / Whisper + BLIP",
        )
