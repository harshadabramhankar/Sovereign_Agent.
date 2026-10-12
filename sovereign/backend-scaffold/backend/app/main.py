from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import settings
from app.core.logging import setup_logging
from app.db.init_db import init_db
from app.utils.file_utils import ensure_dirs

setup_logging()
ensure_dirs(
    settings.UPLOAD_DIR,
    settings.DATA_DIR,
    settings.KNOWLEDGE_DIR,
    settings.VECTOR_DIR,
    settings.LOG_DIR,
)
init_db()

app = FastAPI(title=settings.APP_NAME, version=settings.APP_VERSION)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/")
async def root():
    return {"message": "Sovereign AI Workbench Backend is running"}