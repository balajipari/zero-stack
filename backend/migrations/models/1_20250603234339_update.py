from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS "Course" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "accessible_memberships" JSONB,
    "status" VARCHAR(32) NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
        CREATE TABLE IF NOT EXISTS "Cohort" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "start_date" DATE,
    "end_date" DATE,
    "status" VARCHAR(32) NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "course_id" INT NOT NULL REFERENCES "Course" ("id") ON DELETE CASCADE
);
        CREATE TABLE IF NOT EXISTS "CourseMembership" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "enrolled_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(32) NOT NULL DEFAULT 'active',
    "cohort_id" INT REFERENCES "Cohort" ("id") ON DELETE CASCADE,
    "course_id" INT NOT NULL REFERENCES "Course" ("id") ON DELETE CASCADE,
    "user_id" INT NOT NULL REFERENCES "User" ("id") ON DELETE CASCADE
);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        DROP TABLE IF EXISTS "Course";
        DROP TABLE IF EXISTS "Cohort";
        DROP TABLE IF EXISTS "CourseMembership";"""
