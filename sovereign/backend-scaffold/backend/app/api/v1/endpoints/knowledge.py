from fastapi import APIRouter

router = APIRouter(prefix="/knowledge", tags=["knowledge"])


@router.get("/sources")
async def list_sources():
    return [
        {"id": "KB-001", "name": "SOP Manual", "status": "Indexed"},
        {"id": "KB-002", "name": "Safety Guidelines", "status": "Indexed"},
    ]


@router.post("/index")
async def index_source():
    return {"message": "Knowledge source indexed successfully"}