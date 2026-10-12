from fastapi import APIRouter

from app.schemas.agent import ModelInfo

router = APIRouter(prefix="/agents", tags=["agents"])


@router.get("/models", response_model=list[ModelInfo])
async def list_models():
    return [
        ModelInfo(name="local-general-model", status="ready"),
        ModelInfo(name="local-coding-model", status="ready"),
        ModelInfo(name="local-vision-model", status="ready"),
    ]