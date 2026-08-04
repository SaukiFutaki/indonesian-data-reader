"use client";

import { cn, Tabs } from "@cloudflare/kumo";

const tabs = [
  { value: "nik", label: "NIK" },
  { value: "kodepos", label: "Kode Pos" },
  { value: "plat", label: "Plat Nomor" },
  { value: "npsn", label: "NPSN" },
] as const;

export type SearchTab = (typeof tabs)[number]["value"];

type Props = {
  active: SearchTab;
  onChange: (tab: SearchTab) => void;
};

export function SearchTabs({ active, onChange }: Props) {
  return (
    <Tabs
      variant="segmented"
      tabs={tabs.map((t) => ({
        value: t.value,
        label: t.label,
        className: cn(active === t.value && "font-medium"),
      }))}
      value={active}
      onValueChange={(v) => onChange(v as SearchTab)}
    />
  );
}
