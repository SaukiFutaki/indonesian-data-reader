import { Plus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSection({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <section className="mt-12" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-lg font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-4 divide-y divide-border/50 overflow-hidden rounded-xl border border-border/50">
        {items.map((item, i) => (
          <details key={i} className="group">
            <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 text-[15px] font-medium transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
              {item.question}
              <Plus className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform duration-200 group-open:rotate-45" />
            </summary>
            <p className="max-w-[62ch] px-4 pb-4 text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
