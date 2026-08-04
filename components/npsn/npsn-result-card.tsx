import { Card, CardContent } from "@/components/ui/card";

interface SekolahData {
  npsn: string;
  nama: string;
  jenjang: string | null;
  status: string;
  alamat: string | null;
  kabupaten: string | null;
  provinsi: string | null;
  kecamatan: string | null;
  lintang?: number | null;
  bujur?: number | null;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 text-sm py-1.5 first:pt-0 last:pb-0">
      <span className="text-muted-foreground w-24 shrink-0 text-xs pt-0.5">{label}</span>
      <span className="font-medium text-foreground">{value || "—"}</span>
    </div>
  );
}

export function NpsnResultCard({ data }: { data: SekolahData }) {
  return (
    <Card>
      <CardContent className="pt-4 pb-3">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-medium text-sm">{data.nama}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-muted text-muted-foreground tabular-nums">
            {data.npsn}
          </span>
        </div>
        <div className="divide-y">
          <Row label="Jenjang" value={data.jenjang ?? "—"} />
          <Row label="Status" value={data.status} />
          <Row label="Alamat" value={data.alamat ?? "—"} />
          <Row label="Kecamatan" value={data.kecamatan ?? "—"} />
          <Row label="Kab/Kota" value={data.kabupaten ?? "—"} />
          <Row label="Provinsi" value={data.provinsi ?? "—"} />
        </div>
      </CardContent>
    </Card>
  );
}
