"use client";

import { useState } from "react";
import { MapPin, ChevronDown, ChevronUp, Copy, Check, Navigation } from "lucide-react";

interface KodeposResult {
  kelurahan: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  kode_pos: number;
  latitude: number | null;
  longitude: number | null;
}

export function KodeposResultCard({
  data,
  expanded,
  onToggle,
  MapComponent,
}: {
  data: KodeposResult;
  expanded: boolean;
  onToggle: () => void;
  MapComponent: React.ComponentType<{ lat: number; lng: number; name: string }>;
}) {
  const [copied, setCopied] = useState(false);
  const hasCoords = typeof data.latitude === "number" && typeof data.longitude === "number";

  const handleCopyText = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `${data.kelurahan}, ${data.kecamatan}, ${data.kabupaten}, ${data.provinsi} ${data.kode_pos}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xs">
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-100/70 px-3.5 py-2.5 sm:px-5 sm:py-3.5">
        <div className="flex items-center gap-2 min-w-0">
          <div className="grid h-6 w-6 sm:h-8 sm:w-8 shrink-0 place-items-center rounded-lg bg-zinc-950 text-white shadow-xs">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-zinc-950 truncate">
            {data.kelurahan}
          </span>
          <span className="font-mono text-[11px] sm:text-xs font-bold tabular text-zinc-950 bg-white px-2 py-0.5 rounded-md border border-zinc-300 shadow-xs shrink-0">
            {data.kode_pos}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleCopyText}
            className="inline-flex items-center gap-1 border border-zinc-300 bg-white px-2 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-bold text-zinc-950 shadow-xs transition-colors hover:bg-zinc-100 active:scale-95 rounded-lg"
            title="Salin Alamat"
          >
            {copied ? (
              <Check className="h-3 w-3 text-zinc-950" />
            ) : (
              <Copy className="h-3 w-3 text-zinc-950" />
            )}
            <span>{copied ? "Tersalin" : "Salin Alamat"}</span>
          </button>

          {hasCoords && (
            <button
              type="button"
              onClick={onToggle}
              className="inline-flex items-center justify-center border border-zinc-300 bg-white p-1 sm:px-2 sm:py-1.5 text-[11px] sm:text-xs font-bold text-zinc-950 hover:bg-zinc-100 rounded-lg"
            >
              {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          )}
        </div>
      </div>

      <div className="p-3.5 sm:p-5">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-3">
            <span className="text-[11px] font-semibold text-zinc-500 block mb-0.5">Kecamatan</span>
            <span className="font-bold text-xs sm:text-sm text-zinc-950">{data.kecamatan}</span>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-3">
            <span className="text-[11px] font-semibold text-zinc-500 block mb-0.5">Kabupaten / Kota</span>
            <span className="font-bold text-xs sm:text-sm text-zinc-950">{data.kabupaten}</span>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-3">
            <span className="text-[11px] font-semibold text-zinc-500 block mb-0.5">Provinsi</span>
            <span className="font-bold text-xs sm:text-sm text-zinc-950">{data.provinsi}</span>
          </div>
        </div>

        {hasCoords && (
          <div className="mt-2.5 flex items-center justify-between rounded-xl border border-zinc-300 bg-zinc-100/60 px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-mono text-zinc-700">
            <span className="flex items-center gap-1 font-bold text-zinc-950">
              <Navigation className="h-3 w-3 text-zinc-950" />
              Koordinat:
            </span>
            <span className="font-bold text-zinc-950 tabular">
              {data.latitude!.toFixed(6)}, {data.longitude!.toFixed(6)}
            </span>
          </div>
        )}

        {expanded && hasCoords && (
          <div className="mt-3 h-48 sm:h-56 w-full rounded-xl overflow-hidden border border-zinc-300 shadow-xs">
            <MapComponent lat={data.latitude!} lng={data.longitude!} name={data.kelurahan} />
          </div>
        )}
      </div>
    </div>
  );
}
