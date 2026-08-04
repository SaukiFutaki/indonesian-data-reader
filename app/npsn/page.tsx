import type { Metadata } from "next";
import { NpsnSearch } from "@/components/npsn/npsn-search";

export const metadata: Metadata = {
  title: "Cek Sekolah (NPSN) — Indonesia Data Reader",
  description: "Cari data sekolah berdasarkan Nomor Pokok Sekolah Nasional 8 digit.",
};

export default function NpsnPage() {
  return (
    <main className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto">
      <h1 className="text-xl font-semibold mb-6">Indonesia Data Reader</h1>
      <NpsnSearch />
    </main>
  );
}
