from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from app.api.users import router as auth_router
from app.api.memberships import router as memberships_router
from app.api.content import router as content_router
from app.api.interns import router as interns_router
from app.api.founders import router as founders_router
from app.api.admin_users import router as admin_users_router
from app.api.audit_logs import router as audit_logs_router
from app.core.config import settings
from tortoise.contrib.fastapi import register_tortoise

TORTOISE_ORM = {
    "connections": {
        "default": f"postgres://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@{settings.POSTGRES_HOST}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"
    },
    "apps": {
        "models": {
            "models": [
                "app.models.user",
                "app.models.membership",
                "app.models.content",
                "app.models.intern",
                "app.models.founder",
                "app.models.course",
                "app.models.cohort",
                "app.models.course_membership",
                "app.models.event",
                "app.models.event_registration",
                "app.models.meetup",
                "app.models.meetup_photo",
                "app.models.audit_log",
                "aerich.models"
            ],
            "default_connection": "default",
        },
    },
}

app = FastAPI(title=settings.PROJECT_NAME)

app.include_router(auth_router, prefix="/api")
app.include_router(memberships_router, prefix="/api")
app.include_router(content_router, prefix="/api")
app.include_router(interns_router, prefix="/api")
app.include_router(founders_router, prefix="/api")
app.include_router(admin_users_router, prefix="/api")
app.include_router(audit_logs_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Welcome to Zerostack Platform API"}

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "status": "error",
            "code": exc.status_code,
            "message": exc.detail,
        },
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={
            "status": "error",
            "code": 422,
            "message": "Validation error",
            "details": exc.errors(),
        },
    )

register_tortoise(
    app,
    db_url=TORTOISE_ORM["connections"]["default"],
    modules={"models": TORTOISE_ORM["apps"]["models"]["models"]},
    generate_schemas=True,
    add_exception_handlers=True,
)
