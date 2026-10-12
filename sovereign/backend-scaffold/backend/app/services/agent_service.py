from app.core.config import settings

MODEL_MAP = {
    "document_analysis": settings.GENERAL_MODEL,
    "coding": settings.CODING_MODEL,
    "image_analysis": settings.VISION_MODEL,
    "excel_analysis": settings.GENERAL_MODEL,
}


def select_model(task_type: str) -> str:
    return MODEL_MAP.get(
        task_type,
        settings.GENERAL_MODEL,
    )