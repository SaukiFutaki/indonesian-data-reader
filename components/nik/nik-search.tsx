"use client";

import { useState, useRef, useEffect } from "react";
import { useTRPC } from "@/lib/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { SegmentedInput, type Segment } from "@/components/ui";
import { NikResultCard } from "@/components/nik";

const SEGMENTS: Segment[] = [
  { id: "prov", label: "Provinsi", maxLength: 2, type: "numeric", placeholder: "32" },
  { id: "kab", label: "Kab/Kota", maxLength: 2, type: "numeric", placeholder: "04" },
  { id: "kec", label: "Kecamatan", maxLength: 2, type: "numeric", placeholder: "21" },
  { id: "tgl", label: "Tgl Lahir", maxLength: 6, type: "numeric", placeholder: "450190" },
  { id: "urut", label: "No. Urut", maxLength: 4, type: "numeric", placeholder: "0001" },
];

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">NIK Reader</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-lg">
          Masukkan 16 digit Nomor Induk Kependudukan untuk membaca kode wilayah, jenis kelamin, dan tanggal lahir.
        </p>
      </div>

      <SegmentedInput segments={SEGMENTS} value={query} onChange={setQuery} />

      <div className="min-h-[12rem]">
        {loading && <p className="text-sm text-muted-foreground animate-pulse">Mencari...</p>}
        {error && !loading && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        {query.length >= 2 && data && !error && (
          <NikResultCard data={data as any} segments={SEGMENTS} value={query} />
        )}
      </div>
    </div>
  );
}
