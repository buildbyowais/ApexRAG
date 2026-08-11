import os
import shutil
from fastapi import APIRouter, UploadFile, File, HTTPException

from Ingestion.pipeline import ingest_document


router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)


UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):

    allowed_extensions = [".pdf", ".docx", ".txt"]

    extension = os.path.splitext(file.filename)[1].lower()

    if extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Only PDF, DOCX and TXT files are supported."
        )

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    try:

        # Save uploaded file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Run ingestion pipeline
        vectorstore, doc_id, chunks = ingest_document(
            file_path,
            collection_name="rag_documents"
        )

        return {
            "message": "Document uploaded successfully.",
            "document_id": doc_id,
            "file_name": file.filename,
            "chunks": chunks
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )