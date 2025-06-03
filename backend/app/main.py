from fastapi import FastAPI
from app.api.users import router as auth_router
from app.api.memberships import router as memberships_router
from app.core.config import settings
from tortoise.contrib.fastapi import register_tortoise

app = FastAPI(title=settings.PROJECT_NAME)

app.include_router(auth_router, prefix="/api")
app.include_router(memberships_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Welcome to Zerostack Platform API"}

register_tortoise(
    app,
    db_url="sqlite://db.sqlite3",  # Replace with your DB URL
    modules={"models": ["app.models.user", "app.models.membership"]},
    generate_schemas=True,
    add_exception_handlers=True,
)
