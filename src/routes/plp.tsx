import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpDown, ChevronRight, SlidersHorizontal, X, Check, ChevronDown, Sparkles } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { ProductCard } from "@/components/shop/ProductCard";
import {
  PRODUCTS,
  ALL_SIZES,
  COLOR_SWATCHES,
  SHOP_CATEGORIES,
  type Product,
} from "@/data/products";

type Search = {
  category?: string;
};

export const Route = createFileRoute("/plp")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    category:
      typeof search.category === "string" ? search.category : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Women — New Collection | ZARA" },
      {
        name: "description",
        content:
          "Shop the latest women's collection — dresses, outerwear, shoes and basics.",
      },
      { property: "og:title", content: "Women — New Collection | ZARA" },
      {
        property: "og:description",
        content: "Shop the latest collection.",
      },
    ],
  }),
  component: PLP,
});

const SORT_OPTIONS = [
  { id: "featured", label: "Featured" },
  { id: "new", label: "Newest" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
] as const;

type SortId = (typeof SORT_OPTIONS)[number]["id"];

function PLP() {
  const { category } = Route.useSearch();
  const activeCategory = SHOP_CATEGORIES.some((c) => c.slug === category) ? category : "women";
  const sectionLabel = SHOP_CATEGORIES.find((c) => c.slug === activeCategory)?.label ?? "Women";
  const isHomeCategory = activeCategory === "home";

  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [cats, setCats] = useState<string[]>([]);
  const [sort, setSort] = useState<SortId>("featured");
  const [filterOpen, setFilterOpen] = useState(false);

  const categoriesAvailable = useMemo(
    () => Array.from(new Set(PRODUCTS.filter((p) => p.category === activeCategory).map((p) => p.type))),
    [activeCategory]
  );

  const filtered = useMemo(() => {
    let list: Product[] = PRODUCTS.filter((p) => p.category === activeCategory);
    if (sizes.length)
      list = list.filter((p) => p.sizes.some((s) => sizes.includes(s)));
    if (colors.length)
      list = list.filter((p) => p.colors.some((c) => colors.includes(c)));
    if (cats.length) list = list.filter((p) => cats.includes(p.type));

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "new":
        list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
        break;
    }
    return list;
  }, [activeCategory, sizes, colors, cats, sort]);

  const activeFilterCount = sizes.length + colors.length + cats.length;

  function clearAll() {
    setSizes([]);
    setColors([]);
    setCats([]);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 pb-16 md:pb-0">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mx-auto w-full max-w-[1600px] px-4 pt-6 md:px-8"
        >
          <ol className="flex flex-wrap items-center gap-1 text-xs uppercase tracking-wider text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground hover:underline">
                Home
              </Link>
            </li>
            <li><ChevronRight className="h-3 w-3" strokeWidth={1.5} /></li>
            <li>
              <Link to="/plp" className="hover:text-foreground hover:underline">
                {sectionLabel}
              </Link>
            </li>
            <li><ChevronRight className="h-3 w-3" strokeWidth={1.5} /></li>
            <li className="text-foreground">New Collection</li>
          </ol>
        </nav>

        {/* Title */}
        <div className="mx-auto w-full max-w-[1600px] px-4 pt-4 md:px-8">
          <h1 className="font-serif-display text-3xl font-bold tracking-wide text-foreground md:text-4xl">
            {sectionLabel} — New Collection
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "item" : "items"}
          </p>
        </div>

        {/* Sticky filter / sort bar */}
        <div className={`sticky top-16 z-20 mt-6 border-y border-border bg-background/95 backdrop-blur ${isHomeCategory ? "shadow-sm" : ""}`}>
          <div className={`mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-4 py-3 md:px-8 ${isHomeCategory ? "stagger-list" : ""}`}>
            <button
              type="button"
              onClick={() => setFilterOpen(true)}
              className={`group relative inline-flex items-center gap-2 overflow-hidden border px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-foreground hover:bg-foreground hover:text-background focus:outline-none focus:ring-2 focus:ring-ring ${isHomeCategory ? "shimmer-sweep border-foreground/30 bg-muted/70 shadow-sm" : "border-border"}`}
            >
              <SlidersHorizontal className="relative h-4 w-4 transition-transform duration-300 group-hover:rotate-12" strokeWidth={1.5} />
              {isHomeCategory ? "Refine Home" : "Filters"}
              {activeFilterCount > 0 && (
                <span className="ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {isHomeCategory ? (
              <div className="hidden items-center gap-2 border border-border bg-muted/70 p-1.5 shadow-sm md:flex" aria-label="Sort home products">
                <span className="flex items-center gap-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <ArrowUpDown className="h-3.5 w-3.5" strokeWidth={1.5} /> Sort
                </span>
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSort(option.id)}
                    aria-pressed={sort === option.id}
                    className={`group relative px-3 py-2 text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 hover:bg-background ${
                      sort === option.id ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground"
                    }`}
                  >
                    {sort === option.id && <Sparkles className="mr-1 inline h-3 w-3" strokeWidth={1.5} />}
                    {option.id === "featured" ? "Featured" : option.label.replace("Price: ", "")}
                  </button>
                ))}
              </div>
            ) : (
              <div className="relative">
                <label htmlFor="sort" className="sr-only">Sort by</label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortId)}
                  className="appearance-none border border-border bg-background px-3 py-2 pr-8 text-xs font-medium uppercase tracking-wider text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.id} value={o.id}>
                      Sort: {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-foreground"
                  strokeWidth={1.5}
                />
              </div>
            )}
          </div>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center gap-2 px-4 pb-3 md:px-8">
              {[...sizes, ...cats].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => {
                    setSizes((s) => s.filter((x) => x !== v));
                    setCats((c) => c.filter((x) => x !== v));
                  }}
                  className="inline-flex items-center gap-1.5 border border-border bg-muted px-2 py-1 text-[11px] uppercase tracking-wider text-foreground hover:border-foreground"
                >
                  {v} <X className="h-3 w-3" strokeWidth={1.5} />
                </button>
              ))}
              {colors.map((hex) => {
                const sw = COLOR_SWATCHES.find((c) => c.hex === hex);
                return (
                  <button
                    key={hex}
                    type="button"
                    onClick={() => setColors((c) => c.filter((x) => x !== hex))}
                    className="inline-flex items-center gap-1.5 border border-border bg-muted px-2 py-1 text-[11px] uppercase tracking-wider text-foreground hover:border-foreground"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full border border-border"
                      style={{ backgroundColor: hex }}
                    />
                    {sw?.name ?? "Color"} <X className="h-3 w-3" strokeWidth={1.5} />
                  </button>
                );
              })}
              <button
                type="button"
                onClick={clearAll}
                className="text-[11px] uppercase tracking-wider text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {activeCategory === "home" && (
          <section className="mx-auto w-full max-w-[1600px] px-4 pt-8 md:px-8">
            <div className="grid gap-6 border-y border-border py-8 scroll-rise-deep md:grid-cols-[0.8fr_1.2fr] md:items-end">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Textiles · Bedding · Dining · Decor · Lighting · Fragrance · Bath · Kitchen · Rugs · Furniture
              </p>
              <p className="font-serif-display text-2xl font-bold leading-tight tracking-wide text-foreground md:text-4xl">
                A longer, curated home edit with calm essentials and statement pieces.
              </p>
            </div>
            <div className="stagger-list grid gap-3 border-b border-border py-5 md:grid-cols-4">
              {[
                "Bedding",
                "Lighting",
                "Dining",
                "Fragrance",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCats((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item])}
                  className={`group shimmer-sweep flex items-center justify-between border px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 hover:border-foreground ${
                    cats.includes(item) ? "border-foreground bg-primary text-primary-foreground" : "border-border bg-background text-foreground"
                  }`}
                >
                  <span>{item}</span>
                  <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                </button>
              ))}
            </div>
          </section>
        )}

        <div className="mx-auto flex w-full max-w-[1600px] gap-8 px-4 py-8 md:px-8">
          {/* Desktop sidebar filters */}
          <aside className="hidden w-60 shrink-0 lg:block">
            <FilterSidebar
              sizes={sizes}
              setSizes={setSizes}
              colors={colors}
              setColors={setColors}
              cats={cats}
              setCats={setCats}
              categoriesAvailable={categoriesAvailable}
            />
          </aside>

          {/* Product grid */}
          <section className="flex-1">
            {filtered.length === 0 ? (
              <div className="border border-dashed border-border p-12 text-center">
                <p className="text-sm text-foreground">No items match your filters.</p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-4 inline-flex border border-foreground px-4 py-2 text-xs font-medium uppercase tracking-wider text-foreground hover:bg-foreground hover:text-background"
                >
                  Clear filters
                </button>
              </div>
            ) : activeCategory === "home" ? (
              <HomeProductGrid products={filtered} />
            ) : (
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 xl:grid-cols-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close filters overlay"
            onClick={() => setFilterOpen(false)}
            className="absolute inset-0 bg-foreground/30"
          />
          <aside className="absolute right-0 top-0 flex h-full w-[92vw] max-w-md flex-col bg-background shadow-xl">
            <div className="flex h-14 items-center justify-between border-b border-border px-5">
              <p className="text-sm font-semibold uppercase tracking-wider">Filters</p>
              <button
                type="button"
                onClick={() => setFilterOpen(false)}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center hover:bg-muted"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <FilterSidebar
                sizes={sizes}
                setSizes={setSizes}
                colors={colors}
                setColors={setColors}
                cats={cats}
                setCats={setCats}
                categoriesAvailable={categoriesAvailable}
              />
            </div>
            <div className="flex gap-3 border-t border-border p-4">
              <button
                type="button"
                onClick={clearAll}
                className="flex-1 border border-border px-4 py-3 text-xs font-medium uppercase tracking-wider hover:bg-muted"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setFilterOpen(false)}
                className="flex-1 bg-primary px-4 py-3 text-xs font-medium uppercase tracking-wider text-primary-foreground hover:bg-foreground/90"
              >
                Show {filtered.length} items
              </button>
            </div>
          </aside>
        </div>
      )}

      <Footer />
      <MobileBottomNav />
    </div>
  );
}

