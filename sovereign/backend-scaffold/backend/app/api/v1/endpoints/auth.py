from fastapi import APIRouter

from app.schemas.auth import LoginRequest, TokenResponse

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginRequest):
    return TokenResponse(access_token=f"demo-token-for-{payload.username}")