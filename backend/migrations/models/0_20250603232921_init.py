from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS "User" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "role" VARCHAR(20) NOT NULL,
    "profile" TEXT,
    "verification_status" BOOL NOT NULL DEFAULT False,
    "password_hash" VARCHAR(128) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "Membership" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "type" VARCHAR(32) NOT NULL,
    "status" VARCHAR(32) NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INT NOT NULL REFERENCES "User" ("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "Content" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "type" VARCHAR(32) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "body" TEXT NOT NULL,
    "tags" JSONB,
    "status" VARCHAR(32) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author_id" INT NOT NULL REFERENCES "User" ("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "InternProfile" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "bio" TEXT,
    "skills" JSONB,
    "is_star" BOOL NOT NULL DEFAULT False,
    "is_listed" BOOL NOT NULL DEFAULT True,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INT NOT NULL UNIQUE REFERENCES "User" ("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "FounderProfile" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "bio" TEXT,
    "company" VARCHAR(255),
    "website" VARCHAR(255),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INT NOT NULL UNIQUE REFERENCES "User" ("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "aerich" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "version" VARCHAR(255) NOT NULL,
    "app" VARCHAR(100) NOT NULL,
    "content" JSONB NOT NULL
);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        """
