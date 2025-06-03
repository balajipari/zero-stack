from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SECRET_KEY: str = "your-secret-key"  # Replace with env var in production
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
    PROJECT_NAME: str = "Zerostack Platform"
    POSTGRES_USER: str | None = None
    POSTGRES_PASSWORD: str | None = None
    POSTGRES_DB: str | None = None
    POSTGRES_HOST: str | None = None
    POSTGRES_PORT: str | None = None

    class Config:
        env_file = ".env"

settings = Settings()
