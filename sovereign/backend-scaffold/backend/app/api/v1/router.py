from fastapi import APIRouter

from app.api.v1.endpoints import (
    agents,
    audit,
    auth,
    documents,
    knowledge,
    security,
    tasks,
    websocket,
)

router = APIRouter(prefix="/api/v1")
router.include_router(auth.router)
router.include_router(tasks.router)
router.include_router(documents.router)
router.include_router(agents.router)
router.include_router(knowledge.router)
router.include_router(audit.router)
router.include_router(security.router)
router.include_router(websocket.router)