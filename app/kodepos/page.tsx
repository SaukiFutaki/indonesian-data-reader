"use client";

import dynamic from "next/dynamic";

const KodeposSearch = dynamic(
  () => import("@/components/kodepos/kodepos-search").then((m) => ({ default: m.KodeposSearch })),
  { ssr: false }
);

export default function KodeposPage() {
  return (
    <main className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto">
      <h1 className="text-xl font-semibold mb-6">Indonesia Data Reader</h1>
      <KodeposSearch />
    </main>
  );
}
