/**
 * Direct SQL seed — avoid Drizzle ORM overhead, just execute INSERT OR IGNORE
 * Usage: bun run scripts/seed-direct.ts /tmp/npsn_chunks
 */

import { config } from "dotenv";
import { createClient } from "@libsql/client";
import * as fs from "node:fs";
import * as path from "node:path";

config({ path: ".env" });

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const chunksDir = process.argv[2];
if (!chunksDir || !fs.existsSync(chunksDir)) {
  console.error("Usage: bun run scripts/seed-direct.ts /tmp/npsn_chunks");
  process.exit(1);
}

const files = fs
  .readdirSync(chunksDir)
  .filter((f) => f.endsWith(".sql"))
  .sort();

console.log(` ${files.length} SQL chunks to execute`);

for (let i = 0; i < files.length; i++) {
  const sql = fs.readFileSync(path.join(chunksDir, files[i]), "utf-8");
  await client.execute(sql);
  if (i % 50 === 0 || i === files.length - 1) {
    console.log(`  ✓ ${i + 1}/${files.length}`);
  }
}

const r = await client.execute("SELECT count(*) as cnt FROM sekolah");
console.log(`✅ Done! Sekolah records: ${r.rows[0].cnt}`);
