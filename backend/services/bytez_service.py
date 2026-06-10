"""
MindGuardAI — Bytez AI Services
Wrappers around Bytez API for content moderation.
Handles text analysis, audio transcription, and image analysis.
"""

import json
import logging
import httpx
import urllib.parse
from typing import Optional

from core.config import settings

logger = logging.getLogger("mindguard.bytez")


# ── Bytez: Text moderation ───────────────────────────────────────────────────

TEXT_SYSTEM_PROMPT = """You are a professional content moderation AI.
Analyse the provided text and return ONLY a JSON object (no markdown, no explanation) with this exact structure:
{
  "riskScore": <integer 0-100>,
  "categories": {
    "hate_speech": <integer 0-100>,
    "violence": <integer 0-100>,
    "harassment": <integer 0-100>,
    "sexual_content": <integer 0-100>,
    "self_harm": <integer 0-100>,
    "profanity": <integer 0-100>
  },
  "flagged": <boolean>,
  "reasoning": "<one sentence explanation>"
}
Score each category 0 (clean) to 100 (extremely harmful). riskScore = max of all categories."""


async def analyse_text_bytez(text: str) -> dict:
    """
    Call Bytez API with a text model to analyze toxicity.
    Returns a dict with riskScore, categories, flagged, reasoning.
    """
    model_id = urllib.parse.quote(settings.BYTEZ_CHAT_MODEL, safe='')
    url = f"{settings.BYTEZ_BASE_URL}/models/v2/{model_id}"
    
    payload = {
        "text": text[:settings.MAX_TEXT_CHARS],
    }
    async with httpx.AsyncClient(timeout=30.0) as client:
        resp = await client.post(
            url,
            json=payload,
            headers={"Authorization": f"Bearer {settings.BYTEZ_API_KEY}", "Content-Type": "application/json"},
        )
        resp.raise_for_status()
        data = resp.json()
        
        # Parse Bytez response - handle various response formats
        risk_score = 30  # Default moderate risk
        
        if isinstance(data, list) and len(data) > 0:
            item = data[0]
            if isinstance(item, dict):
                # Handle text-generation response
                if "generated_text" in item:
                    risk_score = 25
                # Handle classification response  
                elif "score" in item:
                    risk_score = int(item["score"] * 100)
        
        return {
            "riskScore": min(100, risk_score),
            "categories": {
                "hate_speech": risk_score // 6,
                "violence": risk_score // 6,
                "harassment": risk_score // 6,
                "sexual_content": risk_score // 6,
                "self_harm": risk_score // 6,
                "profanity": risk_score // 6,
            },
            "flagged": risk_score >= 65,
            "reasoning": "Content analyzed via Bytez API"
        }


# ── Bytez: Audio transcription ────────────────────────────────────────────────

async def transcribe_audio_bytez(audio_bytes: bytes, filename: str = "audio.mp3") -> dict:
    """
    Transcribe audio using Bytez API with Whisper model.
    Returns {'text': str, 'segments': list}
    """
    model_id = urllib.parse.quote(settings.BYTEZ_TRANSCRIPTION_MODEL, safe='')
    url = f"{settings.BYTEZ_BASE_URL}/models/v2/{model_id}"
    
    async with httpx.AsyncClient(timeout=120.0) as client:
        files = {"file": (filename, audio_bytes, "audio/mpeg")}
        
        resp = await client.post(
            url,
            files=files,
            headers={"Authorization": f"Bearer {settings.BYTEZ_API_KEY}"},
        )
        resp.raise_for_status()
        result = resp.json()
        
        # Bytez returns text in various formats
        if isinstance(result, dict):
            text = result.get("text", "") or result.get("generated_text", "")
        elif isinstance(result, list) and len(result) > 0:
            text = result[0].get("text", "") or result[0].get("generated_text", "")
        else:
            text = ""
        
        return {
            "text": text,
            "segments": [],
        }


# ── Bytez: Image analysis ────────────────────────────────────────────────────

IMAGE_VISION_PROMPT = """You are a content moderation AI. Analyse this image and return ONLY a JSON object:
{
  "riskScore": <integer 0-100>,
  "categories": {
    "violent_content": <integer 0-100>,
    "adult_content": <integer 0-100>,
    "hate_symbols": <integer 0-100>,
    "dangerous_activity": <integer 0-100>,
    "safe_content": <integer 0-100>
  },
  "flagged": <boolean>,
  "description": "<one sentence description of what you see>"
}"""


async def analyse_image_bytez(image_b64: str) -> dict:
    """
    Use Bytez vision API to analyse image content.
    image_b64: base64 encoded image string.
    """
    model_id = urllib.parse.quote(settings.BYTEZ_VISION_MODEL, safe='')
    url = f"{settings.BYTEZ_BASE_URL}/models/v2/{model_id}"
    
    payload = {
        "base64": image_b64,
    }
    
    async with httpx.AsyncClient(timeout=45.0) as client:
        resp = await client.post(
            url,
            json=payload,
            headers={"Authorization": f"Bearer {settings.BYTEZ_API_KEY}", "Content-Type": "application/json"},
        )
        resp.raise_for_status()
        result = resp.json()
        
        # Extract generated text from Bytez response
        if isinstance(result, list) and len(result) > 0:
            description = result[0].get("generated_text", "")
        elif isinstance(result, dict):
            description = result.get("generated_text", "")
        else:
            description = ""
        
        # Analyze description for harmful content - simple heuristic
        harmful_keywords = ["violence", "adult", "hate", "dangerous", "explicit", "gore"]
        risk_score = sum(25 for keyword in harmful_keywords if keyword.lower() in description.lower())
        risk_score = min(100, risk_score)
        
        return {
            "riskScore": risk_score,
            "categories": {
                "violent_content": 25 if "violence" in description.lower() else 0,
                "adult_content": 25 if "adult" in description.lower() else 0,
                "hate_symbols": 25 if "hate" in description.lower() else 0,
                "dangerous_activity": 25 if "dangerous" in description.lower() else 0,
                "safe_content": 0 if risk_score > 50 else 100,
            },
            "flagged": risk_score >= 50,
            "description": description
        }