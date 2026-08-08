import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TRPCReactProvider } from "@/lib/trpc/client";
import { TooltipProvider } from "@cloudflare/kumo";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
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
  title: {
    default: "Indonesia Data Reader",
    template: "%s — Indonesia Data Reader",
  },
  description:
    "Baca & validasi data identitas Indonesia: NIK, kode pos, plat nomor, dan NPSN. Gratis, cepat, langsung di browser.",
  metadataBase: new URL("https://indonesia-data-reader.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50/60 text-slate-900">
        <TRPCReactProvider>
          <TooltipProvider>
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </TooltipProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
