"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

const SEGMENTS = [
  { label: "Wilayah", example: "B", desc: "1–2 huruf kode wilayah pendaftaran kendaraan." },
  { label: "Registrasi", example: "1234", desc: "1–4 digit angka nomor registrasi." },
  { label: "Seri", example: "XYZ", desc: "1–3 huruf kode seri identifikasi kendaraan." },
] as const;

export function PlatFormat() {
  return (
    <Card className="mt-4">
      <CardContent className="pt-4 pb-3 space-y-3">
        <div>
          <h3 className="text-sm font-semibold">Struktur Plat Nomor</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Plat nomor kendaraan Indonesia terdiri dari 3 bagian: wilayah, registrasi, dan seri.
          </p>
        </div>

        <div className="mx-auto max-w-xs rounded-lg border bg-muted/50 p-3">
          <div className="flex items-center justify-center gap-3">
            {SEGMENTS.map((seg, i) => (
              <div key={seg.label} className="flex items-center gap-3">
                {i > 0 && (
                  <span className="text-muted-foreground/30 text-lg font-light select-none">—</span>
                )}
                <div
                  className="flex flex-col items-center gap-1 text-center"
                  title={seg.desc}
                >
                  <span className="font-mono text-base font-semibold bg-muted py-1.5 px-2.5 rounded-lg border tracking-widest">
                    {seg.example}
                  </span>
                  <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-wider">
                    {seg.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[10px] text-muted-foreground/60 pt-1 border-t">
          61 kode wilayah mencakup seluruh Indonesia. Masukkan kode plat lengkap, cukup 1–2 huruf pertama sebagai kode wilayah.
        </p>
      </CardContent>
    </Card>
  );
}
