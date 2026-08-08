"use client";
import dynamic from "next/dynamic";

const KodeposContent = dynamic(
  () => import("./content").then((m) => ({ default: m.KodeposContent })),
  { ssr: false }
);

export default function KodeposPage() {
  return <KodeposContent />;
}
