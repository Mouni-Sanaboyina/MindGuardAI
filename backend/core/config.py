from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):

    DEBUG: bool = False

    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
    ]

    # Azure OpenAI
    AZURE_OPENAI_API_KEY: str = ""
    AZURE_OPENAI_ENDPOINT: str = ""
    AZURE_OPENAI_DEPLOYMENT_NAME: str = "gpt-4.1-mini"

    # Groq Whisper
    GROQ_API_KEY: str = ""

    # Upload Limits
    MAX_TEXT_CHARS: int = 10000
    MAX_AUDIO_MB: int = 25
    MAX_IMAGE_MB: int = 10
    MAX_VIDEO_MB: int = 100

    # Risk Thresholds
    RISK_LOW_THRESHOLD: float = 0.35
    RISK_MEDIUM_THRESHOLD: float = 0.65

    # Model Names
    TEXT_MODERATION_MODEL: str = "Detoxify"
    IMAGE_MODERATION_MODEL: str = "NudeNet"
    CHAT_MODEL: str = "gpt-4.1-mini"
    SPEECH_MODEL: str = "whisper-large-v3"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


settings = Settings()