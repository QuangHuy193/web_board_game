import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

// tránh tạo nhiều instance khi dev reload
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}