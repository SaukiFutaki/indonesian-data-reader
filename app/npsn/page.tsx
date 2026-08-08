import type { Metadata } from "next";
import { NpsnSearch } from "@/components/npsn/npsn-search";
import { NpsnFormat } from "@/components/npsn/npsn-format";
import { PageShell } from "@/components/layout/page-shell";
import { FaqSection } from "@/components/ui/faq-section";

export const metadata: Metadata = {
  title: "Cek Data Sekolah (NPSN) — Pencarian 213.000+ Sekolah Indonesia",
  description:
    "Cari data sekolah berdasarkan 8 digit Nomor Pokok Sekolah Nasional (NPSN) atau nama sekolah. Database mencakup 213.000+ PAUD, SD/MI, SMP/MTs, hingga SMA/SMK/MA.",
  keywords: [
    "cek NPSN",
    "npsn sekolah",
    "cari npsn",
    "data npsn kemendikbud",
    "cek npsn sma smk sd",
    "nomor pokok sekolah nasional",
  ],
  alternates: {
    canonical: "https://bacadataindo.my.id/npsn",
  },
  openGraph: {
    title: "Cek Data Sekolah (NPSN) — 213.000+ Sekolah Indonesia",
    description:
      "Cari sekolah berdasarkan 8 digit NPSN atau nama sekolah. Lengkap dengan jenjang, status, dan alamat.",
    url: "https://bacadataindo.my.id/npsn",
    siteName: "Indonesia Data Reader",
    locale: "id_ID",
    type: "website",
  },
};

const faqItems = [
  {
    question: "Apa itu NPSN?",
    answer:
      "NPSN (Nomor Pokok Sekolah Nasional) adalah kode pengenal 8 digit unik yang diberikan Kemendikbudristek kepada setiap satuan pendidikan aktif di Indonesia.",
  },
  {
    question: "Berapa sekolah yang tersedia?",
    answer:
      "Database mencakup lebih dari 213.000 sekolah, mulai dari PAUD, SD/MI, SMP/MTs, hingga SMA/SMK/MA di seluruh Indonesia.",
  },
];

export default function NpsnPage() {
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
        breadcrumb="NPSN"
        subtitle="Nomor Pokok Sekolah Nasional"
        title="Cek Data Sekolah"
        description="Cari sekolah berdasarkan NPSN 8 digit atau nama sekolah. 213.000+ sekolah di seluruh Indonesia."
      >
        <NpsnSearch />
        <NpsnFormat />
        <FaqSection title="Pertanyaan yang sering ditanyakan" items={faqItems} />
      </PageShell>
    </>
  );
}
