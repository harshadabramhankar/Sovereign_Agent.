from fastapi import APIRouter, WebSocket

router = APIRouter(tags=["websocket"])


@router.websocket("/ws/tasks/{task_id}")
async def task_progress(websocket: WebSocket, task_id: str):
    await websocket.accept()
    for step in [
        {"id": "classify", "label": "Classify task", "status": "running"},
        {"id": "route", "label": "Select local model", "status": "running"},
        {"id": "execute", "label": "Execute local tools", "status": "running"},
    ]:
        await websocket.send_json({"task_id": task_id, "step": step})
    await websocket.close()