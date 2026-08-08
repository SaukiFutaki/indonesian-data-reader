"use client";

import { useState } from "react";
import { Info } from "lucide-react";

const PLAT_SPEC = [
  {
    id: "kode",
    label: "Kode Wilayah",
    sample: "B",
    description: "1-2 huruf pertama yang mengidentifikasi wilayah kepolisian pendaftaran kendaraan.",
  },
  {
    id: "no",
    label: "Nomor Registrasi",
    sample: "1234",
    description: "1-4 digit angka nomor registrasi kendaraan.",
  },
  {
    id: "seri",
    label: "Kode Seri Sub-Wilayah",
    sample: "XYZ",
    description: "1-3 huruf seri belakang yang menentukan sub-wilayah kabupaten/kota & jenis kendaraan.",
  },
] as const;

export function PlatFormat() {
  const [activeSegment, setActiveSegment] = useState<string>("kode");
  const selectedSpec = PLAT_SPEC.find((s) => s.id === activeSegment) || PLAT_SPEC[0];

  return (
    <section className="mt-8 sm:mt-10 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-xs">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Info className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-950" />
        <h2 className="text-xs sm:text-sm font-bold tracking-tight text-zinc-950 uppercase">
          Anatomi Kode Plat Nomor Kendaraan
        </h2>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-zinc-200 bg-zinc-100/70 p-2.5 sm:p-3">
        {PLAT_SPEC.map((spec) => {
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
            Contoh: {selectedSpec.sample}
          </span>
        </div>
        <p className="mt-1.5 sm:mt-2 text-xs leading-relaxed text-zinc-600">
          {selectedSpec.description}
        </p>
      </div>
    </section>
  );
}
