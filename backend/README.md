# Zerostack Platform Backend

A FastAPI backend for the Zerostack platform, supporting tech/product builders, founders, and interns. Features include user authentication, memberships, content, events, meetups, intern marketplace, and SuperAdmin dashboards.

---

## Features

- **User Authentication & Roles:** SuperAdmin, builder, founder, intern
- **Membership Management:** Foundational, growth, etc.
- **Content Hub:** Blogs, case studies, podcasts (public and admin)
- **Intern & Founder Profiles:** Marketplace, star interns, founder controls
- **Course & Cohort Management:** Enrollment, access control
- **Event & Meetup Management:** Registration, photo uploads
- **Admin/SuperAdmin Dashboards:** User/resource management, audit logs
- **Audit Logging:** All sensitive actions by SuperAdmin are logged
- **Consistent Error Handling:** Standardized error responses
- **OpenAPI/Swagger Docs:** Auto-generated at `/docs`
- **Dockerized & CI/CD Ready:** GitHub Actions workflow included

---

## Project Structure

```
backend/
├── app/
│   ├── api/           # FastAPI routers (users, memberships, content, etc.)
│   ├── core/          # Configuration and settings
│   ├── models/        # Tortoise ORM models
│   ├── schemas/       # Pydantic schemas
│   ├── services/      # Business logic/services
│   ├── utils/         # Utility functions (JWT, password hashing, etc.)
│   └── main.py        # FastAPI app entrypoint
├── migrations/        # Aerich migration scripts
├── scripts/           # (Reserved for utility scripts)
├── requirements.txt   # Python dependencies
├── Dockerfile         # Docker build file
├── .dockerignore      # Docker ignore file
├── pyproject.toml     # Aerich config
└── .github/
    └── workflows/
        └── ci.yml    # GitHub Actions CI/CD workflow
```

---

## Requirements

- Python 3.11+
- PostgreSQL (for production)
- (Optional) Docker

---

## Environment Variables

Create a `.env` file in `backend/` with the following variables:

```
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
PROJECT_NAME=Zerostack Platform
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=your_db_name
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

---

## Installation & Local Development

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd backend
   ```

2. **Create and activate a virtual environment:**
   ```sh
   python -m venv venv
   source venv/Scripts/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```sh
   pip install -r requirements.txt
   ```

4. **Set up the database:**
   - Ensure PostgreSQL is running and your `.env` is configured.
   - Run migrations:
     ```sh
     aerich upgrade
     ```

5. **Run the server:**
   ```sh
   uvicorn app.main:app --reload
   ```

6. **Access the API docs:**
   - Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
   - OpenAPI JSON: [http://localhost:8000/openapi.json](http://localhost:8000/openapi.json)

---

## Docker Usage

1. **Build the Docker image:**
   ```sh
   docker build -t zerostack-backend .
   ```

2. **Run the container:**
   ```sh
   docker run --env-file .env -p 8000:8000 zerostack-backend
   ```

---

## CI/CD

- **GitHub Actions**: Automated workflow for linting and testing on every push/PR to `main`.
- See `.github/workflows/ci.yml` for details.

---

## Testing

- (Recommended) Use `pytest` and `pytest-asyncio` for unit/integration tests.
- To run tests:
  ```sh
  pytest
  ```

---

## License

MIT (or your chosen license)

---

## Contact

For questions or contributions, open an issue or pull request. 