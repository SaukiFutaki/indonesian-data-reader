import { Card, CardContent } from "@/components/ui/card";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 text-sm py-1.5 first:pt-0 last:pb-0">
      <span className="text-muted-foreground w-20 shrink-0 text-xs pt-0.5">{label}</span>
      <span className="font-medium">{value || "—"}</span>
    </div>
  );
}

interface PlatData {
  kode: string;
  wilayah: string;
  polda: string;
  pulau: string;
  /** Full user input (B 1234 XYZ) */
  nopol?: string;
}

export function PlatResultCard({ data }: { data: PlatData }) {
  return (
    <Card>
      <CardContent className="pt-4 pb-3">
        {/* Plate mockup */}
        {data.nopol && (
          <div className="mb-4 mx-auto max-w-[280px] rounded-md border-2 border-foreground bg-background px-5 py-2 text-center">
            <span className="font-mono text-xl font-bold tracking-[0.15em] text-foreground">
              {data.nopol}
            </span>
          </div>
        )}

        <div className="divide-y">
          <Row label="Kode Wilayah" value={data.kode} />
          <Row label="Wilayah" value={data.wilayah} />
          <Row label="Polda" value={data.polda} />
          <Row label="Pulau" value={data.pulau} />
        </div>
      </CardContent>
    </Card>
  );
}
