"use client";

import dynamic from "next/dynamic";

const SearchShellInner = dynamic(
  () => import("./search-shell-inner").then((m) => ({ default: m.SearchShellInner })),
  { ssr: false }
);

export function SearchShell() {
  return <SearchShellInner />;
}
