import torch
from langchain_huggingface import HuggingFaceEmbeddings


_embedding_model = None


def get_embedding_model():

    global _embedding_model

    if _embedding_model is None:

        torch.set_num_threads(4)

        _embedding_model = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2",
            model_kwargs={
                "device": "cpu"
            },
            encode_kwargs={
                "normalize_embeddings": True,
                "batch_size": 32
            }
        )

    return _embedding_model