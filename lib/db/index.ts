import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client/http";

const url = process.env.TURSO_CONNECTION_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

let cached: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!cached) {
    if (!url || !authToken) {
      // Only reachable at runtime if env is misconfigured. Build/prerender
      // never queries the DB, so the module can load without TURSO_* set
      // (Cloudflare Pages build only exposes .dev.vars).
      throw new Error("TURSO_CONNECTION_URL / TURSO_AUTH_TOKEN not set");
    }
    cached = drizzle(createClient({ url, authToken }));
  }
  return cached;
}
