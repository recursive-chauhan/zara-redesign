import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Search as SearchIcon, X, TrendingUp, Clock } from "lucide-react";
import { PRODUCTS } from "@/data/products";

const TRENDING = ["Wool coat", "Slip dress", "Cashmere", "Boots", "Blazer"];

export function SearchInline() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    const onClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const q = query.trim().toLowerCase();

  const matches = useMemo(() => {
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q),
    ).slice(0, 5);
  }, [q]);

  function commit(term: string) {
    if (!term.trim()) return;
    setRecent((cur) => [term, ...cur.filter((r) => r !== term)].slice(0, 5));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!q) return;
    commit(query);
    setOpen(false);
    navigate({ to: "/plp", search: { category: "women" } });
  }

  return (
    <div ref={wrapperRef} className="relative">
      {/* Toggle / collapsed input */}
      <div
        className={`flex items-center overflow-hidden border border-transparent transition-[width,border-color,background-color] duration-300 ease-out ${
          open
            ? "w-[200px] sm:w-[280px] md:w-[340px] border-border bg-background"
            : "w-10"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close search" : "Search"}
          className="flex h-10 w-10 shrink-0 items-center justify-center text-foreground transition-colors hover:bg-muted focus:outline-none"
        >
          <SearchIcon
            className={`h-5 w-5 transition-transform duration-300 ${open ? "scale-90" : ""}`}
            strokeWidth={1.5}
          />
        </button>
        <form onSubmit={handleSubmit} className={`flex-1 ${open ? "block" : "hidden"}`}>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value.slice(0, 80))}
            placeholder="Search items…"
            maxLength={80}
            aria-label="Search"
            className="h-10 w-full bg-transparent pr-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </form>
        {open && query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Clear"
            className="flex h-8 w-8 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[92vw] max-w-[440px] origin-top-right border border-border bg-background shadow-2xl animate-search-pop">
          <div className="max-h-[70vh] overflow-y-auto">
            {!q ? (
              <div className="p-5">
                <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  <TrendingUp className="h-3 w-3" strokeWidth={2} />
                  Trending
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {TRENDING.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setQuery(t);
                        inputRef.current?.focus();
                      }}
                      className="border border-border px-2.5 py-1 text-[11px] uppercase tracking-wider text-foreground transition-all hover:-translate-y-0.5 hover:border-foreground hover:bg-foreground hover:text-background"
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {recent.length > 0 && (
                  <>
                    <div className="mt-5 mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      <Clock className="h-3 w-3" strokeWidth={2} />
                      Recent
                    </div>
                    <ul className="space-y-1">
                      {recent.map((r) => (
                        <li key={r}>
                          <button
                            type="button"
                            onClick={() => setQuery(r)}
                            className="flex w-full items-center justify-between py-1 text-sm text-foreground hover:underline underline-offset-4"
                          >
                            <span>{r}</span>
                            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ) : matches.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm text-foreground">No items match “{query}”.</p>
                <p className="mt-1 text-xs text-muted-foreground">Try “coat”, “dress” or “boots”.</p>
              </div>
            ) : (
              <>
                <p className="px-5 pt-4 pb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {matches.length} result{matches.length === 1 ? "" : "s"}
                </p>
                <ul className="stagger-list">
                  {matches.map((p) => (
                    <li key={p.id}>
                      <Link
                        to="/product/$id"
                        params={{ id: p.id }}
                        onClick={() => {
                          commit(query);
                          setOpen(false);
                        }}
                        className="group flex items-center gap-3 px-5 py-2.5 transition-colors hover:bg-muted"
                      >
                        <div className="h-14 w-12 shrink-0 overflow-hidden bg-muted">
                          <img
                            src={p.image}
                            alt={p.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <p className="truncate text-sm font-medium text-foreground">{p.name}</p>
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                            {p.type}
                          </p>
                        </div>
                        <p className="text-sm font-semibold tabular-nums text-foreground">{p.price} €</p>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-border p-4">
                  <button
                    type="button"
                    onClick={handleSubmit as unknown as () => void}
                    className="flex w-full items-center justify-center gap-2 border border-foreground px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-foreground transition-colors hover:bg-foreground hover:text-background"
                  >
                    See all results <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
