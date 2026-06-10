from pydantic import BaseModel, Field
from typing import Dict, List, Optional
from enum import Enum

class RiskLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class TimestampFlag(BaseModel):
    time: str
    time_seconds: float
    label: str
    score: int = Field(..., ge=0, le=100)
    modality: str  # 'audio' | 'visual' | 'both'

class ModerationReport(BaseModel):
    content_type: str
    risk_score: int = Field(..., ge=0, le=100)
    risk_level: RiskLevel
    flagged: bool
    recommended_action: str
    categories: Dict[str, int]
    transcript: Optional[str] = None
    timestamps: List[TimestampFlag] = []
    processing_time_ms: Optional[float] = None
    model_used: str = "Bytez API"

def compute_risk_level(score: int) -> RiskLevel:
    if score < 35: return RiskLevel.LOW
    elif score < 65: return RiskLevel.MEDIUM
    return RiskLevel.HIGH

def compute_action(level: RiskLevel) -> str:
    return {
        RiskLevel.LOW: "Safe to publish",
        RiskLevel.MEDIUM: "Needs human review",
        RiskLevel.HIGH: "Block immediately",
    }[level]
