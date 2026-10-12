from pydantic import BaseModel


class SecurityStatus(BaseModel):
    network_blocked: bool
    external_calls: int
    uploads_allowed: bool
    audit_logging: bool