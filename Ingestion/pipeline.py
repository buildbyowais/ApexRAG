import uuid

from langchain_chroma import Chroma

from .loader import load_document
from .cleaner import clean_documents
from .structure import detect_structure
from .chunker import chunk_documents
from .metadata import enrich_metadata
from .embeddings import get_embedding_model


def ingest_document(
    file_path: str,
    collection_name: str = "rag_documents"
):
    # Document ID
    doc_id = str(uuid.uuid4())

    # 1. Load document
    documents = load_document(file_path)

    # 2. Clean text
    documents = clean_documents(documents)

    # 3. Detect document structure
    documents = detect_structure(documents)

    # 4. Create chunks
    chunks = chunk_documents(documents)

    # 5. Add metadata
    chunks = enrich_metadata(
        chunks,
        doc_id
    )

    # 6. Create embeddings
    embeddings = get_embedding_model()

    # 7. Store in ChromaDB
    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory="./chroma_db",
        collection_name=collection_name
    )

    return vectorstore, doc_id, len(chunks)