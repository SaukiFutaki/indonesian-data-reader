import type { Metadata } from "next";
import { PlatSearch } from "@/components/plat/plat-search";
import { PlatFormat } from "@/components/plat/plat-format";
import { PageShell } from "@/components/layout/page-shell";
import { FaqSection } from "@/components/ui/faq-section";

export const metadata: Metadata = {
  title: "Cek Kode Plat Nomor Kendaraan Indonesia — Wilayah & Polda",
  description:
    "Cek kode plat nomor kendaraan Indonesia. Cari wilayah pendaftaran, Kepolisian Daerah (Polda), dan pulau dari 61 kode plat nomor kendaraan.",
  keywords: [
    "cek plat nomor",
    "kode plat kendaraan",
    "plat B jakarta",
    "plat BK medan",
    "cek polda kendaraan",
    "kode wilayah plat nomor",
  ],
  alternates: {
    canonical: "https://indonesia-data-reader.vercel.app/plat",
  },
  openGraph: {
    title: "Cek Kode Plat Nomor Kendaraan Indonesia — Wilayah & Polda",
    description:
      "Cek kode plat kendaraan Indonesia — wilayah, Polda, dan pulau dari 61 kode plat di seluruh Indonesia.",
    url: "https://indonesia-data-reader.vercel.app/plat",
    siteName: "Indonesia Data Reader",
    locale: "id_ID",
    type: "website",
  },
};

const faqItems = [
  {
    question: "Bagaimana cara cek plat nomor?",
    answer:
      "Masukkan kode plat kendaraan (1-2 huruf pertama, contoh: B, BK, AB). Hasil menampilkan wilayah pendaftaran, Polda, dan pulau asal.",
  },
  {
    question: "Berapa jumlah kode plat di Indonesia?",
    answer:
      "Terdapat 61 kode plat wilayah yang mencakup seluruh wilayah Indonesia, dari Sabang sampai Merauke.",
  },
];

export default function PlatPage() {
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
        breadcrumb="Plat Nomor"
        subtitle="Plat Nomor Kendaraan"
        title="Cek Plat Nomor"
        description='Masukkan kode plat kendaraan. Contoh: "B 1234 XYZ" atau cukup "BK".'
      >
        <PlatSearch />
        <PlatFormat />
        <FaqSection title="Pertanyaan yang sering ditanyakan" items={faqItems} />
      </PageShell>
    </>
  );
}
