import time
import logging

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException
)

from services.azure_service import (
    transcribe_audio_azure,
    analyse_text_azure
)

from core.models import (
    ModerationReport,
    TimestampFlag,
    compute_risk_level,
    compute_action
)

from core.config import settings

logger = logging.getLogger("mindguard.audio")

router = APIRouter()


@router.post("/", response_model=ModerationReport)
async def analyse_audio(
    file: UploadFile = File(...)
):

    start = time.perf_counter()

    audio_bytes = await file.read()

    size_mb = len(audio_bytes) / (1024 * 1024)

    if size_mb > settings.MAX_AUDIO_MB:

        raise HTTPException(
            status_code=413,
            detail=f"Audio too large ({size_mb:.1f} MB). Max allowed: {settings.MAX_AUDIO_MB} MB"
        )

    try:

        transcript = await transcribe_audio_azure(
            audio_bytes
        )

    except Exception as e:

        logger.exception(
            "Audio transcription failed"
        )

        raise HTTPException(
            status_code=502,
            detail=f"Transcription error: {str(e)}"
        )

    transcript = transcript.strip()

    if not transcript:

        return ModerationReport(
            content_type="audio",
            risk_score=0,
            risk_level="low",
            flagged=False,
            recommended_action="Safe to publish",
            categories={
                "speech_detected": 0
            },
            transcript="[No speech detected]",
            timestamps=[],
            processing_time_ms=round(
                (
                    time.perf_counter() - start
                ) * 1000,
                2
            ),
            model_used="Groq Whisper Large V3"
        )

    try:

        toxicity = await analyse_text_azure(
            transcript
        )

    except Exception as e:

        logger.exception(
            "Audio moderation failed"
        )

        raise HTTPException(
            status_code=502,
            detail=f"Moderation error: {str(e)}"
        )

    risk_score = int(
        toxicity.get(
            "riskScore",
            0
        )
    )

    categories = {
        k: int(v)
        for k, v in toxicity.get(
            "categories",
            {}
        ).items()
    }

    flagged = toxicity.get(
        "flagged",
        risk_score >= 65
    )

    risk_level = compute_risk_level(
        risk_score
    )

    timestamps = []

    if flagged:

        timestamps.append(
            TimestampFlag(
                time="0:00",
                time_seconds=0,
                label="Toxic speech detected",
                score=risk_score,
                modality="audio"
            )
        )

    elapsed = round(
        (
            time.perf_counter()
            - start
        ) * 1000,
        2
    )

    return ModerationReport(
        content_type="audio",
        risk_score=risk_score,
        risk_level=risk_level,
        flagged=flagged,
        recommended_action=compute_action(
            risk_level
        ),
        categories=categories,
        transcript=transcript,
        timestamps=timestamps,
        processing_time_ms=elapsed,
        model_used="Groq Whisper Large V3 + Detoxify + GPT-4.1-mini"
    )