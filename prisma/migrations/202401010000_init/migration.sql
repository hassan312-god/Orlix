CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "User" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "email" TEXT NOT NULL UNIQUE,
  "fullName" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "credits" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "Project" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'draft',
  "ownerId" UUID NOT NULL REFERENCES "User"("id"),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "Agent" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "configuration" JSONB NOT NULL,
  "projectId" UUID NOT NULL REFERENCES "Project"("id")
);

CREATE TABLE "Task" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "projectId" UUID NOT NULL REFERENCES "Project"("id"),
  "status" TEXT NOT NULL DEFAULT 'pending',
  "resultId" UUID,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "Result" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "taskId" UUID REFERENCES "Task"("id"),
  "output" JSONB NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

ALTER TABLE "Task" ADD CONSTRAINT "Task_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id");

CREATE TABLE "ApiKey" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "label" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "Subscription" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" UUID NOT NULL REFERENCES "User"("id"),
  "plan" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
