from detoxify import Detoxify
from nudenet import NudeDetector
from openai import AzureOpenAI
from groq import Groq

from services.clip_service import (
    generate_caption,
    detect_labels
)

from core.config import settings

import tempfile
import os
import json

# -------------------------
# LOAD MODELS
# -------------------------

detox = Detoxify("original")
detector = NudeDetector()

azure_client = AzureOpenAI(
    api_key=settings.AZURE_OPENAI_API_KEY,
    api_version="2024-12-01-preview",
    azure_endpoint=settings.AZURE_OPENAI_ENDPOINT
)

groq_client = Groq(
    api_key=settings.GROQ_API_KEY
)

# -------------------------
# AUDIO TRANSCRIPTION
# -------------------------

async def transcribe_audio_azure(audio_bytes: bytes):

    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".wav"
    ) as tmp:

        tmp.write(audio_bytes)
        audio_path = tmp.name

    try:

        with open(audio_path, "rb") as audio_file:

            transcription = groq_client.audio.transcriptions.create(
                file=audio_file,
                model="whisper-large-v3"
            )

        return transcription.text

    finally:

        if os.path.exists(audio_path):
            os.remove(audio_path)

# -------------------------
# TEXT MODERATION
# -------------------------

async def analyse_text_azure(text: str):

    scores = detox.predict(text)

    toxicity = int(scores.get("toxicity", 0) * 100)
    insult = int(scores.get("insult", 0) * 100)
    threat = int(scores.get("threat", 0) * 100)
    obscene = int(scores.get("obscene", 0) * 100)

    risk_score = max(
        toxicity,
        insult,
        threat,
        obscene
    )

    return {
        "riskScore": risk_score,
        "categories": {
            "hate_speech": toxicity,
            "violence": threat,
            "harassment": insult,
            "sexual_content": obscene,
            "self_harm": 0,
            "profanity": obscene
        },
        "flagged": risk_score >= 65,
        "reasoning": "Analysed using Detoxify"
    }

# -------------------------
# IMAGE MODERATION
# -------------------------

async def analyse_image_azure(image_bytes: bytes):

    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".jpg"
    ) as tmp:

        tmp.write(image_bytes)
        image_path = tmp.name

    try:

        detections = detector.detect(image_path)

        adult_score = 0

        NSFW_CLASSES = [
            "EXPOSED_BREAST_F",
            "EXPOSED_BREAST_M",
            "EXPOSED_GENITALIA_F",
            "EXPOSED_GENITALIA_M",
            "EXPOSED_BUTTOCKS",
            "EXPOSED_ANUS"
        ]

        for item in detections:

            if item["class"] in NSFW_CLASSES:

                score = int(item["score"] * 100)

                adult_score = max(
                    adult_score,
                    score
                )

        caption = await generate_caption(
            image_path
        )

        clip_scores = await detect_labels(
            image_path
        )

        prompt = f"""
You are a content moderation expert.

Caption:
{caption}

CLIP Scores:
{json.dumps(clip_scores)}

NudeNet Adult Score:
{adult_score}

Return ONLY valid JSON:

{{
"riskScore":0,
"adult_content":0,
"violence":0,
"hate_symbols":0,
"dangerous_activity":0,
"reasoning":""
}}
"""

        response = azure_client.chat.completions.create(
            model=settings.AZURE_OPENAI_DEPLOYMENT_NAME,
            messages=[
                {
                    "role": "system",
                    "content": "You are a professional moderation AI."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0
        )

        result = json.loads(
            response.choices[0].message.content
        )

        risk_score = int(
            result.get("riskScore", 0)
        )

        return {
            "riskScore": risk_score,
            "categories": {
                "adult_content": int(result.get("adult_content", 0)),
                "violent_content": int(result.get("violence", 0)),
                "hate_symbols": int(result.get("hate_symbols", 0)),
                "dangerous_activity": int(result.get("dangerous_activity", 0)),
                "safe_content": max(0, 100 - risk_score)
            },
            "flagged": risk_score >= 65,
            "description": caption
        }

    finally:

        if os.path.exists(image_path):
            os.remove(image_path)