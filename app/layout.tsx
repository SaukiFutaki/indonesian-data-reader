import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TRPCReactProvider } from "@/lib/trpc/client";
import { TooltipProvider } from "@cloudflare/kumo";
import { DockWrapper } from "@/components/dock-wrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Indonesia Data Reader",
  description: "Validasi data identitas Indonesia: NIK, kode pos, plat nomor, dan NPSN.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TRPCReactProvider>
          <TooltipProvider>
            <DockWrapper>{children}</DockWrapper>
          </TooltipProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
