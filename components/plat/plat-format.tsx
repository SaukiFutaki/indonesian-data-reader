"use client";

import { Tooltip, TooltipProvider, LayerCard } from "@cloudflare/kumo";

const PLAT_SEGMENTS = [
  {
    label: "Wilayah",
    example: "B",
    desc: "1–2 huruf kode wilayah pendaftaran kendaraan, menunjukkan Polda terkait.",
    widthClass: "w-16",
  },
  {
    label: "Registrasi",
    example: "1234",
    desc: "1–4 digit angka nomor registrasi kendaraan.",
    widthClass: "w-20",
  },
  {
    label: "Seri",
    example: "XYZ",
    desc: "1–3 huruf kode seri identifikasi kendaraan.",
    widthClass: "w-20",
  },
] as const;

export function PlatFormat() {
  return (
    <LayerCard className="mt-4">
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-semibold">Struktur Plat Nomor</h3>
          <p className="text-xs text-kumo-subtle mt-1">
            Plat nomor kendaraan Indonesia terdiri dari 3 bagian: wilayah, registrasi, dan seri.
          </p>
        </div>

        {/* Visual plate mockup */}
        <div className="mx-auto max-w-xs rounded-lg border border-kumo-border bg-kumo-overlay/50 p-3">
          <TooltipProvider>
            <div className="flex items-center justify-center gap-3">
              {PLAT_SEGMENTS.map((seg, i) => (
                <div key={seg.label} className="flex items-center gap-3">
                  {i > 0 && (
                    <span className="text-kumo-subtle/30 text-lg font-light select-none">—</span>
                  )}
                  <Tooltip content={seg.desc}>
                    <div className={`flex flex-col items-center gap-1 cursor-default text-center ${seg.widthClass}`}>
                      <span className="font-mono text-base font-semibold bg-kumo-overlay py-1.5 rounded-lg border border-kumo-border/60 tracking-widest w-full text-center">
                        {seg.example}
                      </span>
                      <span className="text-[9px] font-medium text-kumo-subtle uppercase tracking-wider block truncate w-full text-center">
                        {seg.label}
                      </span>
                    </div>
                  </Tooltip>
                </div>
              ))}
            </div>
          </TooltipProvider>
        </div>

        <p className="text-[10px] text-kumo-subtle/60 pt-1 border-t border-kumo-border/30">
          61 kode wilayah mencakup seluruh Indonesia. Masukkan 1–2 huruf untuk melihat wilayah dan Polda terkait.
        </p>
      </div>
    </LayerCard>
  );
}
