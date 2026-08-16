import os

from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI


load_dotenv()


_llm = None


def get_llm():

    global _llm

    if _llm is None:

        api_key = os.getenv("GOOGLE_API_KEY")

        if not api_key:
            raise ValueError("GOOGLE_API_KEY not found.")

        _llm = ChatGoogleGenerativeAI(
            model="gemini-3.5-flash",
            temperature=0
        )

    return _llm