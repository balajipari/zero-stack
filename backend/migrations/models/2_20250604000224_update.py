from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS "Event" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "start_time" TIMESTAMPTZ NOT NULL,
    "end_time" TIMESTAMPTZ,
    "location" VARCHAR(255),
    "accessible_memberships" JSONB,
    "payment_required" BOOL NOT NULL DEFAULT False,
    "status" VARCHAR(32) NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
        CREATE TABLE IF NOT EXISTS "EventRegistration" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "registered_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(32) NOT NULL DEFAULT 'registered',
    "event_id" INT NOT NULL REFERENCES "Event" ("id") ON DELETE CASCADE,
    "user_id" INT NOT NULL REFERENCES "User" ("id") ON DELETE CASCADE
);
        CREATE TABLE IF NOT EXISTS "Meetup" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "date" TIMESTAMPTZ NOT NULL,
    "location" VARCHAR(255),
    "status" VARCHAR(32) NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
        CREATE TABLE IF NOT EXISTS "MeetupPhoto" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "file_path" VARCHAR(512) NOT NULL,
    "uploaded_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meetup_id" INT NOT NULL REFERENCES "Meetup" ("id") ON DELETE CASCADE
);
        CREATE TABLE IF NOT EXISTS "AuditLog" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "action" VARCHAR(64) NOT NULL,
    "resource" VARCHAR(64) NOT NULL,
    "resource_id" INT,
    "details" JSONB,
    "timestamp" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INT NOT NULL REFERENCES "User" ("id") ON DELETE CASCADE
);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        DROP TABLE IF EXISTS "AuditLog";
        DROP TABLE IF EXISTS "MeetupPhoto";
        DROP TABLE IF EXISTS "Meetup";
        DROP TABLE IF EXISTS "Event";
        DROP TABLE IF EXISTS "EventRegistration";"""
