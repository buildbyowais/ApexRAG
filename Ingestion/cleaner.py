import re


def clean_text(text: str) -> str:
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def clean_documents(documents):
    for document in documents:
        document.page_content = clean_text(
            document.page_content
        )

    return documents