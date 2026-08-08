"use client";

import { useState } from "react";
import { Info } from "lucide-react";

const NIK_SPEC = [
  {
    id: "prov",
    label: "Provinsi",
    digits: "Digit 1–2",
    sample: "32",
    description: "Kode unik provinsi sesuai standar Kependudukan BPS/Kemendagri.",
  },
  {
    id: "kab",
    label: "Kabupaten / Kota",
    digits: "Digit 3–4",
    sample: "04",
    description: "Kode unik kabupaten (dimulai dari 01) atau kota (dimulai dari 71).",
  },
  {
    id: "kec",
    label: "Kecamatan",
    digits: "Digit 5–6",
    sample: "21",
    description: "Kode unik kecamatan di dalam wilayah kabupaten/kota tersebut.",
  },
  {
    id: "tgl",
    label: "Tanggal Lahir",
    digits: "Digit 7–12",
    sample: "450190",
    description: "Format DDMMYY. Untuk perempuan, tanggal lahir ditambah 40 (contoh: tgl 5 menjadi 45).",
  },
  {
    id: "urut",
    label: "Nomor Urut",
    digits: "Digit 13–16",
    sample: "0001",
    description: "Nomor urut penerbitan NIK pada tanggal lahir yang sama (dimulai dari 0001).",
  },
] as const;

export function NikFormat() {
  const [activeSegment, setActiveSegment] = useState<string>("prov");
  const selectedSpec = NIK_SPEC.find((s) => s.id === activeSegment) || NIK_SPEC[0];

  return (
    <section className="mt-8 sm:mt-10 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-xs">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Info className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-950" />
        <h2 className="text-xs sm:text-sm font-bold tracking-tight text-zinc-950 uppercase">
          Struktur Segmen 16 Digit NIK
        </h2>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-zinc-200 bg-zinc-100/70 p-2.5 sm:p-3">
        {NIK_SPEC.map((spec) => {
          const isActive = activeSegment === spec.id;
          return (
            <button
              key={spec.id}
              type="button"
              onClick={() => setActiveSegment(spec.id)}
              className={`flex flex-col items-center rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-center transition-all ${
                isActive
                  ? "bg-zinc-950 text-white shadow-xs scale-[1.02]"
                  : "bg-white text-zinc-800 hover:bg-zinc-100 border border-zinc-300"
              }`}
            >
              <span className="font-mono text-sm sm:text-base font-bold tabular tracking-wider">
                {spec.sample}
              </span>
              <span className={`text-[9px] sm:text-[10px] font-semibold mt-0.5 ${isActive ? "text-zinc-300" : "text-zinc-600"}`}>
                {spec.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 sm:mt-4 rounded-xl border border-zinc-300 bg-zinc-100/60 p-3.5 sm:p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-950">{selectedSpec.label}</span>
          <span className="font-mono text-[11px] sm:text-xs font-bold text-zinc-950 bg-white px-2 py-0.5 rounded border border-zinc-300">
            {selectedSpec.digits}
          </span>
        </div>
        <p className="mt-1.5 sm:mt-2 text-xs leading-relaxed text-zinc-600">
          {selectedSpec.description}
        </p>
      </div>
    </section>
  );
}
