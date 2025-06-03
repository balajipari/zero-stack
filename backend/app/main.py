from fastapi import FastAPI
from app.api.users import router as auth_router
from app.api.memberships import router as memberships_router
from app.api.content import router as content_router
from app.api.interns import router as interns_router
from app.api.founders import router as founders_router
from app.core.config import settings
from tortoise.contrib.fastapi import register_tortoise

app = FastAPI(title=settings.PROJECT_NAME)

app.include_router(auth_router, prefix="/api")
app.include_router(memberships_router, prefix="/api")
app.include_router(content_router, prefix="/api")
app.include_router(interns_router, prefix="/api")
app.include_router(founders_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Welcome to Zerostack Platform API"}

db_url = (
    f"postgres://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}"
    f"@{settings.POSTGRES_HOST}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"
)

register_tortoise(
    app,
    db_url=db_url,
    modules={"models": [
        "app.models.user",
        "app.models.membership",
        "app.models.content",
        "app.models.intern",
        "app.models.founder"
    ]},
    generate_schemas=True,
    add_exception_handlers=True,
)
