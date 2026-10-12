from pydantic import BaseModel


class AuditEvent(BaseModel):
    id: str
    event: str
    user: str
    timestamp: str
    status: str