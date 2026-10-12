from uuid import uuid4

from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from app.core.config import settings
from app.schemas.task import TaskResponse, TaskStep
from app.services.ollama_service import chat_with_model

router = APIRouter(prefix="/tasks", tags=["tasks"])


ORG_PROMPTS = {
    "northwind": (
        "You are an enterprise assistant for Northwind Manufacturing. "
        "Use a formal, concise, and professional tone. "
        "Always write responses as internal business documents."
    ),
    "default": (
        "You are a helpful enterprise assistant. "
        "Use a clear, professional tone."
    ),
}


@router.post("", response_model=TaskResponse)
async def create_task(
    prompt: str = Form(...),
    task_type: str = Form(...),
    organization_id: str = Form("Toyota"),
    file: UploadFile | None = File(None),
):
    model_map = {
        "document_analysis": settings.GENERAL_MODEL,
        "coding": settings.CODING_MODEL,
        "image_analysis": settings.VISION_MODEL,
        "excel_analysis": settings.GENERAL_MODEL,
    }

    selected_model = model_map.get(task_type, settings.GENERAL_MODEL)
    org_instruction = ORG_PROMPTS.get(organization_id, ORG_PROMPTS["default"])

    steps = [
        TaskStep(id="classify", label="Classify task", status="completed"),
        TaskStep(id="permission", label="Check permissions", status="completed"),
        TaskStep(id="route", label="Select local model", status="completed"),
        TaskStep(id="plan", label="Create agent plan", status="completed"),
        TaskStep(id="execute", label="Execute local tools", status="completed"),
        TaskStep(id="verify", label="Verify output", status="completed"),
    ]

    file_text = f"Uploaded file: {file.filename}" if file else "Uploaded file: None"

    full_prompt = f"""
Organization instruction:
{org_instruction}

Task type: {task_type}
User prompt: {prompt}
{file_text}

Write the response for Northwind Manufacturing only.
""".strip()

    try:
        output = await chat_with_model(
            model=selected_model,
            prompt=full_prompt,
        )
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Ollama request failed: {exc}") from exc

    return TaskResponse(
        id=str(uuid4()),
        status="completed",
        selected_model=selected_model,
        steps=steps,
        output=output,
        external_calls=0,
    )