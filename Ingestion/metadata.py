import uuid
from datetime import datetime, timezone
from pathlib import Path


def enrich_metadata(chunks, doc_id):
    upload_date = datetime.now(timezone.utc).strftime(
        "%Y-%m-%d %H:%M:%S UTC"
    )

    for index, chunk in enumerate(chunks):
        source = chunk.metadata.get("source", "")
        
        chunk.metadata.update({
            "doc_id": doc_id,
            "file_name": Path(source).name,
            "page": chunk.metadata.get("page", 1),
            "upload_date": upload_date,
            "chunk_id": f"{doc_id}_chunk_{index}"
        })

    return chunks