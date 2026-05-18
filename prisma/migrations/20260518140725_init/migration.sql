-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "client" TEXT,
    "duration" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "category" TEXT,
    "description" TEXT,
    "image" TEXT,
    "github" TEXT,
    "link" TEXT,
    "responsibilities" JSONB NOT NULL DEFAULT '[]',
    "keyResults" JSONB NOT NULL DEFAULT '[]',
    "challenges" JSONB NOT NULL DEFAULT '[]',
    "solutions" JSONB NOT NULL DEFAULT '[]',
    "technologies" JSONB NOT NULL DEFAULT '[]',
    "popular" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Project_popular_idx" ON "Project"("popular");

-- CreateIndex
CREATE INDEX "Project_createdAt_idx" ON "Project"("createdAt");
