import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/store/cart";

export function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    // Quick add picks the first available size — user can change it in the cart drawer
    const defaultSize = product.sizes[0];
    if (!defaultSize) return;
    add({ productId: product.id, size: defaultSize, qty: 1 });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <article
      className="group relative flex flex-col scroll-reveal-up hover-lift"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="relative block aspect-[3/4] overflow-hidden bg-muted"
        aria-label={`${product.name}, ${product.price} ${product.currency}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            hovered ? "opacity-0" : "opacity-100"
          }`}
        />
        <img
          src={product.hoverImage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {product.isNew && (
          <span className="absolute left-3 top-3 bg-background px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground">
            New
          </span>
        )}

        {/* Quick add — visible on hover (desktop) and always on touch */}
        <button
          type="button"
          onClick={handleQuickAdd}
          aria-label={`Quick add ${product.name} to cart`}
          className={`absolute bottom-3 right-3 inline-flex items-center gap-2 bg-background/95 px-3 py-2 text-xs font-medium uppercase tracking-wider text-foreground shadow-sm transition-all duration-200 hover:bg-foreground hover:text-background focus:outline-none focus:ring-2 focus:ring-ring md:opacity-0 md:translate-y-1 ${
            hovered ? "md:opacity-100 md:translate-y-0" : ""
          }`}
        >
          {added ? "Added ✓" : (<><Plus className="h-3.5 w-3.5" strokeWidth={2} /> Quick add</>)}
        </button>
      </Link>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium text-foreground">
            <Link
              to="/product/$id"
              params={{ id: product.id }}
              className="hover:underline underline-offset-4"
            >
              {product.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">
            {product.type}
          </p>
        </div>
        <p className="shrink-0 text-sm font-semibold tabular-nums text-foreground">
          {product.price} €
        </p>
      </div>

      {product.colors.length > 1 && (
        <div className="mt-2 flex items-center gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c}
              aria-hidden="true"
              className="h-3 w-3 rounded-full border border-border"
              style={{ backgroundColor: c }}
            />
          ))}
          <span className="ml-1 text-[11px] text-muted-foreground">
            {product.colors.length} colors
          </span>
        </div>
      )}
    </article>
  );
}