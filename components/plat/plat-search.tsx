"use client";

import { useState, useRef, useEffect } from "react";
import { useTRPC } from "@/lib/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { PlatResultCard } from "./plat-result-card";

const VALID = /^[A-Z]{1,2}$|^[A-Z]{1,2} \d{1,4}$|^[A-Z]{1,2} \d{1,4} [A-Z]{1,3}$/;

export function PlatSearch() {
  const [raw, setRaw] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const trpc = useTRPC();

  const [debounced, setDebounced] = useState("");
  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDebounced(raw), 400);
    return () => clearTimeout(timerRef.current);
  }, [raw]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const ch = e.key;
    if (ch.length !== 1) return;

    const parts = raw.split(" ");
    const kode = parts[0] || "";
    const angka = parts[1] || "";
    const seri = parts[2] || "";
    const spaces = parts.length - 1;
    const active = spaces === 0 ? "kode" : spaces === 1 ? "angka" : "seri";

    if (ch === " ") {
      // Space allowed: after kode ≥1 char, or after angka ≥1 char. Max 2 spaces.
      if (spaces >= 2) { e.preventDefault(); return; }
      if (active === "kode" && kode.length === 0) { e.preventDefault(); return; }
      if (active === "angka" && angka.length === 0) { e.preventDefault(); return; }
      return;
    }

    const isLetter = /^[A-Za-z]$/.test(ch);
    const isDigit = /^[0-9]$/.test(ch);
    if (!isLetter && !isDigit) { e.preventDefault(); return; }

    // Auto-space when kode=2 + digit
    if (active === "kode" && kode.length === 2 && isDigit) {
      e.preventDefault();
      setRaw(raw + " " + ch.toUpperCase());
      return;
    }

    // Auto-space when angka=4 + letter
    if (active === "angka" && angka.length === 4 && isLetter) {
      e.preventDefault();
      setRaw(raw + " " + ch.toUpperCase());
      return;
    }

    // Segment length limits
    if (active === "kode" && kode.length >= 2) { e.preventDefault(); return; }
    if (active === "angka" && angka.length >= 4) { e.preventDefault(); return; }
    if (active === "seri" && seri.length >= 3) { e.preventDefault(); return; }

    // Type guard per segment
    if (active === "kode" && !isLetter) { e.preventDefault(); return; }
    if (active === "angka" && !isDigit) { e.preventDefault(); return; }
    if (active === "seri" && !isLetter) { e.preventDefault(); return; }

    // Allow (will be uppercased by onChange)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRaw(e.target.value.toUpperCase());
  }

  const valid = VALID.test(debounced);
  const showErr = debounced.length >= 3 && !valid;
  const kode = (debounced.match(/^[A-Z]{1,2}/) || [""])[0];
  const enabled = kode.length >= 1 && valid;

  const q = useQuery(trpc.plat.read.queryOptions(kode, { enabled }));
  const loading = q.isLoading && enabled;
  const apiError = (q.error as any)?.message ?? "";
  const data = q.data
    ? { kode: q.data.kode, wilayah: q.data.wilayah, polda: q.data.polda, pulau: q.data.pulau, nopol: debounced.includes(" ") ? debounced : undefined }
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Plat Nomor</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-lg">
          Masukkan kode plat kendaraan. Contoh:{" "}
          <code className="bg-muted px-1 rounded">B 1234 XYZ</code>,{" "}
          <code className="bg-muted px-1 rounded">BK</code>.
        </p>
      </div>
      <input
        type="text"
        placeholder="B 1234 XYZ"
        value={raw}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        className={`w-full font-mono text-lg tracking-wider px-4 py-3 border rounded-xl bg-background text-center placeholder:normal-case placeholder:tracking-normal placeholder:text-base ${showErr ? "border-red-300" : ""}`}
      />
      {showErr && <p className="text-xs text-red-500 -mt-4">Format: 1–2 huruf kode + 1–4 digit + 1–3 huruf seri</p>}
      <div className="min-h-[12rem]">
        {loading && <p className="text-sm text-muted-foreground animate-pulse">Mencari...</p>}
        {apiError && <div className="rounded-xl border border-red-200 bg-red-50 p-4"><p className="text-sm text-red-600">{apiError}</p></div>}
        {data && valid && !loading && !apiError && <PlatResultCard data={data} />}
      </div>
    </div>
  );
}
