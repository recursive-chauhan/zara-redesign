import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Truck,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Mail,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { ProductCard } from "@/components/shop/ProductCard";
import { PRODUCTS } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZARA — New Collection" },
      {
        name: "description",
        content:
          "Discover the latest fashion trends. New arrivals in dresses, outerwear, shoes and basics.",
      },
      { property: "og:title", content: "ZARA — New Collection" },
      {
        property: "og:description",
        content: "Discover the latest fashion trends.",
      },
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80",
      },
      {
        name: "twitter:image",
        content:
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80",
      },
    ],
  }),
  component: Index,
});

const CATEGORY_CARDS = [
  {
    title: "Women",
    slug: "women",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Men",
    slug: "men",
    image:
      "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Kids",
    slug: "kids",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Beauty",
    slug: "beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1100&q=80",
  },
];

const EDITORIAL = [
  {
    label: "Studio Collection",
    title: "Tailored. Timeless. Elevated.",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1400&q=80",
  },
  {
    label: "Knitwear",
    title: "The cashmere edit.",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1400&q=80",
  },
];

function Index() {
  const featured = PRODUCTS.slice(0, 4);
  const trending = PRODUCTS.slice(8, 16);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 pb-16 md:pb-0">
        {/* Announcement bar */}
        <div className="border-b border-border bg-foreground py-2.5 text-background animate-fade-in">
          <div className="mx-auto flex max-w-[1600px] items-center justify-center px-4 text-center text-[11px] font-medium uppercase tracking-[0.2em] md:px-8">
            Free shipping on orders over 50 € · Free returns within 30 days
          </div>
        </div>

        {/* HERO */}
        <section className="relative w-full">
          <div className="relative h-[72svh] min-h-[440px] w-full overflow-hidden sm:min-h-[520px] md:h-[78vh]">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=80"
              alt="Model wearing the new ZARA collection"
              className="editorial-image-motion absolute inset-0 h-full w-full object-cover"
            />
            {/* Soft contrast overlay for legible text — preserves the editorial feel */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 px-4 pb-10 sm:px-6 md:px-16 md:pb-20">
              <div className="max-w-2xl text-background animate-fade-in">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] opacity-90 sm:text-xs sm:tracking-[0.3em]">
                  New Collection · Spring 26
                </p>
                <h1 className="font-serif-display mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-6xl">
                  Effortless silhouettes,<br className="hidden md:block" /> sharper than ever.
                </h1>
                <p className="mt-4 max-w-md text-sm opacity-90 md:text-base">
                  Discover the new arrivals — designed for movement, made to last.
                </p>
                <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
                  <Link
                    to="/plp"
                    search={{ category: "women" }}
                    className="inline-flex min-h-12 items-center justify-center gap-2 bg-background px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:bg-foreground hover:text-background sm:px-6 sm:py-3.5 sm:text-sm"
                  >
                    Shop new arrivals
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </Link>
                  <Link
                    to="/plp"
                    search={{ category: "men" }}
                    className="inline-flex min-h-12 items-center justify-center gap-2 border border-background px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-background transition-colors hover:bg-background hover:text-foreground sm:px-6 sm:py-3.5 sm:text-sm"
                  >
                    Shop men
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VALUE PROPS */}
        <section className="border-b border-border bg-background">
          <ul className="mx-auto grid max-w-[1600px] grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Truck, title: "Free shipping", desc: "On orders over 50 €" },
              { icon: RotateCcw, title: "Free returns", desc: "30 days, no questions" },
              { icon: ShieldCheck, title: "Secure payment", desc: "Visa, MC, Apple Pay" },
              { icon: Sparkles, title: "New every week", desc: "Fresh drops every Thursday" },
            ].map((v) => (
              <li
                key={v.title}
                 className="flex items-center gap-3 bg-background px-4 py-5 transition-transform duration-300 hover:-translate-y-1 sm:px-5 md:px-8 scroll-rise-deep"
              >
                <v.icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    {v.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground">{v.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* CATEGORY GRID */}
        <section className="mx-auto w-full max-w-[1600px] px-4 py-16 scroll-reveal-up md:px-8 md:py-20">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Shop by category
              </p>
              <h2 className="font-serif-display mt-2 text-2xl font-bold tracking-wide text-foreground md:text-3xl">
                Find your edit
              </h2>
            </div>
            <Link
              to="/plp"
              search={{ category: "women" }}
              className="hidden items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-foreground hover:underline underline-offset-4 md:inline-flex"
            >
              View all <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {CATEGORY_CARDS.map((c) => (
              <Link
                key={c.title}
                to="/plp"
                search={{ category: c.slug }}
                className="group relative block aspect-[3/4] overflow-hidden bg-muted hover-lift"
              >
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-transparent"
                />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-background">
                  <span className="font-serif-display text-xl font-semibold tracking-wide md:text-2xl">
                    {c.title}
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center bg-background/95 text-foreground transition-transform group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* EDITORIAL */}
        <section className="mx-auto w-full max-w-[1600px] px-4 pb-16 scroll-reveal-up md:grid md:grid-cols-2 md:gap-4 md:px-8 md:pb-20">
          {EDITORIAL.map((e) => (
            <article
              key={e.title}
              className="group relative mb-4 block aspect-[4/5] overflow-hidden bg-muted hover-lift md:mb-0"
            >
              <img
                src={e.image}
                alt={e.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/5"
              />
              <div className="absolute inset-x-6 bottom-6 text-background md:inset-x-10 md:bottom-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] opacity-90">
                  {e.label}
                </p>
                <h3 className="font-serif-display mt-2 max-w-md text-2xl font-bold leading-tight tracking-tight md:text-4xl">
                  {e.title}
                </h3>
                <Link
                  to="/plp"
                  search={{ category: "women" }}
                  className="mt-5 inline-flex items-center gap-2 border border-background px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-background transition-colors hover:bg-background hover:text-foreground"
                >
                  Discover <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="mx-auto w-full max-w-[1600px] px-4 pb-16 scroll-reveal-up md:px-8 md:pb-24">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Just in
              </p>
              <h2 className="font-serif-display mt-2 text-2xl font-bold tracking-wide text-foreground md:text-3xl">
                New this week
              </h2>
            </div>
            <Link
              to="/plp"
              search={{ category: "women" }}
              className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-foreground hover:underline underline-offset-4"
            >
              View all <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>

           <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10 md:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* SPLIT BANNER — STORY */}
        <section className="bg-muted scroll-reveal-up">
          <div className="mx-auto grid max-w-[1600px] gap-0 md:grid-cols-2">
            <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[560px]">
              <img
                src="https://images.unsplash.com/photo-1485518882345-15568b007407?auto=format&fit=crop&w=1400&q=80"
                alt="Atelier behind the scenes"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-center px-6 py-12 md:px-16 md:py-20">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                The Atelier
              </p>
              <h2 className="font-serif-display mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
                Crafted in Europe.<br />Designed for every day.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-foreground md:text-base">
                We work with mills and ateliers across Spain, Portugal and Italy to
                produce small, considered runs of pieces that are made to last —
                not made to chase.
              </p>
              <div className="mt-8">
                <Link
                  to="/plp"
                  search={{ category: "women" }}
                  className="inline-flex items-center gap-2 border border-foreground px-6 py-3 text-xs font-semibold uppercase tracking-wider text-foreground hover:bg-foreground hover:text-background"
                >
                  Read our story <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* TRENDING NOW */}
        <section className="mx-auto w-full max-w-[1600px] px-4 py-16 scroll-reveal-up md:px-8 md:py-24">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Trending now
              </p>
              <h2 className="font-serif-display mt-2 text-2xl font-bold tracking-wide text-foreground md:text-3xl">
                What everyone's buying
              </h2>
            </div>
            <Link
              to="/plp"
              search={{ category: "women" }}
              className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-foreground hover:underline underline-offset-4"
            >
              View all <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>

           <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10 md:grid-cols-4">
            {trending.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* LOOKBOOK */}
        <section className="mx-auto w-full max-w-[1600px] px-4 pb-16 scroll-reveal-up md:px-8 md:pb-24">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Lookbook
            </p>
            <h2 className="font-serif-display mt-2 text-2xl font-bold tracking-wide text-foreground md:text-3xl">
              The Spring 26 edit
            </h2>
          </div>

           <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:gap-4">
            {[
              "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80",
            ].map((src, i) => (
              <div
                key={src}
                className={`relative overflow-hidden bg-muted hover-lift ${
                  i === 0 || i === 5 ? "aspect-[3/4]" : "aspect-[3/4]"
                }`}
              >
                <img
                  src={src}
                  alt={`Lookbook image ${i + 1}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>

        {/* NEWSLETTER */}
        <NewsletterSection />
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || trimmed.length > 254) {
      setError("Please enter a valid email address.");
      return;
    }
    // Lightweight client-side validation — not a substitute for server-side
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
    if (!ok) {
      setError("That email doesn't look right.");
      return;
    }
    setError(null);
    setSubmitted(true);
  }

  return (
    <section className="border-t border-border bg-background scroll-reveal-up">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-16 text-center md:py-24">
        <Mail className="h-6 w-6 text-foreground" strokeWidth={1.5} />
        <h2 className="font-serif-display mt-4 text-2xl font-bold tracking-wide md:text-3xl">
          Be the first to know
        </h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          New collections, exclusive previews and early access. Straight to your inbox.
        </p>

        {submitted ? (
          <p className="mt-8 text-sm font-medium text-foreground">
            Thanks — we'll keep you posted.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex w-full max-w-md flex-col gap-2 sm:flex-row"
            noValidate
          >
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              required
              maxLength={254}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Email address"
              aria-invalid={!!error}
              aria-describedby={error ? "newsletter-error" : undefined}
              className="flex-1 border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
            />
            <button
              type="submit"
              className="bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground hover:bg-foreground/90"
            >
              Subscribe
            </button>
          </form>
        )}
        {error && (
          <p
            id="newsletter-error"
            role="alert"
            className="mt-2 text-xs font-medium text-destructive"
          >
            {error}
          </p>
        )}
        <p className="mt-4 text-[11px] text-muted-foreground">
          By subscribing you agree to our privacy policy.
        </p>
      </div>
    </section>
  );
}
