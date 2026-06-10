import time, logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from services.azure_service import analyse_text_azure
from core.models import ModerationReport, compute_risk_level, compute_action

logger = logging.getLogger("mindguard.text")
router = APIRouter()

class TextPayload(BaseModel):
    text: str = Field(..., min_length=1, max_length=10_000)

@router.post("/", response_model=ModerationReport)
async def analyse_text(payload: TextPayload):
    start = time.perf_counter()
    try:
        result = await analyse_text_azure(payload.text)
    except Exception as e:
        logger.error(f"Text analysis failed: {e}")
        raise HTTPException(status_code=502, detail=f"Text analysis error: {str(e)}")

    risk_score = int(result.get("riskScore", 0))
    categories = {k: int(v) for k, v in result.get("categories", {}).items()}
    flagged = result.get("flagged", risk_score >= 65)
    risk_level = compute_risk_level(risk_score)
    elapsed = round((time.perf_counter() - start) * 1000, 2)

    return ModerationReport(
        content_type="text",
        risk_score=risk_score,
        risk_level=risk_level,
        flagged=flagged,
        recommended_action=compute_action(risk_level),
        categories=categories,
        processing_time_ms=elapsed,
        model_used="Detoxify",
    )
