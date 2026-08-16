
# ApexRAG

A document-grounded Retrieval-Augmented Generation (RAG) chatbot that allows users to upload their own documents and ask questions about their content.

ApexRAG processes uploaded documents, creates vector embeddings, stores them in ChromaDB, retrieves relevant document chunks, and uses Google Gemini to generate answers grounded in the uploaded document.

---

## 🚀 Live Demo

### Frontend
https://apexrag.netlify.app/

### Backend API
https://apexrag.onrender.com/

### API Documentation
https://apexrag.onrender.com/docs

---

## ✨ Features

- 📄 Upload PDF, DOCX, and TXT documents
- 🧹 Document text cleaning and preprocessing
- 🧩 Intelligent document chunking
- 🏷️ Metadata enrichment
- 🔢 Vector embeddings using Google Gemini Embeddings
- 🗄️ ChromaDB vector storage
- 🔎 Semantic similarity search
- 🤖 Google Gemini for answer generation
- 🎯 Document-grounded answers
- 🛡️ Basic hallucination handling
- 📚 Document and page source references
- 💬 Interactive chat interface
- 📱 Responsive frontend
- ⚡ FastAPI REST API
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
                    │        FastAPI          │
                    │        Backend           │
                    └────────────┬────────────┘
                                 │
                   ┌─────────────┴─────────────┐
                   │                           │
                   ▼                           ▼
          ┌──────────────────┐        ┌──────────────────┐
          │    Ingestion     │        │    Retrieval     │
          ├──────────────────┤        ├──────────────────┤
          │ Load             │        │ Query Embedding  │
          │ Clean            │        │ Similarity Search│
          │ Structure        │        │ Context Building │
          │ Chunk            │        │ Prompting        │
          │ Metadata         │        │ Gemini LLM       │
          │ Embeddings       │        └────────┬─────────┘
          └────────┬─────────┘                 │
                   │                           │
                   ▼                           │
          ┌──────────────────┐                 │
          │     ChromaDB     │◄────────────────┘
          │   Vector Store   │
          └──────────────────┘
                   │
                   ▼
             Answer + Sources
````

---

# 🔄 How It Works

## 1. Document Upload

The user uploads a PDF, DOCX, or TXT document through the frontend.

```text
Document
   │
   ▼
Upload
   │
   ▼
Load Document
```

---

## 2. Document Ingestion

The document passes through the ingestion pipeline:

```text
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
Gemini Embeddings
  │
  ▼
ChromaDB
```

Each chunk is converted into a vector representation and stored in ChromaDB together with its metadata.

---

## 3. Question

The user asks a question about the uploaded document.

```text
User Question
      │
      ▼
Question Embedding
      │
      ▼
Semantic Similarity Search
      │
      ▼
Relevant Document Chunks
```

---

## 4. Retrieval

ApexRAG searches ChromaDB for the most relevant chunks using semantic similarity.

The retrieved documents are filtered using the document ID so that the answer remains associated with the correct uploaded document.

---

## 5. Answer Generation

The retrieved context and user's question are passed to Google Gemini.

```text
Question + Retrieved Context
             │
             ▼
       Google Gemini
             │
             ▼
        Final Answer
```

The model is instructed to answer using the provided document context rather than relying on unsupported information.

---

## 6. Sources

The response also includes the source document name and page number for the retrieved content.

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

---

# 🧠 Embedding Architecture

ApexRAG uses Google's Gemini Embeddings through LangChain.

```python
GoogleGenerativeAIEmbeddings(
    model="gemini-embedding-2",
    output_dimensionality=768
)
```

The embedding model is initialized using a singleton-style approach:

```python
_embedding_model = None
```

The model is created only when required and then reused.

This avoids unnecessarily recreating the embedding model object during the application's lifetime.

---

# 🤖 LLM

Google Gemini is used for final answer generation.

The application uses:

```text
Model: gemini-3.5-flash
Temperature: 0
```

A temperature of `0` is used to make responses more consistent and focused on the retrieved document context.

---

# 🗄️ Vector Database

ApexRAG uses **ChromaDB** as its vector store.

ChromaDB stores:

* Document chunks
* Vector embeddings
* Document metadata
* Document IDs
* Source information

The application uses a persistent ChromaDB directory:

```text
./chroma_db
```

The collection used by the application is:

```text
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
├── Routes/
│   ├── chat.py
│   └── documents.py
│
├── chroma_db/
│
├── uploads/
│
├── main.py
├── requirements.txt
├── .env.example
└── .gitignore
```

---

# 🧰 Tech Stack

