# ApexRAG

![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-RAG-1C3C3C)
![ChromaDB](https://img.shields.io/badge/ChromaDB-Vector%20Database-FF6F00)
![Gemini](https://img.shields.io/badge/Google%20Gemini-LLM-4285F4?logo=google&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-Frontend-7952B3?logo=bootstrap&logoColor=white)

A document-based **Retrieval-Augmented Generation (RAG)** chatbot that allows users to upload documents and ask questions directly from their content.

ApexRAG processes uploaded documents, creates searchable vector representations, retrieves relevant information, and generates concise answers grounded in the uploaded document.

---

## Features

- Upload PDF, DOCX, and TXT documents
- Automatic text extraction and cleaning
- Document structure detection
- Intelligent document chunking
- Metadata enrichment
- Hugging Face embeddings
- ChromaDB vector storage
- Semantic document retrieval
- LLM-based answer generation
- Document-grounded responses
- Hallucination handling
- Source and page references
- Responsive chatbot interface
- FastAPI REST API

---

## Architecture

```text
                         User
                           │
                           ▼
                ┌─────────────────────┐
                │      Frontend       │
                │ HTML + CSS + JS     │
                │     Bootstrap       │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │      FastAPI        │
                │      Backend        │
                └──────────┬──────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
      ┌────────────────┐       ┌────────────────┐
      │   Ingestion    │       │   Retrieval    │
      ├────────────────┤       ├────────────────┤
      │ Load           │       │ Retriever      │
      │ Clean          │       │ Prompt         │
      │ Structure      │       │ LLM            │
      │ Chunk          │       │ RAG Pipeline   │
      │ Metadata       │       └───────┬────────┘
      │ Embeddings     │               │
      └───────┬────────┘               │
              │                        │
              ▼                        │
       ┌───────────────┐               │
       │   ChromaDB    │◄──────────────┘
       │ Vector Store  │
       └───────────────┘
              │
              ▼
       Answer + Sources
```

---

## Project Structure

```text
ApexRAG/
│
├── Frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── Ingestion/
│   ├── loader.py
│   ├── cleaner.py
│   ├── structure.py
│   ├── chunker.py
│   ├── metadata.py
│   ├── embeddings.py
│   └── pipeline.py
│
├── Retrieval/
│   ├── rag.py
│   ├── retriever.py
│   ├── prompt.py
│   └── llm.py
│
├── Routes/
│   ├── chat.py
│   └── documents.py
│
├── chroma_db/
│
├── main.py
├── requirements.txt
├── .env
└── .gitignore
```

---

## RAG Pipeline

### 1. Document Upload

The user uploads a PDF, DOCX, or TXT document through the frontend.

### 2. Document Ingestion

The document passes through the ingestion pipeline:

```text
Document
   ↓
Load
   ↓
Clean
   ↓
Structure Detection
   ↓
Chunking
   ↓
Metadata Enrichment
   ↓
Embeddings
   ↓
ChromaDB
```

### 3. Question Processing

The user asks a question about the uploaded document.

The question is converted into an embedding and used to retrieve the most relevant document chunks.

```text
Question
   ↓
Embedding
   ↓
Similarity Search
   ↓
Relevant Chunks
```

### 4. Answer Generation

The retrieved context is provided to the LLM together with the user's question.

```text
Question + Retrieved Context
              ↓
             LLM
              ↓
         Final Answer
```

### 5. Source Retrieval

The response includes the document name and page number of the retrieved information.

If the answer cannot be found in the uploaded document, ApexRAG returns:

```text
I could not find the answer in the provided document.
```

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Python | Backend and RAG pipeline |
| FastAPI | REST API |
| LangChain | RAG components |
| Google Gemini | Large Language Model |
| Hugging Face | Text embeddings |
| Sentence Transformers | Embedding model |
| ChromaDB | Vector database |
| HTML | Frontend structure |
| CSS | Frontend styling |
| JavaScript | Frontend functionality |
| Bootstrap | UI components |

---

## Supported Documents

ApexRAG supports:

- PDF
- DOCX
- TXT

**Maximum file size:** 20 MB

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/buildbyowais/ApexRAG.git
cd ApexRAG
```

### 2. Create a Virtual Environment

```bash
python -m venv rag_env
```

### 3. Activate the Virtual Environment

#### Windows

```bash
rag_env\Scripts\activate
```

#### Linux / macOS

```bash
source rag_env/bin/activate
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Configure Environment Variables

Create a `.env` file in the project root:

```env
GOOGLE_API_KEY=your_api_key_here
```

---

## Running the Application

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The backend will be available at:

```text
http://127.0.0.1:8000
```

FastAPI Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

Open the frontend in your browser, upload a document, and start chatting with it.

---

## API Endpoints

### Upload Document

```http
POST /documents/upload
```

The endpoint uploads and processes a document through the ingestion pipeline.

Example response:

```json
{
  "message": "Document uploaded successfully.",
  "document_id": "8ad88663-6519-4ddc-a0a9-c15a526891a3",
  "file_name": "document.pdf",
  "chunks": 10
}
```

### Ask a Question

```http
POST /chat
```

Request:

```json
{
  "question": "What is the purpose of recruitment?",
  "document_id": "8ad88663-6519-4ddc-a0a9-c15a526891a3"
}
```

Example response:

```json
{
  "answer": "The purpose of recruitment is to formulate a team of competent candidates from which the company can select the best employee.",
  "sources": [
    {
      "file_name": "document.pdf",
      "page": 1
    }
  ]
}
```

---

## Hallucination Handling

ApexRAG is designed to answer questions using the uploaded document rather than relying on unsupported information.

When relevant information cannot be found in the provided document, the system responds:

```text
I could not find the answer in the provided document.
```

This helps reduce unsupported or hallucinated responses.

---

## Design Goals

### Accuracy

Retrieve relevant document content before generating an answer.

### Grounding

Keep generated responses based on the uploaded document.

### Conciseness

Generate short and useful answers without unnecessary information.

### Transparency

Provide document and page references for retrieved information.

### Efficiency

Use local embeddings to reduce unnecessary API usage.

---

## Future Improvements

- Multi-document conversations
- Chat history
- Streaming responses
- Source highlighting
- Authentication
- User accounts
- Hybrid keyword and semantic search
- Advanced retrieval strategies
- Document management
- Cloud deployment
- RAG evaluation metrics

---

## Author

**Muhammad Owais Shabbir**

[![GitHub](https://img.shields.io/badge/GitHub-buildbyowais-181717?logo=github&logoColor=white)](https://github.com/buildbyowais)

---

## License

This project is developed for educational and project purposes.