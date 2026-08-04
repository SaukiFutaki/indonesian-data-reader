import type { Metadata } from "next";
import { NikSearch } from "@/components/nik/nik-search";

export const metadata: Metadata = {
  title: "NIK Reader — Indonesia Data Reader",
  description: "Baca data dari Nomor Induk Kependudukan: wilayah, jenis kelamin, tanggal lahir.",
};

export default function NikPage() {
  return (
    <main className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto">
      <h1 className="text-xl font-semibold mb-6">Indonesia Data Reader</h1>
      <NikSearch />
    </main>
  );
}
