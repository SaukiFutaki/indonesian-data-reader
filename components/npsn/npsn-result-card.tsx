"use client";

import { useState } from "react";
import { GraduationCap, Copy, Check } from "lucide-react";

interface SekolahData {
  npsn: string;
  nama: string;
  jenjang: string | null;
  status: string;
  alamat: string | null;
  kabupaten: string | null;
  provinsi: string | null;
  kecamatan: string | null;
  lintang?: number | null;
  bujur?: number | null;
}

export function NpsnResultCard({ data }: { data: SekolahData }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `NPSN: ${data.npsn}\nNama Sekolah: ${data.nama}\nJenjang: ${data.jenjang}\nStatus: ${data.status}\nAlamat: ${data.alamat ?? "-"}\nWilayah: ${data.kecamatan}, ${data.kabupaten}, ${data.provinsi}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xs">
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-100/70 px-3.5 py-2.5 sm:px-5 sm:py-3.5">
        <div className="flex items-center gap-2 min-w-0">
          <div className="grid h-6 w-6 sm:h-8 sm:w-8 shrink-0 place-items-center rounded-lg bg-zinc-950 text-white shadow-xs">
            <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-zinc-950 truncate">
            Detail Sekolah
          </span>
          <span className="font-mono text-[11px] sm:text-xs font-bold text-zinc-950 bg-white px-2 py-0.5 rounded-md border border-zinc-300 shadow-xs tabular shrink-0">
            NPSN: {data.npsn}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 border border-zinc-300 bg-white px-2 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-bold text-zinc-950 shadow-xs transition-colors hover:bg-zinc-100 active:scale-95 rounded-lg shrink-0"
        >
          {copied ? <Check className="h-3 w-3 text-zinc-950" /> : <Copy className="h-3 w-3 text-zinc-950" />}
          <span>{copied ? "Tersalin" : "Salin Data"}</span>
        </button>
      </div>

      <div className="p-3.5 sm:p-5 space-y-3 sm:space-y-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-zinc-950">{data.nama}</h3>
          <p className="text-[11px] sm:text-xs text-zinc-600 mt-0.5">
            {data.alamat ? `${data.alamat}, ` : ""}{data.kecamatan}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-3">
            <span className="text-[11px] font-semibold text-zinc-500 block mb-0.5">Jenjang</span>
            <span className="font-bold text-xs sm:text-sm text-zinc-950">{data.jenjang ?? "—"}</span>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-3">
            <span className="text-[11px] font-semibold text-zinc-500 block mb-0.5">Status</span>
            <span className="font-bold text-xs sm:text-sm text-zinc-950">{data.status}</span>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-3">
            <span className="text-[11px] font-semibold text-zinc-500 block mb-0.5">Kabupaten / Kota</span>
            <span className="font-bold text-xs sm:text-sm text-zinc-950">{data.kabupaten ?? "—"}</span>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-3">
            <span className="text-[11px] font-semibold text-zinc-500 block mb-0.5">Provinsi</span>
            <span className="font-bold text-xs sm:text-sm text-zinc-950">{data.provinsi ?? "—"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
