/**
 * Seed script: import data_kodepos.json & data_npsn.json ke Turso
 * Usage: bun run scripts/seed.ts [kodepos|sekolah|all]
 */
import { config } from "dotenv";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { kodepos, sekolah } from "../lib/db/schema";
import * as fs from "node:fs";

config({ path: ".env" });

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});
const db = drizzle(client);

const BATCH_SIZE = 100;

async function seedKodepos() {
  console.log("📦 Loading data_kodepos.json...");
  const raw = fs.readFileSync("data_kodepos.json", "utf-8");
  const data: Array<{
    code: number;
    village: string;
    district: string;
    regency: string;
    province: string;
    latitude: number | null;
    longitude: number | null;
    elevation: number | null;
    timezone: string | null;
  }> = JSON.parse(raw);

  console.log(`📊 ${data.length} records to insert`);

  for (let i = 0; i < data.length; i += BATCH_SIZE) {
    const batch = data.slice(i, i + BATCH_SIZE);
    await db.insert(kodepos).values(batch);
    const done = Math.min(i + BATCH_SIZE, data.length);
    if (i % (BATCH_SIZE * 50) === 0 || done === data.length) {
      console.log(`  ✓ Inserted ${done.toLocaleString()}/${data.length.toLocaleString()}`);
    }
  }
  console.log("✅ Kodepos seeding complete!");
}

async function seedSekolah() {
  console.log("📦 Loading data_npsn.json...");
  const raw = fs.readFileSync("data_npsn.json", "utf-8");
  const data: Array<{
    kode_prop: string;
    propinsi: string;
    kode_kab_kota: string;
    kabupaten_kota: string;
    kode_kec: string;
    kecamatan: string;
    id: string;
    npsn: string;
    sekolah: string;
    bentuk: string;
    status: string;
    alamat_jalan: string;
    lintang: string;
    bujur: string;
  }> = JSON.parse(raw);

  console.log(`📊 ${data.length} records to insert`);

  for (let i = 0; i < data.length; i += BATCH_SIZE) {
    const batch = data.slice(i, i + BATCH_SIZE).map((d) => ({
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
    // onConflictDoNothing: skip duplicates (npsn is unique), allows resume
    await db.insert(sekolah).values(batch).onConflictDoNothing();
    const done = Math.min(i + BATCH_SIZE, data.length);
    if (i % (BATCH_SIZE * 50) === 0 || done === data.length) {
      console.log(`  ✓ Processed ${done.toLocaleString()}/${data.length.toLocaleString()}`);
    }
  }
  console.log("✅ Sekolah seeding complete!");
}

async function main() {
  const target = process.argv[2] || "all";

  if (target === "kodepos" || target === "all") {
    await seedKodepos();
  }
  if (target === "sekolah" || target === "all") {
    await seedSekolah();
  }

  console.log("🎉 Done!");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
