import { parseWilayah } from "@/lib/data/wilayah";

interface NikResult {
  provinsi: string | null;
  kabupaten: string | null;
  kecamatan: string | null;
  jenis_kelamin: "LAKI-LAKI" | "PEREMPUAN" | null;
  tanggal_lahir: string | null;
  nomor_urut: string | null;
}

/**
 * Parse NIK (partially or fully, length 2 to 16) into identity data.
 * Format: PPBBCCDDMMYYXXXX
 */
export function parseNIK(nik: string): NikResult {
  if (!/^\d{2,16}$/.test(nik)) {
    throw new Error("NIK harus berupa angka");
  }

  const provCode = nik.slice(0, 2);
  const kabCode = nik.slice(2, 4);
  const kecCode = nik.slice(4, 6);

  let queryKode = provCode;
  if (nik.length >= 4) {
    queryKode += `.${kabCode}`;
  }
  if (nik.length >= 6) {
    queryKode += `.${kecCode}`;
  }

  const wilayah = parseWilayah(queryKode);

  let gender: "LAKI-LAKI" | "PEREMPUAN" | null = null;
  let birth: string | null = null;

  if (nik.length >= 12) {
    const dayStr = nik.slice(6, 8);
    const monthStr = nik.slice(8, 10);
    const yearStr = nik.slice(10, 12);

    const day = Number.parseInt(dayStr, 10);
    const month = Number.parseInt(monthStr, 10);
    const year = Number.parseInt(yearStr, 10);

    const isFemale = day > 40;
    const actualDay = isFemale ? day - 40 : day;

    const nowYear = new Date().getFullYear();
    const threshold = (nowYear % 100) + 1;
    const fullYear = year < threshold ? 2000 + year : 1900 + year;

    const date = new Date(fullYear, month - 1, actualDay);
    if (date.getMonth() === month - 1 && date.getDate() === actualDay) {
      gender = isFemale ? "PEREMPUAN" : "LAKI-LAKI";
      birth = `${fullYear}-${String(month).padStart(2, "0")}-${String(actualDay).padStart(2, "0")}`;
    }
  }

  const serial = nik.length >= 16 ? nik.slice(12, 16) : null;

  return {
    provinsi: wilayah.provinsi,
    kabupaten: wilayah.kabupaten,
    kecamatan: wilayah.kecamatan,
    jenis_kelamin: gender,
    tanggal_lahir: birth,
    nomor_urut: serial,
  };
}
