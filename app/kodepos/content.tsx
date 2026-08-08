import { KodeposSearch } from "@/components/kodepos/kodepos-search";
import { KodeposFormat } from "@/components/kodepos/kodepos-format";
import { PageShell } from "@/components/layout/page-shell";
import { FaqSection } from "@/components/ui/faq-section";

const faqItems = [
  {
    question: "Bagaimana cara mencari berdasarkan kode pos?",
    answer:
      "Masukkan 5 digit kode pos pada kolom input. Hasil menampilkan kelurahan, kecamatan, kabupaten, provinsi, dan peta titik lokasi koordinat.",
  },
  {
    question: "Apakah semua kode pos Indonesia tersedia?",
    answer:
      "Ya, database mencakup lebih dari 92.000 kelurahan dan kode pos di seluruh Indonesia lengkap dengan latitude & longitude.",
  },
];

export function KodeposContent() {
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
        breadcrumb="Kode Pos"
        subtitle="Kode Pos Indonesia"
        title="Cari Kode Pos"
        description="Cari kelurahan, kecamatan, kabupaten, dan lokasi koordinat dari 5 digit kode pos."
      >
        <KodeposSearch />
        <KodeposFormat />
        <FaqSection title="Pertanyaan yang sering ditanyakan" items={faqItems} />
      </PageShell>
    </>
  );
}
