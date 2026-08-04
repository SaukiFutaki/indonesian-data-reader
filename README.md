# Indonesia Data Reader

Parse and validate Indonesian identity and regional data — NIK, postal codes, license plates, and school data — through a single package and API.

## Features

### NIK Reader

Read and validate a 16-digit Indonesian ID number.

**Format:** `PPBBCCDDMMYYXXXX`

| Segment | Digits | Meaning |
|---------|--------|---------|
| PP | 1–2 | Province code |
| BB | 3–4 | Regency/city code |
| CC | 5–6 | District code |
| DD | 7–8 | Day of birth (add 40 for women) |
| MM | 9–10 | Month of birth |
| YY | 11–12 | Year of birth (last two digits) |
| XXXX | 13–16 | Serial number |

Reference: [Wikipedia — Nomor Induk Kependudukan](https://id.wikipedia.org/wiki/Nomor_Induk_Kependudukan)

```
POST /api/v0/nik
{ "nik": "3174040123450001" }

→ {
    provinsi: "DKI Jakarta",
    kabupaten: "Jakarta Pusat",
    kecamatan: "Menteng",
    jenis_kelamin: "LAKI-LAKI",
    tanggal_lahir: "2001-04-01"
  }
```

### Kode Pos

Search by postal code or village name. 92,000+ villages with coordinates and elevation.

**Format:** 5-digit code `ABCDE`

| Digit | Meaning |
|-------|---------|
| A | Postal region |
| B–C | City/regency |
| D | District |
| E | Village/sub-district |

Reference: [Wikipedia — Kode pos](https://id.wikipedia.org/wiki/Kode_pos)

```
POST /api/v0/kodepos
{ "code": 40115 }

→ {
    kelurahan: "Ciroyom",
    kecamatan: "Andir",
    kabupaten: "Kota Bandung",
    provinsi: "Jawa Barat",
    latitude: -6.9093,
    longitude: 107.5838
  }
```

### Plat Nomor

Decode Indonesian vehicle license plate area codes to region, police jurisdiction, and island.

**Format:** `K NNNN XX` — 1–2 letter area code followed by registration number and series.

Reference: [Wikipedia — Tanda Nomor Kendaraan Bermotor Indonesia](https://id.wikipedia.org/wiki/Tanda_Nomor_Kendaraan_Bermotor_Indonesia)

```
POST /api/v0/plat
{ "kode": "B" }

→ {
    wilayah: "DKI Jakarta, Depok, Tangerang, Bekasi",
    polda: "Polda Metro Jaya",
    pulau: "Jawa"
  }
```

61 codes covering all 38 provinces across Sumatra, Java, Kalimantan, Sulawesi, Nusa Tenggara, Maluku, and Papua.

### NPSN

Look up school details by 8-digit National School ID assigned by Kemendikbud. 213,000+ schools from PAUD through SMA/SMK, including coordinates.

Reference: [Wikipedia — Nomor Pokok Sekolah Nasional](https://id.wikipedia.org/wiki/Nomor_pokok_sekolah_nasional)

```
POST /api/v0/npsn
{ "npsn": "20104775" }

→ {
    nama: "SD MELANIA III",
    jenjang: "SD",
    status: "Swasta",
    alamat: "Jl. Percetakan Negara No. 31",
    kabupaten: "Kota Jakarta Pusat",
    provinsi: "DKI Jakarta",
    lintang: -6.1824,
    bujur: 106.8667
  }
```

## Data

| Dataset | Records | Storage |
|---------|---------|---------|
| Administrative regions (province → village) | 91,162 | Hardcoded (Map lookup, O(1)) |
| Postal codes | 83,761 | Turso + Drizzle ORM |
| License plates | 61 | Hardcoded |
| Schools (NPSN) | 213,195 | Turso + Drizzle ORM |

Total: ~388,000 records covering all 38 provinces of Indonesia. Indexed for fast search by name, code, and region.

## Setup

```bash
bun install
cp .env.example .env  # TURSO_CONNECTION_URL and TURSO_AUTH_TOKEN
bunx drizzle-kit migrate
bun run scripts/seed.ts
bun dev
```

## License

MIT
