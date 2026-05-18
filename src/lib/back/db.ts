import { PrismaClient } from "@prisma/client";

// Singleton pattern pour éviter les instances multiples de Prisma
// Crucial pour Next.js avec HMR en dev et performance en prod
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not defined");
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "info", "warn", "error"]
        : ["warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}