| Technology        | Purpose                       |
| ----------------- | ----------------------------- |
| Python            | Backend programming language  |
| FastAPI           | REST API and backend          |
| LangChain         | RAG and LLM orchestration     |
| Google Gemini     | Answer generation             |
| Gemini Embeddings | Document and query embeddings |
| ChromaDB          | Vector database               |
| PyMuPDF           | PDF document processing       |
| python-docx       | DOCX processing               |
| HTML              | Frontend structure            |
| CSS               | Frontend styling              |
| JavaScript        | Frontend functionality        |
| Bootstrap         | UI components                 |
| Netlify           | Frontend deployment           |
| Render            | Backend deployment            |

---

# 📄 Supported Documents

| Format | Supported |
| ------ | --------- |
| PDF    | ✅         |
| DOCX   | ✅         |
| TXT    | ✅         |

Maximum upload size:

```text
20 MB
```

---

# 🔌 API Endpoints

## Upload Document

```http
POST /documents/upload
```

Uploads and processes a document.

The endpoint:

1. Saves the uploaded document
2. Loads its content
3. Cleans the text
4. Detects structure
5. Creates chunks
6. Adds metadata
7. Generates embeddings
8. Stores vectors in ChromaDB

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

## Ask a Question

```http
POST /chat
```

### Request

```json
{
  "question": "What is the purpose of recruitment?",
  "document_id": "8ad88663-6519-4ddc-a0a9-c15a526891a3"
}
```

### Response

```json
{
  "answer": "The purpose of recruitment is to ...",
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

ApexRAG is designed to keep generated answers grounded in the uploaded document.

If the relevant information cannot be found in the retrieved document context, the system returns:

```text
I could not find the answer in the provided document.
```

This prevents the system from presenting unsupported information as if it came from the uploaded document.

---

# ⚡ Efficiency

ApexRAG is designed to minimize unnecessary processing and API usage.

The application separates:

```text
Document Processing
        ↓
Embedding
        ↓
Vector Storage
        ↓
Retrieval
        ↓
LLM Generation
```

Document embeddings are generated during ingestion and stored in ChromaDB.

When a user asks a question, the application retrieves relevant chunks instead of sending the entire document to the LLM.

Only the retrieved context is passed to Gemini for answer generation.

---

# 🧪 Testing

ApexRAG can be tested using different types of questions.

### 1. Direct Questions

Questions whose answers are explicitly available in the document.

Example:

```text
What is the main purpose of the organization?
```

### 2. Comparative Questions

Questions requiring information from different sections.

Example:

```text
What is the difference between recruitment and selection?
```

### 3. Contextual Questions

Questions requiring multiple retrieved chunks.

Example:

```text
Explain the process described in the document.
```

### 4. Hallucination Tests

Questions about information that does not exist in the uploaded document.

Example:

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

The frontend is deployed using:

```text
Netlify
```

Live frontend:

```text
https://apexrag.netlify.app/
```

The frontend contains:

```text
index.html
style.css
script.js
```

---

## Backend

The FastAPI backend is deployed using:

```text
Render
```

Backend:

```text
https://apexrag.onrender.com/
```

Swagger documentation:

```text
https://apexrag.onrender.com/docs
```

---

# 🔐 Environment Variables

Create a `.env` file:

```env
GOOGLE_API_KEY=your_google_api_key
```

The API key is used for Google Gemini services.

> Never commit your `.env` file to GitHub.

---

# 🚀 Local Setup

## 1. Clone the Repository

```bash
git clone https://github.com/buildbyowais/ApexRAG.git
cd ApexRAG
```

## 2. Create Virtual Environment

```bash
python -m venv rag_env
```

## 3. Activate Environment

### Windows

```bash
rag_env\Scripts\activate
```

### Linux / macOS

```bash
source rag_env/bin/activate
```

## 4. Install Dependencies

```bash
pip install -r requirements.txt
```

## 5. Configure Environment

Create `.env`:

```env
GOOGLE_API_KEY=your_api_key_here
```

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

# 🎯 Design Goals

### Accuracy

Retrieve relevant document chunks before generating an answer.

### Grounding

Keep answers based on the uploaded document.

### Conciseness

Generate useful answers without unnecessary content.

### Transparency

Provide source document and page information.

### Efficiency

Store document embeddings in ChromaDB and retrieve only relevant context for each question.

### Simplicity

Keep the application focused on document-based question answering without unnecessary features.

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
* Authentication and user accounts
* Document management
* Conversation memory
* RAG evaluation metrics
* Improved deployment infrastructure

---

# 👨‍💻 Author

**Muhammad Owais Shabbir**

GitHub:

[https://github.com/buildbyowais](https://github.com/buildbyowais)

---

# 📜 License

This project was developed for educational and project purposes.
