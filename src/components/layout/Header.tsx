import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { EllipsisVertical, User, ShoppingBag, X, ArrowUpRight } from "lucide-react";
import { useCart } from "@/store/cart";
import { SearchInline } from "@/components/shop/SearchInline";
import { SHOP_CATEGORIES } from "@/data/products";
import { useAuth } from "@/store/auth";

const CATEGORIES = SHOP_CATEGORIES.map((category) => ({ ...category, to: "/plp" as const }));

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, open: openCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-16 w-full items-center justify-between px-4 md:px-8">
          {/* Left: modern menu + category links */}
          <div className="flex items-center gap-1 md:gap-2">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="group relative flex h-10 w-10 items-center justify-center overflow-hidden border border-transparent text-foreground transition-all duration-300 hover:border-border hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <span className="absolute inset-1 scale-0 bg-foreground transition-transform duration-300 group-hover:scale-100" aria-hidden="true" />
              <EllipsisVertical className="relative h-5 w-5 transition-all duration-300 group-hover:rotate-90 group-hover:text-background" strokeWidth={1.8} />
            </button>

            <nav className="ml-2 hidden items-center md:flex">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.label}
                  to={c.to}
                  search={{ category: c.slug }}
                  className="px-3 py-2 text-sm font-medium tracking-wide uppercase text-foreground transition-colors hover:underline underline-offset-4 decoration-1"
                  activeProps={{ className: "underline" }}
                >
                  {c.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Center: logo */}
          <Link
            to="/"
            aria-label="ZARA — Home"
            className="absolute left-1/2 -translate-x-1/2 font-serif-display text-2xl font-bold tracking-[0.18em] text-foreground md:text-3xl"
          >
            ZARA
          </Link>

          {/* Right: actions */}
          <div className="flex items-center gap-1">
            <SearchInline />
            <Link
              to={isAuthenticated ? "/account" : "/login"}
              aria-label="Account"
              className="hidden h-10 w-10 items-center justify-center text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring sm:flex"
            >
              <User className="h-5 w-5" strokeWidth={1.5} />
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Cart, ${count} items`}
              className="relative flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {count > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute right-1 top-1 flex min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-[18px] text-primary-foreground"
                >
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-in menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close menu overlay"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-foreground/50 backdrop-blur-md animate-fade-in"
          />
          <aside className="absolute left-0 top-0 flex h-full w-[80vw] max-w-xs flex-col overflow-hidden border-r border-border bg-background shadow-2xl animate-menu-panel">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-gradient-to-br from-foreground/[0.06] to-transparent blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -right-16 h-64 w-64 rounded-full bg-gradient-to-tr from-foreground/[0.04] to-transparent blur-3xl"
            />

            <div className="relative flex h-14 items-center justify-between border-b border-border px-5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-foreground">Menu</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="group flex h-8 w-8 items-center justify-center rounded-full border border-border transition-all duration-300 hover:bg-foreground hover:text-background"
              >
                <X className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-90" strokeWidth={1.8} />
              </button>
            </div>

            <nav className="stagger-list relative flex-1 overflow-y-auto px-5 py-5">
              <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">Shop</p>
              <ul className="space-y-0.5">
                {CATEGORIES.map((c, i) => (
                  <li key={c.label}>
                    <Link
                      to={c.to}
                      search={{ category: c.slug }}
                      onClick={() => setMenuOpen(false)}
                      className="group relative flex items-center justify-between rounded-md px-2 py-2 transition-all duration-200 hover:bg-foreground/5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-mono tabular-nums text-muted-foreground/80 w-4">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-xs font-medium uppercase tracking-[0.14em] text-foreground">
                          {c.label}
                        </span>
                      </div>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 -translate-x-1 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-foreground"
                        strokeWidth={1.8}
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-border/60 pt-5">
                <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">Account</p>
                <Link
                  to={isAuthenticated ? "/account" : "/login"}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center justify-between rounded-md px-2 py-2 text-xs font-medium uppercase tracking-[0.14em] text-foreground transition-all duration-200 hover:bg-foreground/5"
                >
                  <span>{isAuthenticated ? "My Account" : "Login / Sign up"}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition-opacity group-hover:opacity-100" strokeWidth={1.8} />
                </Link>
              </div>

              <div className="mt-6 border-t border-border/60 pt-5">
                <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">Help</p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li><Link to="/help" onClick={() => setMenuOpen(false)} className="block px-2 py-1.5 rounded-md transition-colors hover:bg-foreground/5 hover:text-foreground">Customer service</Link></li>
                  <li><Link to="/faqs" onClick={() => setMenuOpen(false)} className="block px-2 py-1.5 rounded-md transition-colors hover:bg-foreground/5 hover:text-foreground">FAQs</Link></li>
                  <li><a href="#" className="block px-2 py-1.5 rounded-md transition-colors hover:bg-foreground/5 hover:text-foreground">Stores</a></li>
                  <li><a href="#" className="block px-2 py-1.5 rounded-md transition-colors hover:bg-foreground/5 hover:text-foreground">Sustainability</a></li>
                </ul>
              </div>
            </nav>

            <div className="relative border-t border-border px-5 py-3 text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
              ZARA · 2026
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
