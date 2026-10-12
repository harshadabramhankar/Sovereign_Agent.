# Sovereign AI Workbench — Backend

FastAPI backend for SIH26117. Layered structure: `api/` (routes) →
`services/` (business logic) → `repositories/` (data access) → `models/` (ORM),
with `agents/`, `rag/`, `ocr/`, and `sandbox/` as the AI/execution subsystems.

## Getting started

```
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

## Layout

- `app/api/v1/endpoints/` — one file per resource (auth, tasks, documents, agents, knowledge, audit, security, websocket)
- `app/agents/` — model router, planner, executor, and tool wrappers (OCR, RAG, Excel, code sandbox)
- `app/rag/` — indexing, chunking, embeddings, retrieval
- `app/sandbox/` — Docker-based isolated code execution
- `app/db/` — SQLAlchemy session and base
- `tests/` — one test module per resource
