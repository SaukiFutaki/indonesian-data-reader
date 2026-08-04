"use client";

import { useState, useRef, useEffect } from "react";
import { useTRPC } from "@/lib/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { SegmentedInput, type Segment } from "@/components/ui";
import { NpsnResultCard } from "./npsn-result-card";

const NPSN_SEGMENTS: Segment[] = [
  { id: "npsn", label: "NPSN", maxLength: 8, type: "numeric", placeholder: "20104775" },
];

type Mode = "npsn" | "nama";

function mapRow(r: any) {
  return {
    npsn: r.npsn,
    nama: r.sekolah,
    jenjang: r.bentuk,
    status: r.status === "N" ? "Negeri" : r.status === "S" ? "Swasta" : r.status ?? "—",
    alamat: r.alamatJalan,
    kabupaten: r.kabupatenKota,
    provinsi: r.propinsi,
    kecamatan: r.kecamatan,
    lintang: r.lintang,
    bujur: r.bujur,
  };
}

export function NpsnSearch() {
  const [mode, setMode] = useState<Mode>("npsn");
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const trpc = useTRPC();

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDebounced(query), 400);
    return () => clearTimeout(timerRef.current);
  }, [query]);

  useEffect(() => {
    setQuery("");
    setDebounced("");
  }, [mode]);

  // By NPSN
  const npsnEnabled = mode === "npsn" && debounced.length === 8;
  const npsnQ = useQuery(trpc.npsn.byNpsn.queryOptions(debounced, { enabled: npsnEnabled }));

  // By name
  const namaEnabled = mode === "nama" && debounced.length >= 2;
  const namaQ = useQuery(trpc.npsn.search.queryOptions(debounced, { enabled: namaEnabled }));

  const loading =
    (mode === "npsn" && npsnQ.isLoading && npsnEnabled) ||
    (mode === "nama" && namaQ.isLoading && namaEnabled);

  const error =
    mode === "npsn"
      ? (npsnQ.error as any)?.message ?? ""
      : (namaQ.error as any)?.message ?? "";

  const results: any[] =
    mode === "npsn"
      ? npsnQ.data ? [npsnQ.data] : []
      : namaQ.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Cek Sekolah (NPSN)</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-lg">
          Cari sekolah berdasarkan NPSN atau nama sekolah.
        </p>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-1 bg-muted rounded-lg p-1 w-fit">
        <button
          onClick={() => setMode("npsn")}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            mode === "npsn"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          NPSN
        </button>
        <button
          onClick={() => setMode("nama")}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            mode === "nama"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Nama Sekolah
        </button>
      </div>

      {/* Input */}
      {mode === "npsn" ? (
        <SegmentedInput segments={NPSN_SEGMENTS} value={query} onChange={setQuery} />
      ) : (
        <input
          type="text"
          placeholder="Cari nama sekolah..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full font-mono text-sm px-3 py-2 border rounded-lg bg-background"
        />
      )}

      {/* Results */}
      <div className="min-h-[12rem]">
        {loading && <p className="text-sm text-muted-foreground animate-pulse">Mencari...</p>}

        {error && !loading && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {results.length > 0 && !error && !loading && (
          <div className="space-y-2">
            {results.map((r) => (
              <NpsnResultCard key={r.npsn} data={mapRow(r)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
