/**
 * Seed only missing NPSN records — reads existing, inserts delta.
 * Usage: bun run scripts/seed-missing.ts
 */

import { config } from "dotenv";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { sekolah } from "../lib/db/schema";
import * as fs from "node:fs";

config({ path: ".env" });
 
const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});
const db = drizzle(client);

async function main() {
  // 1. Get existing NPSNs
  console.log("📊 Fetching existing NPSNs...");
  const existing = await client.execute("SELECT npsn FROM sekolah");
  const existingSet = new Set(existing.rows.map((r) => r.npsn));
  console.log(`  Existing: ${existingSet.size.toLocaleString()}`);

  // 2. Load JSON, filter missing
  console.log("📦 Loading data_npsn.json...");
  const data: Array<{
    kode_prop: string; propinsi: string; kode_kab_kota: string;
    kabupaten_kota: string; kode_kec: string; kecamatan: string;
    id: string; npsn: string; sekolah: string; bentuk: string;
    status: string; alamat_jalan: string; lintang: string; bujur: string;
  }> = JSON.parse(fs.readFileSync("data_npsn.json", "utf-8"));

  const missing = data.filter((d) => !existingSet.has(d.npsn));
  console.log(`  Missing: ${missing.length.toLocaleString()}`);

  if (missing.length === 0) {
    console.log(" Already complete!");
    return;
  }

  // 3. Insert missing in small batches
  const BATCH = 50;
  for (let i = 0; i < missing.length; i += BATCH) {
    const batch = missing.slice(i, i + BATCH).map((d) => ({
      kodeProp: d.kode_prop,
      propinsi: d.propinsi,
      kodeKabKota: d.kode_kab_kota,
      kabupatenKota: d.kabupaten_kota,
      kodeKec: d.kode_kec,
      kecamatan: d.kecamatan,
      refId: d.id,
      npsn: d.npsn,
      sekolah: d.sekolah,
      bentuk: d.bentuk,
      status: d.status,
      alamatJalan: d.alamat_jalan,
      lintang: d.lintang ? Number.parseFloat(d.lintang) : null,
      bujur: d.bujur ? Number.parseFloat(d.bujur) : null,
    }));
    await db.insert(sekolah).values(batch).onConflictDoNothing();
    const done = Math.min(i + BATCH, missing.length);
    if (i % (BATCH * 20) === 0 || done === missing.length) {
      console.log(`  ✓ ${done.toLocaleString()}/${missing.length.toLocaleString()}`);
    }
  }

  const r = await client.execute("SELECT count(*) as cnt FROM sekolah");
  console.log(` Done! Sekolah records: ${r.rows[0].cnt}`);
}

main().catch((err) => {
  console.error("❌ Failed:", err);
  process.exit(1);
});




