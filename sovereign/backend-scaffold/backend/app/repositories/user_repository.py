def get_user_by_username(username: str) -> dict | None:
    if username:
        return {"username": username}
    return None