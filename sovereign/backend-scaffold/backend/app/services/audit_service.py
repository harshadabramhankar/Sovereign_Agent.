def audit_event(event: str, user: str = "system") -> dict:
    return {
        "event": event,
        "user": user,
    }