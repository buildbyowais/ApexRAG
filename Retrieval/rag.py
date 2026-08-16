from functools import lru_cache

from .retriever import retrieve_documents
from .prompt import prompt
from .llm import get_llm


@lru_cache(maxsize=100)
def _cached_answer(
    question: str,
    document_id: str,
    context: str
):

    llm = get_llm()

    messages = prompt.format_messages(
        context=context,
        question=question
    )

    response = llm.invoke(messages)

    if isinstance(response.content, list):
        return response.content[0]["text"]

    return response.content


def ask_question(question: str, document_id: str):

    documents = retrieve_documents(
        question=question,
        document_id=document_id
    )

    if not documents:
        return {
            "answer": "I could not find the answer in the provided document.",
            "sources": []
        }

    context = "\n\n".join(
        document.page_content
        for document in documents
    )

    try:

        answer = _cached_answer(
            question=question.strip(),
            document_id=document_id,
            context=context
        )

    except Exception as e:

        error_message = str(e).lower()

        if (
            "quota" in error_message
            or "resource exhausted" in error_message
            or "rate limit" in error_message
            or "429" in error_message
        ):
            return {
                "answer": "The AI service limit has been reached. Please try again later.",
                "sources": [],
                "error": "quota_exceeded"
            }

        return {
            "answer": "Sorry, I couldn't generate an answer right now. Please try again.",
            "sources": [],
            "error": "llm_error"
        }

    # Sources
    sources = []
    seen_sources = set()

    for document in documents:

        file_name = document.metadata.get(
            "file_name",
            "Unknown"
        )

        page = document.metadata.get(
            "page",
            1
        )

        source_key = (file_name, page)

        if source_key not in seen_sources:

            sources.append({
                "file_name": file_name,
                "page": page
            })

            seen_sources.add(source_key)

    return {
        "answer": answer,
        "sources": sources
    }