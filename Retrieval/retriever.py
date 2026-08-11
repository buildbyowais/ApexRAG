from langchain_chroma import Chroma

from Ingestion.embeddings import get_embedding_model


def get_vectorstore(collection_name="rag_documents"):
    embeddings = get_embedding_model()

    return Chroma(
        persist_directory="./chroma_db",
        collection_name=collection_name,
        embedding_function=embeddings
    )


def retrieve_documents(
    question: str,
    document_id: str,
    collection_name="rag_documents",
    k=3
):
    vectorstore = get_vectorstore(collection_name)

    results = vectorstore.similarity_search(
        question,
        k=k,
        filter={
            "doc_id": document_id
        }
    )

    return results