function HomeProductGrid({ products }: { products: Product[] }) {
  const heroProducts = products.filter((_, index) => index % 18 === 0);

  return (
    <div className="space-y-12">
      {products.map((product, index) => {
        const isHero = heroProducts.some((p) => p.id === product.id);
        if (isHero) {
          return <HomeEditorialProduct key={product.id} product={product} />;
        }

        const previousHeroIndex = Math.max(0, Math.floor(index / 18) * 18);
        if (index !== previousHeroIndex + 1) return null;
        const group = products.slice(index, Math.min(index + 17, products.length));

        return (
          <div key={`home-group-${product.id}`} className="grid auto-rows-auto grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-6 md:gap-x-6 xl:grid-cols-12">
            {group.map((item, itemIndex) => (
              <HomeMosaicItem key={item.id} product={item} index={itemIndex} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function HomeMosaicItem({ product, index }: { product: Product; index: number }) {
  const pattern = index % 12;
  const spanClass =
    pattern === 0
      ? "md:col-span-6 xl:col-span-6"
      : pattern === 3 || pattern === 8
        ? "md:col-span-3 xl:col-span-4"
        : pattern === 5
          ? "md:col-span-6 xl:col-span-8"
          : "md:col-span-3 xl:col-span-3";
  const offsetClass = pattern === 2 || pattern === 7 ? "md:pt-12" : pattern === 10 ? "md:pt-20" : "";

  return (
    <div className={`home-mosaic-card scroll-reveal ${spanClass} ${offsetClass}`}>
      <ProductCard product={product} />
    </div>
  );
}

function HomeEditorialProduct({ product }: { product: Product }) {
  return (
    <article className="group grid overflow-hidden border border-border bg-background scroll-reveal md:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
      <Link to="/product/$id" params={{ id: product.id }} className="group relative block min-h-[360px] overflow-hidden bg-muted md:min-h-[520px]">
        <img src={product.image} alt={product.name} loading="lazy" className="editorial-image-motion absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-foreground/45 to-transparent" aria-hidden="true" />
      </Link>
      <div className="flex flex-col justify-center p-6 md:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">Home editorial · {product.type}</p>
        <h2 className="font-serif-display mt-4 text-3xl font-bold leading-tight tracking-wide text-foreground md:text-5xl">{product.name}</h2>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">{product.description}</p>
        <div className="mt-6 grid grid-cols-3 border-y border-border py-4 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          <span>Curated</span>
          <span>Limited</span>
          <span>Home edit</span>
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
          <span className="text-lg font-semibold tabular-nums text-foreground">{product.price} €</span>
          <Link to="/product/$id" params={{ id: product.id }} className="border border-foreground px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:bg-foreground hover:text-background">
            View detail
          </Link>
        </div>
      </div>
    </article>
  );
}

function FilterSidebar(props: {
  sizes: string[];
  setSizes: React.Dispatch<React.SetStateAction<string[]>>;
  colors: string[];
  setColors: React.Dispatch<React.SetStateAction<string[]>>;
  cats: string[];
  setCats: React.Dispatch<React.SetStateAction<string[]>>;
  categoriesAvailable: string[];
}) {
  const { sizes, setSizes, colors, setColors, cats, setCats, categoriesAvailable } = props;

  function toggle(
    list: string[],
    set: React.Dispatch<React.SetStateAction<string[]>>,
    v: string
  ) {
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  }

  return (
    <div className="space-y-8">
      <FilterSection title="Product type">
        <ul className="space-y-2">
          {categoriesAvailable.map((c) => {
            const checked = cats.includes(c);
            return (
              <li key={c}>
                <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
                  <span
                    className={`flex h-4 w-4 items-center justify-center border ${
                      checked
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background"
                    }`}
                    aria-hidden="true"
                  >
                    {checked && <Check className="h-3 w-3" strokeWidth={3} />}
                  </span>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => toggle(cats, setCats, c)}
                  />
                  {c}
                </label>
              </li>
            );
          })}
        </ul>
      </FilterSection>

      <FilterSection title="Size">
        <div className="grid grid-cols-3 gap-2">
          {ALL_SIZES.map((s) => {
            const active = sizes.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggle(sizes, setSizes, s)}
                aria-pressed={active}
                className={`border px-2 py-2 text-xs font-medium uppercase tracking-wider transition-colors ${
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-foreground hover:border-foreground"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Color">
        <ul className="flex flex-wrap gap-3">
          {COLOR_SWATCHES.map((c) => {
            const active = colors.includes(c.hex);
            return (
              <li key={c.hex}>
                <button
                  type="button"
                  onClick={() => toggle(colors, setColors, c.hex)}
                  aria-pressed={active}
                  aria-label={c.name}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors ${
                    active ? "border-foreground" : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <span
                    className="h-6 w-6 rounded-full border border-border"
                    style={{ backgroundColor: c.hex }}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </FilterSection>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
        {title}
      </p>
      {children}
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}