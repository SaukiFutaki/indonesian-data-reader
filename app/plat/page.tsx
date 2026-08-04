import type { Metadata } from "next";
import { PlatSearch } from "@/components/plat/plat-search";

export const metadata: Metadata = {
  title: "Plat Nomor — Indonesia Data Reader",
  description: "Cek kode plat nomor kendaraan: wilayah, Polda, dan pulau.",
};

export default function PlatPage() {
  return (
    <main className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto">
      <h1 className="text-xl font-semibold mb-6">Indonesia Data Reader</h1>
      <PlatSearch />
    </main>
  );
}
