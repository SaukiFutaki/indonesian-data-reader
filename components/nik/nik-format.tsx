import { Card, CardContent } from "@/components/ui/card";

const NIK_SEGMENTS = [
  {
    label: "Provinsi",
    digits: "1–2",
    example: "32",
    desc: "Kode provinsi tempat NIK diterbitkan (BPS)",
  },
  {
    label: "Kab/Kota",
    digits: "3–4",
    example: "04",
    desc: "Kode kabupaten atau kota",
  },
  {
    label: "Kecamatan",
    digits: "5–6",
    example: "21",
    desc: "Kode kecamatan",
  },
  {
    label: "Tgl Lahir",
    digits: "7–12",
    example: "450190",
    desc: "DDMMYY — Untuk perempuan, tanggal ditambah 40 (misal 5 Jan → 45)",
  },
  {
    label: "No. Urut",
    digits: "13–16",
    example: "0001",
    desc: "Nomor registrasi unik per kecamatan",
  },
] as const;

export function NikFormat() {
  return (
    <Card className="mt-4">
      <CardContent className="pt-4 pb-3 space-y-3">
        <div>
          <h3 className="text-sm font-semibold">Struktur NIK — 16 Digit</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Nomor Induk Kependudukan terdiri dari 16 digit, masing-masing punya arti.
          </p>
        </div>

        <div className="flex flex-wrap items-start gap-1">
          {NIK_SEGMENTS.map((seg, i) => (
            <div key={seg.label} className="flex items-start gap-1">
              {i > 0 && (
                <span className="mt-2.5 text-muted-foreground/30 text-sm font-light select-none">
                  ·
                </span>
              )}
              <div
                className="flex flex-col items-center gap-1 text-center"
                title={seg.desc}
              >
                <span className="font-mono text-sm font-medium bg-muted py-1.5 px-2.5 rounded-lg border border-border/60 tabular-nums text-center">
                  {seg.example}
                </span>
                <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-wider block truncate text-center">
                  {seg.label}
                </span>
                <span className="text-[8px] text-muted-foreground/50 block text-center">
                  digit {seg.digits}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-muted-foreground/60 pt-1 border-t">
          NIK tidak memuat nama, alamat, atau data pribadi. Pencocokan hanya lewat Dukcapil.
        </p>
      </CardContent>
    </Card>
  );
}
