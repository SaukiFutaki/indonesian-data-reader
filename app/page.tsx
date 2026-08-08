import type { Metadata } from "next";
import Link from "next/link";
import { IdCard, MapPin, Car, GraduationCap, ArrowRight, Database, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Indonesia Data Reader — Pembaca & Validasi Data Identitas Indonesia",
  description:
    "Aplikasi web & library terbuka untuk membaca 16 digit NIK, Kode Pos 5 digit, Plat Nomor kendaraan, dan NPSN sekolah Indonesia.",
  keywords: [
    "cek NIK",
    "NIK reader",
    "baca NIK",
    "kode pos indonesia",
    "cek kode pos",
    "plat nomor",
    "cek plat nomor",
    "cek npsn",
    "npsn sekolah",
  ],
  alternates: {
    canonical: "https://bacadataindo.my.id",
  },
  openGraph: {
    title: "Indonesia Data Reader — Pembaca Data Identitas Indonesia",
    description:
      "Aplikasi web & library terbuka untuk membaca NIK, Kode Pos, Plat Nomor kendaraan, dan NPSN sekolah.",
    url: "https://bacadataindo.my.id",
    siteName: "Indonesia Data Reader",
    locale: "id_ID",
    type: "website",
  },
};

const features = [
  {
    href: "/nik",
    icon: IdCard,
    title: "NIK Reader",
    desc: "Baca 16 digit NIK KTP: Provinsi, Kabupaten/Kota, Kecamatan, Jenis Kelamin, dan Tanggal Lahir.",
    example: "3204214501900001",
    badge: "16 Digit NIK",
  },
  {
    href: "/kodepos",
    icon: MapPin,
    title: "Kode Pos",
    desc: "Cari kelurahan, kecamatan, kabupaten, dan koordinat peta dari 5 digit kode pos.",
    example: "40115",
    badge: "92.000+ Kelurahan",
  },
  {
    href: "/plat",
    icon: Car,
    title: "Plat Nomor",
    desc: "Cek kode plat kendaraan: Wilayah pendaftaran, Polda, dan pulau dari 61 kode plat.",
    example: "B 1234 XYZ",
    badge: "61 Kode Plat",
  },
  {
    href: "/npsn",
    icon: GraduationCap,
    title: "NPSN Sekolah",
    desc: "Cari data sekolah dari 8 digit NPSN: Nama sekolah, jenjang, status, dan alamat.",
    example: "20104775",
    badge: "213.000+ Sekolah",
  },
];

const stats = [
  { value: "213.000+", label: "Sekolah (NPSN)" },
  { value: "91.000+", label: "Wilayah (BPS)" },
  { value: "92.000+", label: "Kode Pos" },
  { value: "61", label: "Kode Plat Nomor" },
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Indonesia Data Reader",
    url: "https://bacadataindo.my.id",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    description: "Satu alat untuk membaca NIK, Kode Pos, Plat Nomor Kendaraan, dan NPSN Sekolah Indonesia.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Hero Section */}
        <section className="animate-fade-up text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-950 mb-4">
            <Zap className="h-3.5 w-3.5 text-zinc-950" />
            <span>Unified Indonesian Regional Data Toolkit</span>
          </div>

          <h1 className="text-[2.25rem] leading-tight sm:text-[3.25rem] font-black tracking-tight text-zinc-950">
            Indonesia Data <span className="underline decoration-zinc-300 underline-offset-8">Reader</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-600 max-w-2xl">
            Platform validator dan pembaca data Nomor Induk Kependudukan (NIK), Kode Pos 5 digit, Kode Plat Kendaraan, dan Nomor Pokok Sekolah Nasional (NPSN).
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <Link
              href="/nik"
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-xs transition-all hover:bg-zinc-800 active:scale-95"
            >
              <span>Coba Cek NIK</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/kodepos"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-bold text-zinc-950 shadow-xs transition-colors hover:bg-zinc-100"
            >
              <MapPin className="h-4 w-4 text-zinc-950" />
              <span>Cari Kode Pos</span>
            </Link>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="mt-10 animate-fade-up" style={{ animationDelay: "60ms" }}>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xs text-center">
            {stats.map((s) => (
              <div key={s.label} className="p-2">
                <div className="text-xl sm:text-2xl font-black font-mono tracking-tight tabular text-zinc-950">
                  {s.value}
                </div>
                <div className="text-[11px] sm:text-xs text-zinc-600 mt-0.5 font-semibold">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Bento Grid */}
        <section className="mt-10 animate-fade-up" style={{ animationDelay: "120ms" }}>
          <h2 className="text-base font-bold tracking-tight text-zinc-950 mb-3">
            Pilih Modul Pembaca
          </h2>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {features.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="group flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-zinc-950 hover:bg-zinc-50"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-950 text-white shadow-xs">
                      <f.icon className="h-4 w-4" />
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-950 border border-zinc-300">
                      {f.badge}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-zinc-950 flex items-center justify-between">
                    <span>{f.title}</span>
                    <ArrowRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-zinc-950" />
                  </h3>

                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-zinc-600">
                    {f.desc}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-xl bg-zinc-100 border border-zinc-200 px-3 py-1.5 text-xs font-mono">
                  <span className="text-zinc-500 font-sans text-[11px]">Contoh:</span>
                  <span className="text-zinc-950 font-bold tabular">{f.example}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Developer API Info Box */}
        <section className="mt-10 animate-fade-up" style={{ animationDelay: "180ms" }}>
          <div className="rounded-2xl border border-zinc-300 bg-zinc-100/70 p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-1.5">
              <Database className="h-4 w-4 text-zinc-950" />
              <h2 className="text-sm font-bold text-zinc-950">REST API & Integration</h2>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Seluruh modul pembaca data dapat diintegrasikan dengan mudah via REST API:
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-mono font-bold">
              <span className="bg-white text-zinc-950 px-2.5 py-1 rounded-md border border-zinc-300 shadow-xs">POST /api/v0/nik</span>
              <span className="bg-white text-zinc-950 px-2.5 py-1 rounded-md border border-zinc-300 shadow-xs">POST /api/v0/kodepos</span>
              <span className="bg-white text-zinc-950 px-2.5 py-1 rounded-md border border-zinc-300 shadow-xs">POST /api/v0/plat</span>
              <span className="bg-white text-zinc-950 px-2.5 py-1 rounded-md border border-zinc-300 shadow-xs">POST /api/v0/npsn</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
