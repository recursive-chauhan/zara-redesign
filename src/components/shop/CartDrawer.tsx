import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/store/cart";

export function CartDrawer() {
  const { isOpen, close, lines, resolve, setQty, remove, clear, subtotal, count } =
    useCart();

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <button
        type="button"
        aria-label="Close cart overlay"
        onClick={close}
        className="absolute inset-0 bg-foreground/40"
      />
      <aside className="absolute right-0 top-0 flex h-full w-[94vw] max-w-md flex-col bg-background shadow-xl">
        <div className="flex h-14 items-center justify-between border-b border-border px-5">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider">
            <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
            Shopping bag
            <span className="text-muted-foreground">({count})</span>
          </p>
          <button
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center hover:bg-muted"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" strokeWidth={1} />
            <p className="mt-4 text-sm font-medium text-foreground">Your bag is empty</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Add items you love to see them here.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-6 inline-flex border border-foreground px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground hover:bg-foreground hover:text-background"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              <ul className="divide-y divide-border">
                {lines.map((line) => {
                  const p = resolve(line);
                  if (!p) return null;
                  return (
                    <li key={`${line.productId}-${line.size}`} className="flex gap-4 p-5">
                      <Link
                        to="/product/$id"
                        params={{ id: p.id }}
                        onClick={close}
                        className="block h-28 w-20 shrink-0 overflow-hidden bg-muted"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <Link
                              to="/product/$id"
                              params={{ id: p.id }}
                              onClick={close}
                              className="line-clamp-2 text-sm font-medium text-foreground hover:underline"
                            >
                              {p.name}
                            </Link>
                            <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                              Size {line.size}
                            </p>
                          </div>
                          <p className="shrink-0 text-sm font-semibold tabular-nums">
                            {p.price * line.qty} €
                          </p>
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="inline-flex items-center border border-border">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => setQty(p.id, line.size, line.qty - 1)}
                              className="flex h-8 w-8 items-center justify-center hover:bg-muted"
                            >
                              <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                            </button>
                            <span className="w-8 text-center text-sm tabular-nums">
                              {line.qty}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => setQty(p.id, line.size, line.qty + 1)}
                              disabled={line.qty >= 10}
                              className="flex h-8 w-8 items-center justify-center hover:bg-muted disabled:opacity-30"
                            >
                              <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(p.id, line.size)}
                            className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="px-5 pb-5">
                <button
                  type="button"
                  onClick={clear}
                  className="text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground hover:underline"
                >
                  Clear bag
                </button>
              </div>
            </div>

            <div className="border-t border-border p-5">
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold tabular-nums text-foreground">
                  {subtotal} €
                </span>
              </div>
              <p className="mb-4 text-[11px] text-muted-foreground">
                Shipping and taxes calculated at checkout. Free shipping over 50 €.
              </p>
              <Link
                to="/checkout"
                onClick={close}
                className="block w-full bg-primary py-3.5 text-center text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-foreground/90"
              >
                Checkout · {subtotal} €
              </Link>
              <button
                type="button"
                onClick={close}
                className="mt-3 block w-full border border-border py-3 text-center text-xs font-medium uppercase tracking-wider text-foreground hover:bg-muted"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}