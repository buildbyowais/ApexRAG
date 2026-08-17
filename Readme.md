<div align="center">

# ApexRAG

### Document-Grounded Retrieval-Augmented Generation System

![Python](https://img.shields.io/badge/Python-3.14-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.141.1-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Uvicorn](https://img.shields.io/badge/Uvicorn-0.52.1-499848?style=for-the-badge&logo=uvicorn&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-Framework-1C3C3C?style=for-the-badge)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-3.5%20Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Gemini Embeddings](https://img.shields.io/badge/Gemini%20Embeddings-2-4285F4?style=for-the-badge&logo=google&logoColor=white)
![ChromaDB](https://img.shields.io/badge/ChromaDB-1.5.9-FF6B6B?style=for-the-badge)

![PyMuPDF](https://img.shields.io/badge/PyMuPDF-1.28.2-3776AB?style=for-the-badge)
![python-docx](https://img.shields.io/badge/python--docx-1.2.0-3776AB?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

![Netlify](https://img.shields.io/badge/Frontend-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)

</div>

---

## 🚀 Live Demo

### Frontend

**Netlify:**  
https://apexrag.netlify.app/

### Backend API

**Render:**  
https://apexrag.onrender.com/

### API Documentation

**Swagger UI:**  
https://apexrag.onrender.com/docs

---

# 📖 About ApexRAG

ApexRAG is a document-based Retrieval-Augmented Generation (RAG) application that allows users to upload their own documents and ask questions about their content.

The system processes uploaded documents, splits them into smaller chunks, generates vector embeddings, stores those embeddings in ChromaDB, retrieves relevant information when a question is asked, and uses Google Gemini to generate a grounded answer.

The main goal of ApexRAG is to provide answers based on the uploaded document rather than relying entirely on the model's general knowledge.

---

# ✨ Features

- 📄 Upload PDF, DOCX, and TXT documents
- 🧹 Document text cleaning
- 🧩 Document chunking
- 🏷️ Metadata enrichment
- 🔢 Gemini-based vector embeddings
- 🗄️ ChromaDB vector storage
- 🔎 Semantic similarity search
- 🤖 Google Gemini for answer generation
- 🎯 Document-grounded responses
- 🛡️ Basic hallucination handling
- 📚 Source document and page references
- 💬 Interactive chat interface
- 📱 Responsive frontend
- ⚡ FastAPI backend
- 📖 Swagger/OpenAPI documentation
- 🌐 Netlify frontend deployment
- ☁️ Render backend deployment

---

# 🏗️ Architecture

```text
                         ┌─────────────────┐
                         │      User       │
                         └────────┬────────┘
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │        Frontend         │
                    │    HTML + CSS + JS      │
                    │        Bootstrap        │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │        FastAPI           │
                    │         Backend          │
                    └────────────┬────────────┘
                                 │
                  ┌──────────────┴──────────────┐
                  │                             │
                  ▼                             ▼
        ┌───────────────────┐         ┌───────────────────┐
        │     Ingestion     │         │     Retrieval     │
        ├───────────────────┤         ├───────────────────┤
        │ Load              │         │ Query Embedding   │
        │ Clean             │         │ Similarity Search │
        │ Structure         │         │ Context Building  │
        │ Chunk             │         │ Prompting         │
        │ Metadata          │         │ Gemini LLM        │
        │ Embeddings        │         └─────────┬─────────┘
        └─────────┬─────────┘                   │
                  │                             │
                  ▼                             │
        ┌───────────────────┐                   │
        │     ChromaDB      │◄──────────────────┘
        │   Vector Store    │
        └───────────────────┘
                  │
                  ▼
           Answer + Sources
````

---

# 🔄 How It Works

## 1. Document Upload

The user uploads a supported document:

```text
PDF / DOCX / TXT
       │
       ▼
   FastAPI API
```

The uploaded document is saved and passed to the ingestion pipeline.

---

## 2. Document Ingestion

The document goes through several processing stages:

```text
Load Document
      │
      ▼
Clean Text
      │
      ▼
Detect Structure
      │
      ▼
Create Chunks
      │
      ▼
Add Metadata
      │
      ▼
Generate Embeddings
      │
      ▼
Store in ChromaDB
```

Each chunk receives metadata such as:

* Document ID
* File name
* Page number
* Chunk information

---

## 3. Embeddings

ApexRAG uses Google Gemini Embeddings to convert document chunks into vector representations.

The current embedding configuration is:

```python
GoogleGenerativeAIEmbeddings(
    model="gemini-embedding-2",
    output_dimensionality=768
)
```

These vectors are stored inside ChromaDB.

---

## 4. Question Processing

When the user asks a question:

```text
User Question
      │
      ▼
Question Embedding
      │
      ▼
ChromaDB Similarity Search
      │
      ▼
Relevant Document Chunks
```

The system retrieves the most relevant chunks from the uploaded document.

---

## 5. Document Filtering

Each uploaded document receives a unique `document_id`.

The retrieval system uses this ID to make sure the search is performed against the correct document.

```text
Question
   │
   ▼
Semantic Search
   │
   ▼
Filter by document_id
   │
   ▼
Relevant Chunks
```

This prevents information from unrelated uploaded documents from being used.

---

## 6. Answer Generation

The retrieved context is combined with the user's question and sent to Google Gemini.

```text
Retrieved Context
        +
     Question
        │
        ▼
  Google Gemini
        │
        ▼
    Final Answer
```

The LLM is configured with:

```text
Model: gemini-3.5-flash
Temperature: 0
```

A temperature of `0` is used for more consistent and focused responses.

---

## 7. Sources

The response includes source information for the retrieved content.

Example:

```json
{
  "answer": "The purpose of recruitment is ...",
  "sources": [
    {
      "file_name": "document.pdf",
      "page": 1
    }
  ]
}
```

This allows users to identify where the retrieved information came from.

---

# 🧠 RAG Pipeline

ApexRAG follows the standard Retrieval-Augmented Generation workflow:

```text
                INGESTION
                    │
                    ▼
              Load Document
                    │
                    ▼
               Clean Text
                    │
                    ▼
              Chunk Document
                    │
                    ▼
              Add Metadata
                    │
                    ▼
             Create Embeddings
                    │
                    ▼
                ChromaDB
                    │
                    │
                    │
                RETRIEVAL
                    │
                    ▼
              User Question
                    │
                    ▼
            Semantic Search
                    │
                    ▼
             Top K Chunks
                    │
                    ▼
               Build Context
                    │
                    ▼
              Gemini LLM
                    │
                    ▼
              Final Answer
```

---

# 🗄️ ChromaDB

ApexRAG uses **ChromaDB** as its vector database.

ChromaDB stores:

* Document chunks
* Embeddings
* Metadata
* Document IDs
* Source information

The application uses:

```text
Persist Directory:
./chroma_db

Collection:
rag_documents
```

---

# 📁 Project Structure

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
├── routes/
│   ├── documents.py
│   └── chat.py
│
├── uploads/
├── chroma_db/
│
├── main.py
├── requirements.txt
├── .env
└── .gitignore
```

---

# 🧰 Tech Stack

| Technology        | Purpose             |
| ----------------- | ------------------- |
| Python 3.14       | Backend programming |
| FastAPI 0.141.1   | REST API            |
| Uvicorn 0.52.1    | ASGI server         |
| LangChain         | RAG orchestration   |
| Google Gemini     | Answer generation   |
| Gemini Embeddings | Vector embeddings   |
| ChromaDB 1.5.9    | Vector database     |
| PyMuPDF 1.28.2    | PDF processing      |
| python-docx 1.2.0 | DOCX processing     |
| HTML5             | Frontend structure  |
| CSS3              | Frontend styling    |
| JavaScript        | Frontend logic      |
| Bootstrap         | Frontend UI         |
| Netlify           | Frontend deployment |
| Render            | Backend deployment  |

---

# 📄 Supported Documents

ApexRAG currently supports:

| Format | Support |
| ------ | ------- |
| PDF    | ✅       |
| DOCX   | ✅       |
| TXT    | ✅       |

---

# 🔌 API Endpoints

## Upload Document

```http
POST /documents/upload
```

Uploads and processes a document.

### Processing Steps

```text
Upload
  ↓
Save File
  ↓
Load
  ↓
Clean
  ↓
Structure Detection
  ↓
Chunking
  ↓
Metadata
  ↓
Embeddings
  ↓
ChromaDB
```

### Example Response

```json
{
  "message": "Document uploaded successfully.",
  "document_id": "8ad88663-6519-4ddc-a0a9-c15a526891a3",
  "file_name": "document.pdf",
  "chunks": 10
}
```

---

# 💬 Chat Endpoint

```http
POST /chat
```

Used to ask questions about an uploaded document.

### Request

```json
{
  "question": "What is the main purpose of recruitment?",
  "document_id": "8ad88663-6519-4ddc-a0a9-c15a526891a3"
}
```

### Response

```json
{
  "answer": "The main purpose of recruitment is ...",
  "sources": [
    {
      "file_name": "document.pdf",
      "page": 1
    }
  ]
}
```

---

# 🛡️ Hallucination Handling

ApexRAG attempts to keep answers grounded in the retrieved document context.

If relevant information cannot be found, the system returns:

```text
I could not find the answer in the provided document.
```

This prevents the system from intentionally presenting unsupported information as information found in the uploaded document.

---

# ⚡ Performance & API Efficiency

ApexRAG separates document ingestion from question answering.

During document ingestion:

```text
Document
   ↓
Chunks
   ↓
Embeddings
   ↓
ChromaDB
```

The embeddings are stored in ChromaDB instead of being regenerated for every question.

During question answering:

```text
Question
   ↓
Semantic Retrieval
   ↓
Relevant Chunks
   ↓
Gemini
   ↓
Answer
```

Only the retrieved document context is sent to the LLM rather than sending the entire document every time.

This reduces unnecessary processing and keeps the RAG workflow efficient.

---

# 🧪 Testing

ApexRAG can be tested using several types of questions.

### Direct Question

```text
What is the main purpose of the organization?
```

### Comparative Question

```text
What is the difference between recruitment and selection?
```

### Contextual Question

```text
Explain the process described in the document.
```

### Hallucination Test

Ask something that is not present in the uploaded document:

```text
What was the company's revenue in 2020?
```

Expected behavior:

```text
I could not find the answer in the provided document.
```

---

# 🌐 Deployment

## Frontend

The frontend is deployed on **Netlify**.

```text
https://apexrag.netlify.app/
```

Frontend structure:

```text
frontend/
├── index.html
├── style.css
└── script.js
```

### Netlify Configuration

```text
Base Directory: frontend
Build Command: [blank]
Publish Directory: .
```

---

## Backend

The backend is deployed on **Render**.

```text
https://apexrag.onrender.com/
```

### Swagger Documentation

```text
https://apexrag.onrender.com/docs
```

The backend runs using:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

# 🔐 Environment Variables

Create a `.env` file in the backend:

```env
GOOGLE_API_KEY=your_google_api_key
```

The Google API key is used for:

* Gemini Embeddings
* Gemini LLM

> Never commit your `.env` file to GitHub.

---

# 🚀 Local Setup

## 1. Clone Repository

```bash
git clone https://github.com/buildbyowais/ApexRAG.git
cd ApexRAG
```

---

## 2. Create Virtual Environment

```bash
python -m venv rag_env
```

---

## 3. Activate Virtual Environment

### Windows

```bash
rag_env\Scripts\activate
```

### Linux / macOS

```bash
source rag_env/bin/activate
```

---

## 4. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 5. Configure Environment Variables

Create:

```text
.env
```

Add:

```env
GOOGLE_API_KEY=your_api_key_here
```

---

## 6. Start Backend

```bash
uvicorn main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger:

```text
http://127.0.0.1:8000/docs
```

---

## 7. Open Frontend

Open:

```text
frontend/index.html
```

or use the deployed Netlify frontend.

---

# 📦 Main Dependencies

```text
fastapi==0.141.1
uvicorn==0.52.1
python-dotenv==1.2.2
python-multipart==0.0.32

pymupdf==1.28.2
python-docx==1.2.0

chromadb==1.5.9

langchain-chroma==1.1.0
langchain-community==0.4.2
langchain-core==1.5.4
langchain-google-genai==4.3.3
langchain-huggingface==1.2.2
langchain-text-splitters==1.1.2

sentence-transformers==5.7.0
transformers==5.15.0

google-genai==2.18.0
```

---

# 🎯 Design Goals

### Accuracy

Retrieve relevant document chunks before generating an answer.

### Grounding

Keep generated answers connected to the uploaded document.

### Efficiency

Store embeddings in ChromaDB and retrieve only relevant chunks for questions.

### Transparency

Return source document and page information.

### Simplicity

Keep the application focused on document-based question answering.

### Educational Value

The project demonstrates the complete RAG workflow from document ingestion to retrieval and LLM-based answer generation.

---

# 🔮 Future Improvements

Possible future improvements include:

* Multi-document conversations
* Persistent chat history
* Streaming responses
* Source highlighting
* Better chunk-level citations
* Hybrid keyword + semantic retrieval
* Reranking
* User authentication
* Document management
* Conversation memory
* RAG evaluation metrics
* Advanced retrieval strategies
* Improved production infrastructure

---

# 👨‍💻 Author

## Muhammad Owais Shabbir

GitHub:

[https://github.com/buildbyowais](https://github.com/buildbyowais)

---

# 📜 License

This project was developed for educational and learning purposes.