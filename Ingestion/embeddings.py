from langchain_google_genai import GoogleGenerativeAIEmbeddings


_embedding_model = None


def get_embedding_model():

    global _embedding_model

    if _embedding_model is None:

        _embedding_model = GoogleGenerativeAIEmbeddings(
            model="gemini-embedding-2",
            output_dimensionality=768
        )

    return _embedding_model