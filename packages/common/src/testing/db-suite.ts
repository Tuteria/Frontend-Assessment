import { suite } from "uvu";
import * as core from "express-serve-static-core";
import { PrismaClient } from "@prisma/client";

function getDataSource(
  name: string,
  url: string,
  provider: string | null | undefined = "sqlite"
) {
  return {
    [name]: {
      provider,
      url,
    },
  };
}
export function dbSuite(
  text: string,
  app: core.Express,
  db_path: string,
  provider: string | null | undefined
) {
  const suiteName = suite(text);
  async function beforeCallback() {
    const prisma = new PrismaClient({
      datasources: getDataSource("db", db_path, provider),
    });
    app.locals.prisma = prisma;
    return prisma;
  }

  return { suiteName, beforeCallback };
}
