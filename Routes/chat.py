from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from Retrieval.rag import ask_question

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


class ChatRequest(BaseModel):
    question: str
    document_id: str


@router.post("")
def chat(request: ChatRequest):

    if not request.question.strip():
        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty."
        )

    try:
        result = ask_question(
            question=request.question,
            document_id=request.document_id
        )

        # If answer is not found, don't return sources
        if result.get("answer") == "I could not find the answer in the provided document.":
            result["sources"] = []

        return result

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )