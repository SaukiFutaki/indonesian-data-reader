import type { Metadata } from "next";
import dynamic from "next/dynamic";

const SearchShell = dynamic(
  () => import("@/components/search-shell").then((m) => ({ default: m.SearchShell })),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Indonesia Data Reader",
  description:
    "Validasi data identitas Indonesia: NIK, kode pos, plat nomor, dan NPSN.",
};

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold mb-6">Indonesia Data Reader</h1>
      <SearchShell />
    </main>
  );
}
