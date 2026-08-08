# Indonesia Data Reader

**Indonesia Data Reader** is a high-performance, unified platform and REST API for parsing, validating, and inspecting Indonesian identity and regional data — including 16-digit NIK numbers, 5-digit postal codes, vehicle license plates (with sub-region decoding), and 8-digit National School IDs (NPSN).

---

## Key Modules

### 1. NIK Reader (Nomor Induk Kependudukan)
Parse and validate 16-digit Indonesian national identification numbers (`PPBBCCDDMMYYXXXX`). Extract province, regency/city, district, gender (DD + 40 rule for females), and date of birth automatically.

- **Endpoint**: `POST /api/v0/nik`
- **Payload**: `{ "nik": "3204214501900001" }`
- **Response**:
```json
{
  "provinsi": "Jawa Barat",
  "kabupaten": "Kabupaten Bandung",
  "kecamatan": "Ciparay",
  "jenis_kelamin": "PEREMPUAN",
  "tanggal_lahir": "1990-01-05",
  "nomor_urut": "0001"
}
```

---

### 2. Kode Pos (Postal Code & Location Lookup)
Look up full address hierarchies (province, regency, district, village) and geographical coordinates (latitude & longitude) by 5-digit postal code or village name search across **92,000+ villages**.

- **Endpoint**: `POST /api/v0/kodepos`
- **Payload**: `{ "code": 40115 }` or `{ "query": "Braga" }`
- **Response**:
```json
{
  "kelurahan": "Ciroyom",
  "kecamatan": "Andir",
  "kabupaten": "Kota Bandung",
  "provinsi": "Jawa Barat",
  "kode_pos": 40115,
  "latitude": -6.9093,
  "longitude": 107.5838
}
```

---

### 3. Plat Nomor (Vehicle License Plate & Sub-Region Decoder)
Decode 61 regional area codes (`B`, `D`, `H`, `BK`, etc.), Police Jurisdictions (Polda), sub-regions (specific cities/regencies derived from suffix letters), and vehicle types derived from registration number ranges.

- **Endpoint**: `POST /api/v0/plat`
- **Payload**: `{ "kode": "H 2222 ALW" }`
- **Response**:
```json
{
  "kode": "H",
  "wilayah": "Jawa Tengah (Semarang, Salatiga, Kendal, Demak)",
  "subWilayah": "Kota Semarang",
  "jenisKendaraan": "Sepeda Motor",
  "polda": "Polda Jateng",
  "pulau": "Jawa"
}
```

---

### 4. NPSN (Nomor Pokok Sekolah Nasional)
Query school metadata for over **213,000+ active schools** across Indonesia (PAUD through SMA/SMK) by 8-digit NPSN code or school name.

- **Endpoint**: `POST /api/v0/npsn`
- **Payload**: `{ "npsn": "20104775" }`
- **Response**:
```json
{
  "npsn": "20104775",
  "nama": "SD MELANIA III",
  "jenjang": "SD",
  "status": "Swasta",
  "alamat": "Jl. Percetakan Negara No. 31",
  "kabupaten": "Kota Jakarta Pusat",
  "provinsi": "DKI Jakarta"
}
```

---

## Data Coverage

| Dataset | Scope / Records | Indexing Method |
|---------|-----------------|-----------------|
| **Administrative Regions** | 91,162 Regencies & Districts | In-Memory Map Lookup |
| **Postal Codes** | 83,761+ Villages with Coordinates | Database Index |
| **License Plate Codes** | 61 Regional Codes + Sub-Region Decoder | In-Memory Pattern Matcher |
| **National School Registry (NPSN)** | 213,195+ Schools (PAUD s/d SMA/SMK) | Database Index |

---

## Architecture & Privacy

- **Zero Data Retention**: Identity queries are parsed transiently without persisting input data to server storage.
- **Duo-Tone Monochrome Design**: Clean, accessible, high-contrast user interface engineered for web & mobile viewports.
- **Search Engine Optimization**: Complete metadata, OpenGraph cards, dynamic XML sitemaps, and Schema.org JSON-LD structured data.

---

## License

[MIT License](LICENSE)
