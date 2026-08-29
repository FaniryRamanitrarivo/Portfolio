import { PrismaClient } from "@prisma/client";
import { env } from "@/src/lib/env";

// Singleton pattern pour éviter les instances multiples de Prisma
// Crucial pour Next.js avec HMR en dev et performance en prod
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasourceUrl: env.DATABASE_URL,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "info", "warn", "error"]
        : ["warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}