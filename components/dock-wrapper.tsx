"use client";

import { NavDock } from "@/components/nav-dock";

export function DockWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <NavDock />
      </div>
    </>
  );
}
