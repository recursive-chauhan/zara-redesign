import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ChevronRight,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Check,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { ProductCard } from "@/components/shop/ProductCard";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/store/cart";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    return {
      meta: p
        ? [
            { title: `${p.name} — ZARA` },
            {
              name: "description",
              content: p.description ?? `Shop the ${p.name} from ZARA.`,
            },
            { property: "og:title", content: `${p.name} — ZARA` },
            {
              property: "og:description",
              content: p.description ?? `Shop the ${p.name}.`,
            },
            { property: "og:image", content: p.image },
            { name: "twitter:image", content: p.image },
          ]
        : [{ title: "ZARA" }],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="mx-auto flex max-w-md flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="font-serif-display text-3xl font-bold">Item not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This product may have sold out or been removed.
        </p>
        <Link
          to="/plp"
          search={{ category: "women" }}
          className="mt-6 inline-flex border border-foreground px-5 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-foreground hover:text-background"
        >
          Continue shopping
        </Link>
      </main>
      <Footer />
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add, open } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string>(product.colors[0]);
  const [activeImage, setActiveImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const gallery = [product.image, product.hoverImage, product.image];

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.type === product.type && p.id !== product.id
  ).slice(0, 4);
  const categoryLabel = product.category.charAt(0).toUpperCase() + product.category.slice(1);

  function handleAdd() {
    if (!size) {
      setError("Please select a size before adding to bag.");
      return;
    }
    setError(null);
    add({ productId: product.id, size, qty: 1 });
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 pb-40 md:pb-12">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mx-auto w-full max-w-[1600px] px-4 pt-4 md:px-8 md:pt-6"
        >
          <ol className="flex flex-wrap items-center gap-1 text-xs uppercase tracking-wider text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground hover:underline">Home</Link>
            </li>
            <li><ChevronRight className="h-3 w-3" strokeWidth={1.5} /></li>
            <li>
              <Link
                to="/plp"
                search={{ category: "women" }}
                className="hover:text-foreground hover:underline"
              >
                {categoryLabel}
              </Link>
            </li>
            <li><ChevronRight className="h-3 w-3" strokeWidth={1.5} /></li>
            <li>
              <Link
                to="/plp"
                search={{ category: product.category }}
                className="hover:text-foreground hover:underline"
              >
                {product.type}
              </Link>
            </li>
            <li><ChevronRight className="h-3 w-3" strokeWidth={1.5} /></li>
            <li className="line-clamp-1 max-w-[40ch] text-foreground">{product.name}</li>
          </ol>
        </nav>

        <div className="mx-auto mt-4 grid w-full max-w-[1600px] gap-6 px-4 md:mt-6 md:gap-8 md:px-8 lg:grid-cols-[1fr_420px]">
          {/* Gallery */}
          <section className="grid gap-3 lg:grid-cols-[80px_1fr]">
            <div className="hidden flex-col gap-2 lg:flex">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={`relative aspect-[3/4] w-20 overflow-hidden border-2 ${
                    activeImage === i ? "border-foreground" : "border-transparent"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <div className="aspect-[3/4] w-full overflow-hidden bg-muted">
              <img
                src={gallery[activeImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="col-span-2 flex gap-2 lg:hidden">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={`h-1 flex-1 ${
                    activeImage === i ? "bg-foreground" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </section>

          {/* Info */}
          <section className="lg:sticky lg:top-24 lg:self-start">
            {product.isNew && (
              <p className="mb-3 inline-block bg-foreground px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-background">
                New
              </p>
            )}
            <h1 className="font-serif-display text-2xl font-bold leading-tight tracking-wide text-foreground md:text-3xl">
              {product.name}
            </h1>
            <p className="mt-2 text-xl font-semibold tabular-nums text-foreground">
              {product.price} €
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
              MRP incl. of all taxes
            </p>

            {product.description && (
              <p className="mt-6 text-sm leading-relaxed text-foreground">
                {product.description}
              </p>
            )}

            {/* Color */}
            <div className="mt-6">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-foreground">
                Color
              </p>
              <ul className="flex flex-wrap gap-2">
                {product.colors.map((c: string) => {
                  const active = color === c;
                  return (
                    <li key={c}>
                      <button
                        type="button"
                        aria-pressed={active}
                        aria-label={`Color ${c}`}
                        onClick={() => setColor(c)}
                        className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${
                          active ? "border-foreground" : "border-border hover:border-muted-foreground"
                        }`}
                      >
                        <span
                          className="h-7 w-7 rounded-full border border-border"
                          style={{ backgroundColor: c }}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Size */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground">
                  Size
                </p>
                <button
                  type="button"
                  className="text-[11px] uppercase tracking-wider text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Size guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {(["XS", "S", "M", "L", "XL"] as const).map((s) => {
                  const available = product.sizes.includes(s);
                  const active = size === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      disabled={!available}
                      aria-pressed={active}
                      onClick={() => {
                        setSize(s);
                        setError(null);
                      }}
                      className={`relative border py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
                        active
                          ? "border-foreground bg-foreground text-background"
                          : available
                            ? "border-border bg-background text-foreground hover:border-foreground"
                            : "cursor-not-allowed border-border bg-muted text-muted-foreground line-through"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              {error && (
                <p
                  role="alert"
                  className="mt-2 text-xs font-medium text-destructive"
                >
                  {error}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={handleAdd}
                className="inline-flex flex-1 items-center justify-center gap-2 bg-primary py-3.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-foreground/90"
              >
                <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                Add to bag
              </button>
              <button
                type="button"
                onClick={() => setWishlisted((w) => !w)}
                aria-pressed={wishlisted}
                aria-label="Save for later"
                className="flex h-12 w-12 items-center justify-center border border-border text-foreground transition-colors hover:border-foreground"
              >
                <Heart
                  className="h-5 w-5"
                  strokeWidth={1.5}
                  fill={wishlisted ? "currentColor" : "none"}
                />
              </button>
            </div>

            <button
              type="button"
              onClick={open}
              className="mt-3 w-full text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground hover:underline underline-offset-4"
            >
              View bag
            </button>

            {/* Value props */}
            <ul className="mt-8 space-y-3 border-t border-border pt-6 text-sm text-foreground">
              <li className="flex items-start gap-3">
                <Truck className="mt-0.5 h-4 w-4 text-foreground" strokeWidth={1.5} />
                <span>Free standard shipping on orders over 50 €</span>
              </li>
              <li className="flex items-start gap-3">
                <RotateCcw className="mt-0.5 h-4 w-4 text-foreground" strokeWidth={1.5} />
                <span>Free returns within 30 days</span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-foreground" strokeWidth={1.5} />
                <span>Secure checkout. Pay with Visa, Mastercard or Apple Pay.</span>
              </li>
            </ul>

            {/* Details */}
            {product.details && product.details.length > 0 && (
              <details className="mt-6 border-t border-border pt-6 text-sm">
                <summary className="cursor-pointer list-none text-[11px] font-semibold uppercase tracking-wider text-foreground">
                  Composition & care
                </summary>
                <ul className="mt-3 space-y-1.5 text-muted-foreground">
                  {product.details.map((d: string) => (
                    <li key={d} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5" strokeWidth={1.5} />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </section>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mx-auto mt-20 w-full max-w-[1600px] px-4 md:px-8">
            <h2 className="font-serif-display mb-6 text-2xl font-bold tracking-wide">
              You may also like
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <MobileBottomNav />

      {/* Sticky mobile add-to-bag bar */}
      <div className="fixed inset-x-0 bottom-14 z-30 border-t border-border bg-background/95 px-3 py-2.5 backdrop-blur md:hidden">
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-foreground">
              {product.name}
            </p>
            <p className="text-[11px] tabular-nums text-muted-foreground">
              {product.price} €{size ? ` · Size ${size}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center justify-center gap-1.5 bg-primary px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground"
          >
            <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.5} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}