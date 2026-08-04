import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Indonesia Data Reader",
  description:
    "Validasi data identitas Indonesia: NIK, kode pos, plat nomor, dan NPSN.",
};

const links = [
  { href: "/nik", label: "NIK Reader", desc: "Baca NIK — provinsi, kabupaten, jenis kelamin, tanggal lahir." },
  { href: "/kodepos", label: "Kode Pos", desc: "Cari kelurahan, kecamatan, dan koordinat dari 5 digit kode pos." },
  { href: "/plat", label: "Plat Nomor", desc: "Cek kode plat — wilayah, Polda, pulau." },
  { href: "/npsn", label: "NPSN", desc: "Cari data sekolah dari Nomor Pokok Sekolah Nasional." },
];

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto">
      <h1 className="text-xl font-semibold mb-2">Indonesia Data Reader</h1>
      <p className="text-sm text-muted-foreground mb-8 max-w-lg">
        Validasi data identitas & wilayah Indonesia. Pilih fitur di bawah.
      </p>

      <div className="grid gap-3">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="block rounded-xl border p-4 hover:border-foreground/20 transition-colors"
          >
            <span className="font-medium text-sm">{l.label}</span>
            <p className="text-xs text-muted-foreground mt-1">{l.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
