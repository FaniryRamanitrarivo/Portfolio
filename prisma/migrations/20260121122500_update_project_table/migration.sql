-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
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
    "popular" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("category", "challenges", "client", "createdAt", "description", "duration", "github", "id", "image", "keyResults", "link", "overview", "responsibilities", "role", "solutions", "technologies", "title", "updatedAt") SELECT "category", "challenges", "client", "createdAt", "description", "duration", "github", "id", "image", "keyResults", "link", "overview", "responsibilities", "role", "solutions", "technologies", "title", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
