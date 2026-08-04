<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in node_modules/next/dist/docs/ before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Indonesia Data Reader

Web app + NPM package untuk membaca & memvalidasi data identitas & wilayah Indonesia. Mirip [nik-reader](https://github.com/zakiego/nik-reader) tapi diperluas ke beberapa jenis data pemerintahan sekaligus.

## Target Claude for OSS

Apply via https://claude.com/contact-sales/claude-for-oss

- Kategori: Community builder / "Don't quite fit? apply anyway"
- Nilai jual: Satu-satunya unified reader untuk NIK + Kode Pos + Plat Nomor + NPSN dalam satu package. Ekosistem developer Indonesia butuh ini.
- Strategy: Bikin NPM package indonesia-data-reader + companion web app live demo di Vercel. Star repo, promoin ke komunitas JS Indonesia.

## Data

Semua file mentah ada di root project (di-gitignore):

| File | Ukuran | Isi | Sumber |
|------|--------|-----|--------|
| data_wilayah.sql | 2.9 MB | Provinsi, Kab, Kec, Kelurahan (91rb baris) | cahyadsn/wilayah |
| data_kodepos.json | 15 MB | 92rb kelurahan + kode pos + koordinat | sooluh/kodepos |
| data_plat_nomor.json | 7.7 KB | 61 kode plat nomor | Wikipedia |
| data_npsn.json | 82 MB | 213rb sekolah (SD/SMP/SMA/SMK) | api-sekolah-indonesia |

### Arsitektur data

Hardcode (.ts)               → data_plat_nomor.json (7 KB — kecil, tidak pernah berubah)
Hardcode (.ts)               → data_wilayah.sql → konversi ke .ts (2.9 MB — jarang berubah)
Turso + Drizzle              → data_kodepos.json → import ke tabel kodepos (15 MB — perlu search/filter)
Turso + Drizzle              → data_npsn.json → import ke tabel sekolah (82 MB — terlalu besar untuk hardcode)

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Drizzle ORM + Turso (SQLite)
- tRPC (internal API)
- REST API /api/v0/* (public, kayak zakiego)
- NPM package publish

## Fitur

### 1. NIK Reader
- Input: NIK 16 digit
- Output: provinsi, kabupaten, kecamatan, jenis kelamin, tanggal lahir, unique ID
- Endpoint: POST /api/v0/nik
- Data dari: data_wilayah.sql → hardcode ke .ts

### 2. Kode Pos Reader
- Input: kode pos (5 digit) → kelurahan, kec, kab, prov, koordinat
- Input: nama kelurahan → kode pos
- Endpoint: POST /api/v0/kodepos
- Data dari: Turso (tabel kodepos)

### 3. Plat Nomor Reader
- Input: kode plat (1-2 huruf) → wilayah, polda, pulau
- Endpoint: POST /api/v0/plat
- Data dari: hardcode .ts

### 4. NPSN / Cek Sekolah
- Input: NPSN (8 digit) → nama sekolah, jenjang, alamat, status, koordinat
- Endpoint: POST /api/v0/npsn
- Data dari: Turso (tabel sekolah)

### 5. Generator (nice-to-have)
- Generate NIK dummy yang valid (berdasarkan provinsi/kab/kec)
- Generate kode pos random

## Phases

### Phase 1 — Setup (done)
- [x] Clone data mentah (wilayah, kodepos, plat, npsn)
- [x] Setup Next.js project
- [ ] Setup Tailwind CSS v4
- [ ] Setup Drizzle + Turso
- [ ] Setup tRPC

### Phase 2 — Database
- [ ] Konversi data_wilayah.sql → TypeScript (export const)
- [ ] Import data_kodepos.json → tabel kodepos di Turso
- [ ] Import data_npsn.json → tabel sekolah di Turso
- [ ] Data plat nomor → lib/data/plat.ts

### Phase 3 — API
- [ ] tRPC router: nik.read, kodepos.search, plat.read, npsn.read
- [ ] REST endpoint: POST /api/v0/nik, /kodepos, /plat, /npsn
- [ ] Validasi input (Zod schema)

### Phase 4 — Web App
- [ ] Halaman utama: tab switcher (NIK | Kode Pos | Plat | NPSN)
- [ ] Form input + hasil
- [ ] Halaman /nik/[nik], /kodepos/[kode], /plat/[kode], /npsn/[npsn]
- [ ] SEO: metadata, OG image, structured data
- [ ] Dark mode

### Phase 5 — NPM Package
- [ ] Setup build config (tsup)
- [ ] Export fungsi: parseNIK(), searchKodepos(), readPlat(), readNPSN()
- [ ] TypeScript types
- [ ] Tree-shakeable

### Phase 6 — Launch
- [ ] Deploy ke Vercel
- [ ] Publish NPM
- [ ] README + dokumentasi
- [ ] Apply Claude for OSS

## Inspirasi
- zakiego/nik-reader — arsitektur (Next.js + tRPC + REST + hardcode data)
- cahyadsn/wilayah — sumber data wilayah
- sooluh/kodepos — sumber data kode pos