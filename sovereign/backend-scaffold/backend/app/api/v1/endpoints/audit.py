from fastapi import APIRouter

from app.schemas.audit import AuditEvent

router = APIRouter(prefix="/audit-logs", tags=["audit"])


@router.get("", response_model=list[AuditEvent])
async def get_audit_logs():
    return [
        AuditEvent(
            id="AUD-001",
            event="Task completed",
            user="system",
            timestamp="2026-09-07 12:00",
            status="success",
        ),
        AuditEvent(
            id="AUD-002",
            event="External API call blocked",
            user="system",
            timestamp="2026-09-07 12:05",
            status="blocked",
        ),
    ]