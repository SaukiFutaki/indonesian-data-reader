import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageShellProps {
  breadcrumb: string;
  subtitle: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function PageShell({
  breadcrumb,
  subtitle,
  title,
  description,
  children,
}: PageShellProps) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-zinc-500 mb-5">
        <Link href="/" className="hover:text-zinc-950 transition-colors font-medium">
          Beranda
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
        <span className="text-zinc-950 font-semibold">{breadcrumb}</span>
      </nav>

      {/* Header Info */}
      <div className="animate-fade-up">
        <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-zinc-950 bg-zinc-100 px-2.5 py-0.5 rounded border border-zinc-300">
          {subtitle}
        </span>
        <h1 className="text-[2rem] leading-tight sm:text-[2.5rem] font-black tracking-tight text-zinc-950 mt-2.5">
          {title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 max-w-2xl">
          {description}
        </p>
      </div>

      {/* Main Content Area */}
      <div className="mt-6 sm:mt-8 animate-fade-up" style={{ animationDelay: "80ms" }}>
        {children}
      </div>
    </main>
  );
}
