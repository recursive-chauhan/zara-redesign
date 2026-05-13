import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, Search, Sparkles } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — ZARA Help" },
      { name: "description", content: "Answers about orders, shipping, returns, payments, gift cards, and account help." },
      { property: "og:title", content: "FAQs — ZARA Help" },
      { property: "og:description", content: "Find quick answers for shopping, delivery, returns, and payments." },
    ],
  }),
  component: FAQsPage,
});

const FAQS = [
  ["How do I track an order?", "Open Account, choose your recent order, and follow the live tracking link once it has shipped."],
  ["Can I return online purchases?", "Yes. Returns are accepted within 30 days when items are unworn and returned with their tags."],
  ["Which payment methods are accepted?", "Cards, Apple Pay, gift cards, and selected local payment methods are supported at checkout."],
  ["Can I change my delivery address?", "Address edits are available before the parcel enters preparation. After that, contact Help."],
  ["Do gift cards expire?", "Digital gift cards stay active according to the local store policy shown at purchase."],
  ["How do I care for delicate pieces?", "Check the care label inside each product and use gentle cycles for knitwear, silk, and tailored items."],
];

function FAQsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <section className="mx-auto grid max-w-[1600px] gap-10 px-4 py-16 md:grid-cols-[0.85fr_1.15fr] md:px-8 md:py-24">
          <div className="scroll-rise-deep">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              <Sparkles className="h-4 w-4" strokeWidth={1.5} /> Support center
            </p>
            <h1 className="font-serif-display mt-4 text-4xl font-bold leading-tight tracking-wide text-foreground md:text-6xl">
              Frequently asked questions.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
              Quick answers for orders, returns, payments, sizing, and account help.
            </p>
            <Link to="/help" className="mt-8 inline-flex items-center gap-2 border border-foreground px-5 py-3 text-xs font-semibold uppercase tracking-wider text-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-foreground hover:text-background">
              Need more help
            </Link>
          </div>

          <div className="space-y-3">
            {FAQS.map(([question, answer]) => (
              <details key={question} className="group border border-border bg-background p-5 scroll-rise-deep">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                  {question}
                  <ChevronDown className="h-4 w-4 transition-transform duration-300 group-open:rotate-180" strokeWidth={1.5} />
                </summary>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-muted scroll-rise-deep">
          <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-5 px-4 py-10 md:flex-row md:items-center md:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Search support</p>
              <h2 className="font-serif-display mt-2 text-2xl font-bold tracking-wide text-foreground">Find answers faster</h2>
            </div>
            <div className="flex w-full max-w-lg items-center gap-3 border border-border bg-background px-4 py-3">
              <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <input className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" placeholder="Search order, return, payment..." />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}