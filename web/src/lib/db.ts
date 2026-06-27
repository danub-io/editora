import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

export function getDb(env?: Record<string, unknown>) {
  const url = (env?.DATABASE_URL as string) || process.env.DATABASE_URL;
  const authToken = (env?.DATABASE_AUTH_TOKEN as string) || process.env.DATABASE_AUTH_TOKEN;

  if (!url) {
    throw new Error("DATABASE_URL is not defined");
  }

  const client = createClient({
    url,
    authToken,
  });

  return drizzle(client, { schema });
}
