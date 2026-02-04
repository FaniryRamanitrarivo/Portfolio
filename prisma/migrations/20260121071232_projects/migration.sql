-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "category" TEXT,
    "description" TEXT,
    "image" TEXT,
    "github" TEXT,
    "link" TEXT,
    "responsibilities" JSONB NOT NULL,
    "keyResults" JSONB NOT NULL,
    "challenges" JSONB NOT NULL,
    "solutions" JSONB NOT NULL,
    "technologies" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
