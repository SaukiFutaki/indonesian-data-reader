"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "@phosphor-icons/react";

interface KodeposResult {
  kelurahan: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  kode_pos: number;
  latitude: number | null;
  longitude: number | null;
}

export function KodeposResultCard({
  data,
  expanded,
  onToggle,
  MapComponent,
}: {
  data: KodeposResult;
  expanded: boolean;
  onToggle: () => void;
  MapComponent: React.ComponentType<{ lat: number; lng: number; name: string }>;
}) {
  const hasCoords = typeof data.latitude === "number" && typeof data.longitude === "number";

  return (
    <Card className="cursor-pointer select-none" onClick={onToggle}>
      <CardContent className="py-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{data.kelurahan}</span>
              <span className="text-xs text-muted-foreground font-mono tabular-nums">
                {data.kode_pos}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {data.kecamatan} &middot; {data.kabupaten} &middot; {data.provinsi}
            </p>
            {hasCoords && (
              <p className="text-[10px] text-muted-foreground/60 font-mono">
                {data.latitude!.toFixed(6)}, {data.longitude!.toFixed(6)}
              </p>
            )}
          </div>
          {hasCoords && (
            <div className="shrink-0 text-muted-foreground/50 pt-0.5">
              {expanded ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            </div>
          )}
        </div>

        {expanded && hasCoords && (
          <div className="mt-3 h-52 w-full rounded-lg overflow-hidden border">
            <MapComponent lat={data.latitude!} lng={data.longitude!} name={data.kelurahan} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
