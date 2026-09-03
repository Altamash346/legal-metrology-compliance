# Legal Metrology Compliance Checker (LMCC)

> **AI-Powered Compliance Verification for Packaged Commodities under Legal Metrology (Packaged Commodities) Rules, 2011**

A production-quality system for the Department of Consumer Affairs (DoCA), Ministry of Consumer Affairs, Food & Public Distribution, Government of India, to automatically check compliance of packaged commodities by scanning product images and labels.

⚠️ **Disclaimer:** This is an AI-assisted compliance screening tool. Final legal determination remains subject to verification by authorized authorities.

---

## Features

- **OCR-Based Label Scanning** — Extract text from product images using PaddleOCR with OpenCV preprocessing
- **Structured Field Extraction** — Automatically identify MRP, net quantity, manufacturer details, dates, FSSAI numbers, etc.
- **Configurable Rule Engine** — 14+ rule types (required field, regex, numeric range, date validation, conditional, font size, etc.)
- **Deterministic Compliance Evaluation** — Legal decisions made by rules, not LLM hallucination
- **Compliance Scoring** — Weighted scoring with severity-based penalties
- **Visual Evidence** — Bounding boxes and annotations for every detected field and violation
- **Report Generation** — Professional PDF and DOCX compliance reports
- **Enforcement Dashboard** — Real-time statistics, trends, and violation analytics
- **Inspection History** — Searchable, filterable inspection database
- **Role-Based Access** — Admin, Inspector, and Viewer roles
- **Rule Management** — Admin UI for adding, editing, importing/exporting compliance rules

---

## Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Recharts |
| **Backend** | Python 3.11+, FastAPI, SQLAlchemy 2.x, Pydantic v2 |
| **AI/CV** | OpenCV, PaddleOCR |
| **Database** | PostgreSQL 15+ |
| **Cache** | Redis 7 |
| **Reports** | ReportLab (PDF), python-docx (DOCX) |
| **Auth** | JWT + bcrypt |
| **Deploy** | Docker, Docker Compose |

---

## Prerequisites

- Docker and Docker Compose v2
- Node.js 18+ (for local frontend development)
- Python 3.11+ (for local backend development)
- Git

---

## Quick Start (Docker)

```bash
# 1. Clone the repository
git clone <repository-url>
cd legal-metrology-compliance

# 2. Copy environment configuration
cp .env.example .env

# 3. Start all services
docker compose up --build

# 4. Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

---

## Local Development Setup

### Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Start PostgreSQL and Redis (via Docker)
docker compose up db redis -d

# Run database migrations
alembic upgrade head

# Seed demo data
python -m app.seed

# Start the backend
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Access Points

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| API Documentation (Swagger) | http://localhost:8000/docs |
| API Documentation (ReDoc) | http://localhost:8000/redoc |

---

## Environment Variables

See [.env.example](.env.example) for all configuration options.

| Variable | Description | Default |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql+asyncpg://...` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379/0` |
| `JWT_SECRET_KEY` | Secret key for JWT tokens | (change in production!) |
| `STORAGE_PATH` | Local file storage path | `./storage` |
| `CORS_ORIGINS` | Allowed CORS origins | `http://localhost:3000` |
| `OCR_CONFIDENCE_THRESHOLD` | Minimum OCR confidence | `0.70` |
| `ADMIN_EMAIL` | Initial admin email | `admin@lmcc.gov.in` |
| `ADMIN_PASSWORD` | Initial admin password | `Admin@123456` |

---

## Default Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@lmcc.gov.in | Admin@123456 |

---

## Demo Rules

The system includes 22 demo compliance rules in [rules/demo_rules.json](rules/demo_rules.json).

These rules are **DEMO DATA** for system testing and are NOT official legal requirements.

### Rules Summary

| Category | Count |
|---|---|
| Mandatory Declaration | 9 |
| Format Validation | 3 |
| Date Validation | 2 |
| Numeric Validation | 1 |
| Conditional Requirement | 2 |
| Product Specific | 3 |
| Regulatory | 2 |

### Importing Official Rules

1. Navigate to **Rules Management** (Admin only)
2. Click **Import Rules**
3. Upload a JSON file conforming to [rules/schema.json](rules/schema.json)
4. Review and confirm the import

---

## Project Structure

```
legal-metrology-compliance/
├── frontend/          # Next.js application
├── backend/           # FastAPI application
│   ├── app/
│   │   ├── api/       # REST API endpoints
│   │   ├── models/    # SQLAlchemy models
│   │   ├── schemas/   # Pydantic schemas
│   │   ├── services/  # Business logic
│   │   ├── ocr/       # OCR pipeline
│   │   ├── rules/     # Rule engine
│   │   ├── reports/   # Report generation
│   │   └── utils/     # Utilities
│   ├── migrations/    # Alembic migrations
│   └── tests/         # Test suite
├── rules/             # Rule definitions
├── storage/           # File storage
├── docker-compose.yml
└── .env.example
```

---

## Testing

```bash
cd backend

# Run all tests
pytest tests/ -v

# Run specific test suites
pytest tests/test_rule_engine.py -v
pytest tests/test_field_extraction.py -v
pytest tests/test_auth.py -v
```

---

## Architecture

```
User → Frontend (Next.js) → Backend API (FastAPI)
                                    ↓
                              Image Upload
                                    ↓
                           OpenCV Preprocessing
                                    ↓
                              PaddleOCR
                                    ↓
                          Field Extraction (Regex + Pattern)
                                    ↓
                          Rule Engine (Deterministic)
                                    ↓
                         Compliance Scoring
                                    ↓
                        Results + Evidence + Reports
                                    ↓
                             PostgreSQL Database
```

---

## License

This project is developed for the Department of Consumer Affairs, Government of India.

---

## Acknowledgments

- Ministry of Consumer Affairs, Food & Public Distribution
- Department of Consumer Affairs (DoCA)
- Legal Metrology Division
