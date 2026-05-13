import { createFileRoute, Link } from "@tanstack/react-router";
import { Headphones, Mail, MapPin, MessageCircle, PackageCheck, RotateCcw } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help — ZARA Support" },
      { name: "description", content: "Get help with orders, returns, delivery, stores, and customer service." },
      { property: "og:title", content: "Help — ZARA Support" },
      { property: "og:description", content: "Contact support and get help with orders, returns, and delivery." },
    ],
  }),
  component: HelpPage,
});

const HELP_CARDS = [
  { title: "Track an order", desc: "Follow shipping updates and delivery windows.", icon: PackageCheck },
  { title: "Returns", desc: "Start a return or exchange in a few steps.", icon: RotateCcw },
  { title: "Live support", desc: "Message the care team for account or order help.", icon: MessageCircle },
  { title: "Stores", desc: "Find nearby stores, pickup points, and opening hours.", icon: MapPin },
];

function HelpPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <section className="mx-auto max-w-[1600px] px-4 py-16 md:px-8 md:py-24">
          <div className="grid gap-10 border-b border-border pb-12 md:grid-cols-[1fr_1fr] md:items-end">
            <div className="scroll-rise-deep">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                <Headphones className="h-4 w-4" strokeWidth={1.5} /> Help desk
              </p>
              <h1 className="font-serif-display mt-4 text-4xl font-bold leading-tight tracking-wide text-foreground md:text-6xl">
                How can we help?
              </h1>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground scroll-rise-deep">
              Choose a support topic, browse FAQs, or contact the customer care team for order and account help.
            </p>
          </div>

          <div className="grid gap-4 py-12 md:grid-cols-4">
            {HELP_CARDS.map((card) => (
              <article key={card.title} className="group border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-2 hover:border-foreground scroll-rise-deep">
                <card.icon className="h-6 w-6 text-foreground transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                <h2 className="mt-6 text-sm font-semibold uppercase tracking-wider text-foreground">{card.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{card.desc}</p>
              </article>
            ))}
          </div>

          <section className="grid gap-4 bg-muted p-6 scroll-rise-deep md:grid-cols-[1fr_auto] md:items-center md:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Contact</p>
              <h2 className="font-serif-display mt-2 text-2xl font-bold tracking-wide text-foreground">Still need support?</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:support@zara-concept.com" className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-all duration-300 hover:-translate-y-1">
                <Mail className="h-4 w-4" strokeWidth={1.5} /> Email support
              </a>
              <Link to="/faqs" className="inline-flex items-center gap-2 border border-foreground px-5 py-3 text-xs font-semibold uppercase tracking-wider text-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-foreground hover:text-background">
                View FAQs
              </Link>
            </div>
          </section>
        </section>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}