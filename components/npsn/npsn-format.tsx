"use client";

import { LayerCard } from "@cloudflare/kumo";

export function NpsnFormat() {
  return (
    <LayerCard className="mt-4">
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-semibold">NPSN — Nomor Pokok Sekolah Nasional</h3>
          <p className="text-xs text-kumo-subtle mt-1">
            Kode pengenal 8 digit unik yang diberikan Kemendikbud kepada setiap satuan pendidikan aktif di Indonesia.
          </p>
        </div>

        {/* Visual example */}
        <div className="flex justify-center">
          <span className="font-mono text-lg font-semibold bg-kumo-overlay px-6 py-2.5 rounded-lg border border-kumo-border/60 tracking-[0.25em] tabular-nums">
            20104775
          </span>
        </div>

        <div className="flex justify-center gap-6 text-[10px] text-kumo-subtle">
          <span>8 digit numerik</span>
          <span>·</span>
          <span>unik per sekolah</span>
        </div>

        <p className="text-[10px] text-kumo-subtle/60 pt-1 border-t border-kumo-border/30">
          213.000+ sekolah: PAUD, SD/MI, SMP/MTs, SMA/SMK/MA di seluruh Indonesia.
        </p>
      </div>
    </LayerCard>
  );
}
