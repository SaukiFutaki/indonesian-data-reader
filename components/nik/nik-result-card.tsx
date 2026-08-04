"use client";

import { Card, CardContent } from "@/components/ui/card";
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

function Row({
  code,
  label,
  value,
}: {
  code: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
      <span className="font-mono text-sm tabular-nums bg-muted px-2.5 py-1 rounded-md text-foreground min-w-[3.5rem] text-center border border-border/50 shrink-0">
        {code}
      </span>
      <span className="text-muted-foreground/30 text-xs select-none shrink-0">
        →
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium truncate">{value}</p>
      </div>
    </div>
  );
}

export function NikResultCard({ data, segments, value }: Props) {
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
  const genderCode =
    data.jenis_kelamin === "PEREMPUAN"
      ? "♀"
      : data.jenis_kelamin === "LAKI-LAKI"
        ? "♂"
        : "—";

  return (
    <Card>
      <CardContent className="pt-4 pb-3 divide-y">
        {segments.map((seg, i) => {
          const mapping = SEGMENT_RESULT_MAP[seg.id];
          if (!mapping) return null;

          const rawValue = segValues[i] || "";
          const parsedValue = data[mapping.key];
          const displayValue = parsedValue ?? (rawValue ? "..." : "—");

          return (
            <Row
              key={seg.id}
              code={rawValue || "—"}
              label={mapping.label}
              value={displayValue}
            />
          );
        })}

        <Row code={genderCode} label="Jenis Kelamin" value={genderLabel} />
      </CardContent>
    </Card>
  );
}
