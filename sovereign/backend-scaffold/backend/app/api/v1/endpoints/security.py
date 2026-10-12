from fastapi import APIRouter

from app.schemas.security import SecurityStatus

router = APIRouter(prefix="/security", tags=["security"])


@router.get("/status", response_model=SecurityStatus)
async def security_status():
    return SecurityStatus(
        network_blocked=True,
        external_calls=0,
        uploads_allowed=True,
        audit_logging=True,
    )