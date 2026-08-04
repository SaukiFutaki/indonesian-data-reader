"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { useTRPC } from "@/lib/trpc/client";
import { useQuery } from "@tanstack/react-query";

import { ResultCard, SegmentedInput, type Segment } from "@/components/ui";
import { NikResultCard } from "@/components/nik";
import { KodeposResultCard } from "@/components/kodepos";

const LeafletMap = dynamic(
  () => import("@/components/kodepos/leaflet-map").then((m) => m.LeafletMap),
  { ssr: false }
);

export type Feature = "nik" | "kodepos" | "plat" | "npsn";

interface Descriptor {
  title: string;
  hint: string;
}

const descriptors: Record<Feature, Descriptor> = {
  nik: {
    title: "NIK Reader",
    hint: "Masukkan 16 digit Nomor Induk Kependudukan untuk membaca kode wilayah, jenis kelamin, dan tanggal lahir.",
  },
  kodepos: {
    title: "Kode Pos",
    hint: "Cari kelurahan, kecamatan, kabupaten, dan lokasi koordinat dari 5 digit kode pos.",
  },
  plat: {
    title: "Plat Nomor",
    hint: "Masukkan 1–2 huruf kode plat kendaraan untuk melihat wilayah dan Polda terkait.",
  },
  npsn: {
    title: "Cek Sekolah (NPSN)",
    hint: "Masukkan 8 digit Nomor Pokok Sekolah Nasional untuk melihat data sekolah.",
  },
};

const segmentConfigs: Record<Feature, Segment[]> = {
  nik: [
    { id: "prov", label: "Provinsi", maxLength: 2, type: "numeric", placeholder: "32" },
    { id: "kab", label: "Kab/Kota", maxLength: 2, type: "numeric", placeholder: "04" },
    { id: "kec", label: "Kecamatan", maxLength: 2, type: "numeric", placeholder: "21" },
    { id: "tgl", label: "Tgl Lahir", maxLength: 6, type: "numeric", placeholder: "450190" },
    { id: "urut", label: "No. Urut", maxLength: 4, type: "numeric", placeholder: "0001" },
  ],
  kodepos: [
    { id: "wil", label: "Wilayah", maxLength: 1, type: "numeric", placeholder: "4" },
    { id: "kab", label: "Kab/Kota", maxLength: 2, type: "numeric", placeholder: "01" },
    { id: "kec", label: "Kecamatan", maxLength: 1, type: "numeric", placeholder: "1" },
    { id: "kel", label: "Kelurahan", maxLength: 1, type: "numeric", placeholder: "5" },
  ],
  plat: [
    { id: "wil", label: "Wilayah", maxLength: 2, type: "alpha", placeholder: "B" },
  ],
  npsn: [
    { id: "npsn", label: "NPSN", maxLength: 8, type: "numeric", placeholder: "20104775" },
  ],
};

export function FeatureSearch({ feature }: { feature: Feature }) {
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

  const segments = segmentConfigs[feature];
  const d = descriptors[feature];

  const nikEnabled = feature === "nik" && debounced.length >= 2;
  const kodeposEnabled = feature === "kodepos" && debounced.length === 5;
  const npsnEnabled = feature === "npsn" && debounced.length === 8;
  const platEnabled = feature === "plat" && debounced.length >= 1;

  const nikQuery = useQuery(
    trpc.nik.read.queryOptions(debounced, { enabled: nikEnabled })
  );
  const kodeposQuery = useQuery(
    trpc.kodepos.byCode.queryOptions(
      Number.parseInt(debounced),
      { enabled: kodeposEnabled }
    )
  );
  const npsnQuery = useQuery(
    trpc.npsn.byNpsn.queryOptions(debounced, { enabled: npsnEnabled })
  );
  const platQuery = useQuery(
    trpc.plat.read.queryOptions(debounced, { enabled: platEnabled })
  );

  let result: Record<string, unknown> | null = null;
  let kodeposResults: Array<Record<string, unknown>> = [];
  let error = "";
  let loading = false;

  if (feature === "nik") {
    loading = nikQuery.isLoading && nikEnabled;
    error = (nikQuery.error as any)?.message ?? "";
    if (nikQuery.data) {
      result = {
        provinsi: nikQuery.data.provinsi,
        kabupaten: nikQuery.data.kabupaten,
        kecamatan: nikQuery.data.kecamatan,
        jenis_kelamin: nikQuery.data.jenis_kelamin,
        tanggal_lahir: nikQuery.data.tanggal_lahir,
        nomor_urut: nikQuery.data.nomor_urut,
      };
    }
  } else if (feature === "kodepos") {
    loading = kodeposQuery.isLoading && kodeposEnabled;
    error = (kodeposQuery.error as any)?.message ?? "";
    if (kodeposQuery.data && kodeposQuery.data.length > 0) {
      kodeposResults = kodeposQuery.data.map((r) => ({
        kelurahan: r.village,
        kecamatan: r.district,
        kabupaten: r.regency,
        provinsi: r.province,
        kode_pos: r.code,
        latitude: r.latitude,
        longitude: r.longitude,
      }));
    } else if (kodeposQuery.data && kodeposQuery.data.length === 0) {
      error = "Kode pos tidak ditemukan";
    }
  } else if (feature === "npsn") {
    loading = npsnQuery.isLoading && npsnEnabled;
    error = (npsnQuery.error as any)?.message ?? "";
    if (npsnQuery.data) {
      const r = npsnQuery.data;
      result = {
        npsn: r.npsn,
        nama: r.sekolah,
        jenjang: r.bentuk,
        status: r.status === "N" ? "Negeri" : r.status === "S" ? "Swasta" : r.status,
        alamat: r.alamatJalan,
        kabupaten: r.kabupatenKota,
        provinsi: r.propinsi,
        kecamatan: r.kecamatan,
        lintang: r.lintang,
        bujur: r.bujur,
      };
    }
  } else if (feature === "plat") {
    loading = platQuery.isLoading && platEnabled;
    error = (platQuery.error as any)?.message ?? "";
    if (platQuery.data) {
      result = {
        kode: platQuery.data.kode,
        wilayah: platQuery.data.wilayah,
        polda: platQuery.data.polda,
        pulau: platQuery.data.pulau,
      };
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">{d.title}</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-lg">{d.hint}</p>
      </div>

      <SegmentedInput segments={segments} value={query} onChange={setQuery} />

      <div className="min-h-[12rem]">
        {loading && (
          <p className="text-sm text-muted-foreground animate-pulse">Mencari...</p>
        )}

        {error && !loading && (
          <div className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/20 p-4">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {feature === "nik" && query.length >= 2 && result && !error && (
          <NikResultCard data={result as any} segments={segments} value={query} />
        )}

        {feature !== "nik" && feature !== "kodepos" && result && !error && (
          <ResultCard data={result} />
        )}

        {feature === "kodepos" && kodeposResults.length > 0 && !error && (
          <div className="space-y-2">
            {kodeposResults.map((r, i) => (
              <KodeposResultCard
                key={i}
                data={r as any}
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
