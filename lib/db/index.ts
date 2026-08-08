import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client/http";

const url = process.env.TURSO_CONNECTION_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

function createDb() {
  if (!url || !authToken) {
    // Build time / prerender: return a stub that never gets queried.
    // Real queries only happen at runtime in the Worker, where env is set.
    return drizzle(createClient({ url: "file:placeholder.db" }));
  }
  return drizzle(createClient({ url, authToken }));
}

export const db = createDb();
