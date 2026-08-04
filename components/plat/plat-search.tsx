"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useTRPC } from "@/lib/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { PlatResultCard } from "./plat-result-card";

// Valid: "B", "BK", "B 1234", "BK 1234 XYZ", "B 1 AB"
const FULL_RE = /^[A-Z]{1,2}\s\d{1,4}\s[A-Z]{1,3}$/;
const KODE_RE = /^[A-Z]{1,2}$/;
const PARTIAL_FULL_RE = /^[A-Z]{1,2}(\s\d{0,4}(\s[A-Z]{0,3})?)?$/;

function extractKode(input: string) {
  const m = input.match(/^[A-Z]{1,2}/);
  return m ? m[0] : "";
}

export function PlatSearch() {
  const [raw, setRaw] = useState("");
  const [debounced, setDebounced] = useState("");
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const trpc = useTRPC();

  const upper = useMemo(() => raw.toUpperCase(), [raw]);

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDebounced(upper), 400);
    return () => clearTimeout(timerRef.current);
  }, [upper]);

  const kode = extractKode(debounced);
  const trimmed = debounced.trim();
  const isKode = KODE_RE.test(trimmed);
  const isFull = FULL_RE.test(trimmed);
  const isPartial = PARTIAL_FULL_RE.test(trimmed);
  const isValid = isKode || isFull;

  // Validation message timing: only show when user has typed something meaningful
  const showValidation = trimmed.length >= 3 && !isValid && !isPartial;

  const enabled = (isKode || isFull) && kode.length >= 1;
  const q = useQuery(trpc.plat.read.queryOptions(kode, { enabled }));

  const loading = q.isLoading && enabled;
  const error = (q.error as any)?.message ?? "";
  const data = q.data
    ? {
        kode: q.data.kode,
        wilayah: q.data.wilayah,
        polda: q.data.polda,
        pulau: q.data.pulau,
        nopol: isFull ? trimmed : undefined,
      }
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Plat Nomor</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-lg">
          Masukkan kode plat kendaraan lengkap. Misal:{" "}
          <code className="bg-muted px-1 rounded">B 1234 XYZ</code> atau cukup kode
          wilayah: <code className="bg-muted px-1 rounded">B</code>,{" "}
          <code className="bg-muted px-1 rounded">BK</code>.
        </p>
      </div>

      <input
        type="text"
        placeholder="B 1234 XYZ"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        className={`w-full font-mono text-lg tracking-wider px-4 py-3 border rounded-xl bg-background text-center placeholder:normal-case placeholder:tracking-normal placeholder:text-base ${
          showValidation ? "border-red-300" : ""
        }`}
      />

      {/* Validation hint */}
      {showValidation && (
        <p className="text-xs text-red-500 -mt-4">
          Format tidak valid. Gunakan: 1–2 huruf kode + 1–4 digit no. registrasi + 1–3 huruf seri (contoh: B 1234 XYZ).
        </p>
      )}

      <div className="min-h-[12rem]">
        {loading && <p className="text-sm text-muted-foreground animate-pulse">Mencari...</p>}
        {error && !loading && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        {data && !error && isValid && <PlatResultCard data={data} />}
      </div>
    </div>
  );
}
