"use client";

import { useState } from "react";
import { Check, Copy, ShieldCheck, Terminal } from "lucide-react";
import type { Segment } from "@/components/ui/segmented-input";

interface NikData {
  provinsi: string | null;
  kabupaten: string | null;
  kecamatan: string | null;
  jenis_kelamin: string;
  tanggal_lahir: string;
  nomor_urut: string;
}

interface Props {
  data: NikData;
  segments: Segment[];
  value: string;
}

const SEGMENT_RESULT_MAP: Record<string, { key: keyof NikData; label: string }> = {
  prov: { key: "provinsi", label: "Provinsi" },
  kab: { key: "kabupaten", label: "Kabupaten / Kota" },
  kec: { key: "kecamatan", label: "Kecamatan" },
  tgl: { key: "tanggal_lahir", label: "Tanggal Lahir" },
  urut: { key: "nomor_urut", label: "Nomor Urut" },
};

export function NikResultCard({ data, segments, value }: Props) {
  const [copied, setCopied] = useState(false);

  const segValues: string[] = [];
  let offset = 0;
  for (const seg of segments) {
    segValues.push(value.slice(offset, offset + seg.maxLength));
    offset += seg.maxLength;
  }

  const genderLabel =
    data.jenis_kelamin === "PEREMPUAN"
      ? "Perempuan"
      : data.jenis_kelamin === "LAKI-LAKI"
        ? "Laki-laki"
        : "—";

  const handleCopyJson = () => {
    const jsonOutput = JSON.stringify(
      {
        nik: value,
        provinsi: data.provinsi,
        kabupaten: data.kabupaten,
        kecamatan: data.kecamatan,
        jenisKelamin: genderLabel,
        tanggalLahir: data.tanggal_lahir,
        nomorUrut: data.nomor_urut,
      },
      null,
      2
    );
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isComplete = value.length >= 16;

  return (
    <div className="animate-fade-in overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xs">
      {/* Inspector Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-100/70 px-3.5 py-2.5 sm:px-5 sm:py-3.5">
        <div className="flex items-center gap-2">
          <div className="grid h-6 w-6 sm:h-8 sm:w-8 place-items-center rounded-lg bg-zinc-950 text-white shadow-xs">
            <Terminal className="h-3 w-3 sm:h-4 sm:w-4" />
          </div>
          <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-950">
            NIK Inspector
          </span>
          {isComplete && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] sm:text-xs font-bold text-zinc-950 border border-zinc-300">
              <ShieldCheck className="h-3 w-3 text-zinc-950" />
              <span className="hidden sm:inline">16 Digit Validated</span>
              <span className="sm:hidden">16 Digit</span>
            </span>
          )}
        </div>

        {/* Compact Mobile Copy Button */}
        <button
          type="button"
          onClick={handleCopyJson}
          className="inline-flex items-center gap-1 sm:gap-1.5 rounded-lg border border-zinc-300 bg-white px-2 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-bold text-zinc-950 shadow-xs transition-colors hover:bg-zinc-100 active:scale-95 shrink-0"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-zinc-950" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 text-zinc-950" />
              <span>Copy JSON</span>
            </>
          )}
        </button>
      </div>

      {/* Grid Inspection View */}
      <div className="p-3.5 sm:p-5">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {segments.map((seg, i) => {
            const mapping = SEGMENT_RESULT_MAP[seg.id];
            if (!mapping) return null;

            const rawVal = segValues[i] || "";
            const parsedVal = data[mapping.key];
            const displayVal = parsedVal ?? (rawVal ? "..." : "—");

            return (
              <div
                key={seg.id}
                className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-zinc-50/60 p-3 sm:p-4 transition-colors hover:bg-zinc-100/50"
              >
                <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold text-zinc-500">
                  <span>{mapping.label}</span>
                  <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400">
                    [{seg.maxLength}d]
                  </span>
                </div>
                <div className="mt-1.5 flex items-baseline justify-between gap-2">
                  <span className="text-xs sm:text-base font-bold text-zinc-950 truncate">
                    {displayVal}
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs font-bold tabular text-zinc-950 bg-white px-1.5 py-0.5 rounded border border-zinc-300">
                    {rawVal || "—"}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Gender Inspector Tile */}
          <div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-zinc-50/60 p-3 sm:p-4 transition-colors hover:bg-zinc-100/50">
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold text-zinc-500">
              <span>Jenis Kelamin</span>
              <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400">Digit 7-12</span>
            </div>
            <div className="mt-1.5 flex items-baseline justify-between gap-2">
              <span className="text-xs sm:text-base font-bold text-zinc-950">
                {genderLabel}
              </span>
              <span className="font-mono text-[11px] sm:text-xs font-bold text-zinc-950 bg-white px-1.5 py-0.5 rounded border border-zinc-300">
                {data.jenis_kelamin === "PEREMPUAN"
                  ? "Tgl +40"
                  : data.jenis_kelamin === "LAKI-LAKI"
                    ? "Tgl Normal"
                    : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Raw NIK String Bar */}
        <div className="mt-3 sm:mt-4 flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-100/80 px-3 py-2 sm:px-4 sm:py-2.5 text-xs text-zinc-600 font-mono">
          <span className="font-bold text-zinc-500 text-[11px] sm:text-xs">Raw Input:</span>
          <span className="text-xs sm:text-base font-bold tracking-widest text-zinc-950 tabular">
            {value || "—"}
          </span>
        </div>
      </div>
    </div>
  );
}
