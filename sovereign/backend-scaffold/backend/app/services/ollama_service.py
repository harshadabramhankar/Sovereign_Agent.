import httpx

from app.core.config import settings


async def chat_with_model(
    model: str,
    prompt: str,
    image_base64: str | None = None,
) -> str:
    message: dict[str, object] = {
        "role": "user",
        "content": prompt,
    }

    if image_base64:
        message["images"] = [image_base64]

    payload = {
        "model": model,
        "messages": [message],
        "stream": False,
    }

    url = f"{settings.OLLAMA_BASE_URL}/api/chat"

    async with httpx.AsyncClient(timeout=180.0) as client:
        response = await client.post(url, json=payload)
        response.raise_for_status()

    data = response.json()
    return data["message"]["content"]