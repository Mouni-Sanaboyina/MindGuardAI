import time
import logging

from fastapi import APIRouter, UploadFile, File, HTTPException

from services.azure_service import analyse_image_azure
from core.models import (
    ModerationReport,
    compute_risk_level,
    compute_action
)
from core.config import settings

logger = logging.getLogger("mindguard.image")
router = APIRouter()


@router.post("/", response_model=ModerationReport)
async def analyse_image(file: UploadFile = File(...)):
    start = time.perf_counter()

    image_bytes = await file.read()

    size_mb = len(image_bytes) / (1024 * 1024)

    if size_mb > settings.MAX_IMAGE_MB:
        raise HTTPException(
            status_code=413,
            detail=f"Image too large ({size_mb:.1f}MB). Max: {settings.MAX_IMAGE_MB}MB."
        )

    try:
        result = await analyse_image_azure(image_bytes)

    except Exception as e:
        logger.error(f"Image analysis failed: {e}")

        raise HTTPException(
            status_code=502,
            detail=f"Image analysis error: {str(e)}"
        )

    risk_score = int(result.get("riskScore", 0))

    categories = {
        k: int(v)
        for k, v in result.get("categories", {}).items()
    }

    flagged = result.get("flagged", False)

    risk_level = compute_risk_level(risk_score)

    elapsed = round(
        (time.perf_counter() - start) * 1000,
        2
    )

    return ModerationReport(
        content_type="image",
        risk_score=risk_score,
        risk_level=risk_level,
        flagged=flagged,
        recommended_action=compute_action(risk_level),
        categories=categories,
        transcript=result.get("description"),
        processing_time_ms=elapsed,
        model_used="NudeNet",
    )