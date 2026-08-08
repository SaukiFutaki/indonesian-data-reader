import type { Metadata } from "next";
import { NikSearch } from "@/components/nik/nik-search";
import { NikFormat } from "@/components/nik/nik-format";
import { PageShell } from "@/components/layout/page-shell";
import { FaqSection } from "@/components/ui/faq-section";

export const metadata: Metadata = {
  title: "Baca NIK Online — Cek Tanggal Lahir & Kode Wilayah NIK KTP",
  description:
    "Cek NIK online gratis. Masukkan 16 digit NIK KTP untuk melihat provinsi, kabupaten/kota, kecamatan, jenis kelamin, dan tanggal lahir secara otomatis.",
  keywords: [
    "cek NIK online",
    "baca NIK",
    "cek tanggal lahir dari NIK",
    "arti 16 digit NIK",
    "cek NIK KTP",
    "kode wilayah NIK",
  ],
  alternates: {
    canonical: "https://bacadataindo.my.id/nik",
  },
  openGraph: {
    title: "Baca NIK Online — Cek Tanggal Lahir & Detail NIK KTP",
    description:
      "Baca 16 digit NIK KTP secara gratis. Tampilkan provinsi, kota, kecamatan, jenis kelamin, dan tanggal lahir.",
    url: "https://bacadataindo.my.id/nik",
    siteName: "Indonesia Data Reader",
    locale: "id_ID",
    type: "website",
  },
};

const faqItems = [
  {
    question: "Bagaimana cara cek NIK online?",
    answer:
      "Ketik 16 digit NIK pada kolom input di atas. Detail seperti provinsi, kabupaten/kota, kecamatan, jenis kelamin, dan tanggal lahir langsung ditampilkan secara otomatis.",
  },
  {
    question: "Apakah NIK yang saya masukkan disimpan?",
    answer:
      "Tidak. Proses pembacaan NIK berjalan langsung di browser kamu dan data tidak disimpan di server mana pun.",
  },
  {
    question: "Apa saja yang bisa dilihat dari sebuah NIK?",
    answer:
      "NIK memuat kode wilayah (provinsi, kabupaten/kota, kecamatan), tanggal lahir, jenis kelamin (ditambah 40 untuk perempuan), dan nomor urut pendaftaran.",
  },
  {
    question: "Apakah bisa cek nama atau alamat lengkap dari NIK?",
    answer:
      "Tidak. NIK tidak memuat nama, alamat jalan, atau nomor telepon. Pencocokan identitas resmi hanya bisa dilakukan via Dukcapil.",
  },
];

export default function NikPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageShell
        breadcrumb="NIK Reader"
        subtitle="Nomor Induk Kependudukan"
        title="Baca dan Periksa NIK"
        description="Masukkan 16 digit NIK untuk membaca provinsi, kabupaten/kota, kecamatan, jenis kelamin, dan tanggal lahir."
      >
        <NikSearch />
        <NikFormat />
        <FaqSection title="Pertanyaan yang sering ditanyakan" items={faqItems} />
      </PageShell>
    </>
  );
}
