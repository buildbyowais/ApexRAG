# ApexRAG

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge" alt="LangChain">
  <img src="https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google Gemini">
  <img src="https://img.shields.io/badge/ChromaDB-Vector%20Store-FF6F00?style=for-the-badge" alt="ChromaDB">
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap">
</p>

<p align="center">
  <b>Document-grounded RAG chatbot for asking questions from your own documents.</b>
</p>

---

## Overview

**ApexRAG** is a document-based Retrieval-Augmented Generation (RAG) chatbot built with **FastAPI, LangChain, Google Gemini, Hugging Face embeddings, and ChromaDB**.

Users can upload a document and immediately ask questions about its content. The system processes the document, creates vector embeddings, stores the resulting chunks in ChromaDB, retrieves relevant context for each question, and generates a concise answer grounded in the uploaded document.

If the required information cannot be found in the document, ApexRAG refuses to invent an answer.

---

## ✨ Features

- 📄 Upload **PDF, DOCX, and TXT** files
- 📦 Maximum upload size of **20 MB**
- 🧹 Text cleaning and preprocessing
- 🧩 Intelligent document chunking
- 🏷️ Metadata enrichment for document chunks
- 🔎 Semantic similarity search
- 🧠 Local Hugging Face embeddings
- 🗄️ ChromaDB vector storage
- 🤖 Google Gemini for answer generation
- 🎯 Document-grounded answers
- 🛡️ Basic hallucination/refusal handling
- 📚 Source and page references
- ✂️ Concise responses to reduce unnecessary token usage
- 💬 Interactive chat interface
- 📱 Responsive frontend
- ⚡ FastAPI REST API
- 📖 Swagger/OpenAPI documentation

---

## 🏗️ Architecture

```text
                         ┌─────────────────┐
                         │      User       │
                         └────────┬────────┘
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │        Frontend         │
                    │ HTML + CSS + JS +       │
                    │       Bootstrap         │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │        FastAPI          │
                    │        Backend          │
                    └────────────┬────────────┘
                                 │
                  ┌──────────────┴──────────────┐
                  │                             │
                  ▼                             ▼
        ┌──────────────────┐          ┌──────────────────┐
        │    Ingestion     │          │    Retrieval     │
        ├──────────────────┤          ├──────────────────┤
        │ Load             │          │ Query Processing │
        │ Clean            │          │ Retrieval        │
        │ Structure        │          │ Prompting        │
        │ Chunk            │          │ LLM Generation   │
        │ Metadata         │          └────────┬─────────┘
        │ Embeddings       │                   │
        └────────┬─────────┘                   │
                 │                             │
                 ▼                             │
        ┌──────────────────┐                   │
        │     ChromaDB     │◄──────────────────┘
        │   Vector Store   │
        └──────────────────┘
                       │
                       ▼
               Answer + Sources
```

---

## 🔄 How ApexRAG Works

### 1. Upload

The user uploads a PDF, DOCX, or TXT document from the frontend.

### 2. Ingestion

The uploaded document goes through the ingestion pipeline:

```text
Document
   │
   ▼
Load
   │
   ▼
Clean
   │
   ▼
Structure Detection
   │
   ▼
Chunking
   │
   ▼
Metadata Enrichment
   │
   ▼
Embeddings
   │
   ▼
ChromaDB
```

### 3. Question

The user asks a question related to the uploaded document.

### 4. Retrieval

ApexRAG searches the vector store for the most relevant document chunks.

```text
User Question
     │
     ▼
Question Embedding
     │
     ▼
Semantic Search
     │
     ▼
Relevant Chunks
```

### 5. Generation

The retrieved context is passed to Google Gemini together with the question.

```text
Question + Retrieved Context
              │
              ▼
         Google Gemini
              │
              ▼
         Final Answer
```

### 6. Sources

The response includes the document and page information associated with the retrieved content.

---

## 📁 Project Structure

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

## 🧰 Tech Stack

| Technology | Role |
|---|---|
| Python | Core backend language |
| FastAPI | REST API and backend |
| LangChain | RAG and LLM orchestration |
| Google Gemini | Answer generation |
| Hugging Face | Embedding model |
| Sentence Transformers | Local text embeddings |
| ChromaDB | Vector database |
| HTML | Frontend structure |
| CSS | Frontend styling |
| JavaScript | Frontend logic |
| Bootstrap | UI framework |

---

## 📄 Supported Documents

| Format | Supported |
|---|---|
| PDF | ✅ |
| DOCX | ✅ |
| TXT | ✅ |

**Maximum file size:** `20 MB`

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

- Python 3.x
- pip
- A Google Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/buildbyowais/ApexRAG.git
cd ApexRAG
```

### 2. Create a Virtual Environment

```bash
python -m venv rag_env
```

### 3. Activate the Environment

**Windows**

```bash
rag_env\Scripts\activate
```

**Linux / macOS**

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

> Keep your `.env` file private. It should not be committed to GitHub.

### 6. Start the Backend

```bash
uvicorn main:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

---

## 🔌 API

### Upload Document

```http
POST /documents/upload
```

The endpoint accepts a document, processes it through the ingestion pipeline, generates embeddings, and stores the chunks in ChromaDB.

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

## 🛡️ Hallucination Handling

ApexRAG is designed to keep answers grounded in the uploaded document.

When the requested information is not available in the retrieved document context, the system returns:

```text
I could not find the answer in the provided document.
```

This prevents the chatbot from presenting unsupported information as if it came from the uploaded document.

---

## 🎯 Design Goals

### Accuracy
Retrieve relevant document context before generating an answer.

### Grounding
Keep responses tied to the uploaded document.

### Conciseness
Return useful answers without unnecessary long explanations.

### Transparency
Show the document and page sources used for the response.

### Efficiency
Use local embeddings while using the LLM primarily for final answer generation.

---

## 🧪 Testing

ApexRAG can be tested using several question types:

### Direct Questions

Questions whose answers are explicitly present in the document.

### Comparative Questions

Questions requiring information from multiple sections.

### Medium-Length Questions

Questions requiring several relevant chunks to construct an answer.

### Hallucination Tests

Questions about information that does not exist in the uploaded document.

Expected behavior:

```text
I could not find the answer in the provided document.
```

---

## 🔮 Future Improvements

- Multi-document conversations
- Persistent chat history
- Streaming responses
- Source highlighting
- Better chunk-level citations
- Hybrid keyword + semantic retrieval
- Reranking
- Authentication and user accounts
- Document management
- Cloud deployment
- RAG evaluation metrics
- Conversation memory

---

## 👨‍💻 Author

**Muhammad Owais Shabbir**

[![GitHub](https://img.shields.io/badge/GitHub-buildbyowais-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/buildbyowais)

---

## 📜 License

This project was developed for educational and project purposes.
