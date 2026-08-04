import { LayerCard } from "@cloudflare/kumo";

export function ResultCard({ data }: { data: Record<string, unknown> }) {
  return (
    <LayerCard>
      <div className="space-y-1.5">
        {Object.entries(data).map(([key, val]) =>
          key === "latitude" || key === "longitude" ? null : (
            <div key={key} className="flex gap-2 text-sm">
              <span className="text-kumo-subtle w-32 shrink-0 capitalize">
                {key.replace(/_/g, " ")}
              </span>
              <span className="text-kumo-text font-medium">
                {val as string}
              </span>
            </div>
          )
        )}
      </div>
    </LayerCard>
  );
}
