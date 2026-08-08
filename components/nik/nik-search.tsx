"use client";

import { useState, useRef, useEffect } from "react";
import { useTRPC } from "@/lib/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { FileText } from "lucide-react";
import { SegmentedInput, type Segment } from "@/components/ui";
import { NikResultCard } from "@/components/nik";

const SEGMENTS: Segment[] = [
  { id: "prov", label: "Provinsi", maxLength: 2, type: "numeric", placeholder: "32" },
  { id: "kab", label: "Kab/Kota", maxLength: 2, type: "numeric", placeholder: "04" },
  { id: "kec", label: "Kecamatan", maxLength: 2, type: "numeric", placeholder: "21" },
  { id: "tgl", label: "Tgl Lahir", maxLength: 6, type: "numeric", placeholder: "450190" },
  { id: "urut", label: "No. Urut", maxLength: 4, type: "numeric", placeholder: "0001" },
];

const TOTAL_LENGTH = 16;

export function NikSearch() {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const trpc = useTRPC();

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDebounced(query), 400);
    return () => clearTimeout(timerRef.current);
  }, [query]);

  const enabled = debounced.length >= 2;
  const q = useQuery(trpc.nik.read.queryOptions(debounced, { enabled }));

  const loading = q.isLoading && enabled;
  const error = (q.error as any)?.message ?? "";
  const data = q.data
    ? {
        provinsi: q.data.provinsi,
        kabupaten: q.data.kabupaten,
        kecamatan: q.data.kecamatan,
        jenis_kelamin: q.data.jenis_kelamin,
        tanggal_lahir: q.data.tanggal_lahir,
        nomor_urut: q.data.nomor_urut,
      }
    : null;

  const isFull = query.length >= TOTAL_LENGTH;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Input Box */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-3.5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
          <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-700">
            Ketik NIK 16 Digit
          </label>
          <span
            className={`font-mono text-[11px] sm:text-xs font-bold tabular ${
              isFull ? "text-zinc-950 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-300" : "text-zinc-500"
            }`}
          >
            {query.length}/{TOTAL_LENGTH}
          </span>
        </div>

        <SegmentedInput segments={SEGMENTS} value={query} onChange={setQuery} />

        <p className="mt-3 text-[11px] sm:text-xs text-zinc-500">
          Tempel atau ketik NIK. Hasil provinsi, kota, dan tanggal lahir dibaca secara langsung.
        </p>
      </div>

      {/* Result Container */}
      <div className="min-h-[12rem]">
        {loading && (
          <div className="animate-pulse rounded-2xl border border-zinc-200 bg-white p-4 space-y-3 shadow-xs">
            <div className="h-4 w-32 rounded bg-zinc-200" />
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="h-14 rounded-xl bg-zinc-100" />
              <div className="h-14 rounded-xl bg-zinc-100" />
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 sm:p-4">
            <p className="text-xs sm:text-sm font-semibold text-red-700">{error}</p>
          </div>
        )}

        {query.length >= 2 && data && !error && !loading && (
          <NikResultCard data={data as any} segments={SEGMENTS} value={query} />
        )}

        {query.length < 2 && !loading && (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6 sm:p-8 text-center shadow-xs">
            <div className="mx-auto flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-zinc-950 text-white mb-2 sm:mb-3 shadow-xs">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <p className="text-xs sm:text-sm font-bold text-zinc-950">Menunggu Input NIK</p>
            <p className="text-[11px] sm:text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
              Ketik minimal 2 digit NIK di atas untuk mulai membaca detail data wilayah.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
