import { Card, CardContent } from "@/components/ui/card";

const KODEPOS_SEGMENTS = [
  {
    label: "Wilayah",
    digits: "1",
    example: "4",
    desc: "Wilayah pos (region). Angka 1–9 mewakili wilayah utama Indonesia.",
  },
  {
    label: "Kab/Kota",
    digits: "2–3",
    example: "01",
    desc: "Kode kabupaten atau kota dalam wilayah pos.",
  },
  {
    label: "Kecamatan",
    digits: "4",
    example: "1",
    desc: "Kode kecamatan dalam kabupaten/kota.",
  },
  {
    label: "Kelurahan",
    digits: "5",
    example: "5",
    desc: "Kode kelurahan atau desa.",
  },
] as const;

export function KodeposFormat() {
  return (
    <Card className="mt-4">
      <CardContent className="pt-4 pb-3 space-y-3">
        <div>
          <h3 className="text-sm font-semibold">Struktur Kode Pos — 5 Digit</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Kode pos Indonesia terdiri dari 5 digit, setiap bagian mewakili level wilayah.
          </p>
        </div>

        <div className="flex flex-wrap items-start gap-1">
          {KODEPOS_SEGMENTS.map((seg, i) => (
            <div key={seg.label} className="flex items-start gap-1">
              {i > 0 && (
                <span className="mt-2.5 text-muted-foreground/30 text-sm font-light select-none">
                  ·
                </span>
              )}
              <div
                className="flex flex-col items-center gap-1 text-center w-14"
                title={seg.desc}
              >
                <span className="font-mono text-sm font-medium bg-muted py-1.5 rounded-lg border border-border/60 tabular-nums w-full text-center">
                  {seg.example}
                </span>
                <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-wider block truncate w-full text-center">
                  {seg.label}
                </span>
                <span className="text-[8px] text-muted-foreground/50 block w-full text-center">
                  digit {seg.digits}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-muted-foreground/60 pt-1 border-t">
          Cari berdasarkan kode pos 5 digit. Hasil menampilkan koordinat dan peta lokasi.
        </p>
      </CardContent>
    </Card>
  );
}
