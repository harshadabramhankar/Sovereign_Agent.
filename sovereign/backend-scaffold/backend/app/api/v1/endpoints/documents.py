from uuid import uuid4

from fastapi import APIRouter, File, UploadFile

from app.schemas.document import DocumentResponse

router = APIRouter(prefix="/documents", tags=["documents"])


@router.get("", response_model=list[DocumentResponse])
async def list_documents():
    return [
        DocumentResponse(id=str(uuid4()), name="Safety_Manual_2026.pdf", size=4200000, status="Indexed"),
        DocumentResponse(id=str(uuid4()), name="Inspection_Report_A12.pdf", size=2800000, status="Indexed"),
    ]


@router.post("/upload", response_model=DocumentResponse)
async def upload_document(file: UploadFile = File(...)):
    return DocumentResponse(
        id=str(uuid4()),
        name=file.filename,
        size=0,
        status="Uploaded",
    )