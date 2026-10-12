from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent
ENV_FILE = BASE_DIR / ".env"


class Settings(BaseSettings):
    APP_NAME: str = "Sovereign AI Workbench"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = True

    DATABASE_URL: str = "sqlite:///./data/app.db"
    SECRET_KEY: str = "change-this-secret"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    API_V1_PREFIX: str = "/api/v1"
    CORS_ORIGINS: list[str] = ["http://localhost:5173", "http://127.0.0.1:5173"]

    UPLOAD_DIR: str = "uploads"
    DATA_DIR: str = "data"
    KNOWLEDGE_DIR: str = "data/knowledge_base"
    VECTOR_DIR: str = "data/vector_store"
    LOG_DIR: str = "logs"

    MAX_FILE_SIZE_MB: int = 10
    USE_MOCK_MODELS: bool = False

    GENERAL_MODEL: str = "llama3.2:latest"
    CODING_MODEL: str = "qwen2.5-coder:7b"
    VISION_MODEL: str = "llama3.2-vision:latest"

    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_OPENAI_BASE_URL: str = "http://localhost:11434/v1"

    model_config = SettingsConfigDict(env_file=ENV_FILE, extra="ignore")


settings = Settings()