"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTRPC } from "@/lib/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { SegmentedInput, type Segment } from "@/components/ui";
import { KodeposResultCard } from "@/components/kodepos";

const LeafletMap = dynamic(
  () => import("@/components/kodepos/leaflet-map").then((m) => m.LeafletMap),
  { ssr: false }
);

const SEGMENTS: Segment[] = [
  { id: "wil", label: "Wilayah", maxLength: 1, type: "numeric", placeholder: "4" },
  { id: "kab", label: "Kab/Kota", maxLength: 2, type: "numeric", placeholder: "01" },
  { id: "kec", label: "Kecamatan", maxLength: 1, type: "numeric", placeholder: "1" },
  { id: "kel", label: "Kelurahan", maxLength: 1, type: "numeric", placeholder: "5" },
];

export function KodeposSearch() {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const trpc = useTRPC();

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebounced(query);
      setExpandedIndex(null);
    }, 400);
    return () => clearTimeout(timerRef.current);
  }, [query]);

  const enabled = debounced.length === 5;
  const q = useQuery(trpc.kodepos.byCode.queryOptions(Number.parseInt(debounced), { enabled }));

  const loading = q.isLoading && enabled;
  const error = (q.error as any)?.message ?? "";
  const results = q.data?.map((r) => ({
    kelurahan: r.village,
    kecamatan: r.district,
    kabupaten: r.regency,
    provinsi: r.province,
    kode_pos: r.code,
    latitude: r.latitude,
    longitude: r.longitude,
  })) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Kode Pos</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-lg">
          Cari kelurahan, kecamatan, kabupaten, dan lokasi koordinat dari 5 digit kode pos.
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
        {results.length > 0 && !error && (
          <div className="space-y-2">
            {results.map((r, i) => (
              <KodeposResultCard
                key={i}
                data={r}
                expanded={expandedIndex === i}
                onToggle={() => setExpandedIndex(expandedIndex === i ? null : i)}
                MapComponent={LeafletMap}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
