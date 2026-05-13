import { Link } from "@tanstack/react-router";
import { Home, Search, User, ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import { useAuth } from "@/store/auth";

export function MobileBottomNav() {
  const { count, open } = useCart();
  const { isAuthenticated } = useAuth();

  return (
    <nav
      aria-label="Primary mobile navigation"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur md:hidden"
    >
      <ul className="grid grid-cols-4">
        <li>
          <Link
            to="/"
            className="flex flex-col items-center gap-1 py-2.5"
            activeProps={{ className: "text-foreground" }}
            inactiveProps={{ className: "text-muted-foreground" }}
          >
            <Home className="h-5 w-5" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-wider">Home</span>
          </Link>
        </li>
        <li>
          <Link
            to="/plp"
            search={{ category: "women" }}
            className="flex flex-col items-center gap-1 py-2.5"
            activeProps={{ className: "text-foreground" }}
            inactiveProps={{ className: "text-muted-foreground" }}
          >
            <Search className="h-5 w-5" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-wider">Shop</span>
          </Link>
        </li>
        <li>
          <Link
            to={isAuthenticated ? "/account" : "/login"}
            className="flex flex-col items-center gap-1 py-2.5"
            activeProps={{ className: "text-foreground" }}
            inactiveProps={{ className: "text-muted-foreground" }}
          >
            <User className="h-5 w-5" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-wider">Account</span>
          </Link>
        </li>
        <li>
          <button
            type="button"
            onClick={open}
            className="relative flex w-full flex-col items-center gap-1 py-2.5 text-foreground"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-wider">Bag</span>
            {count > 0 && (
              <span
                aria-hidden="true"
                className="absolute right-[28%] top-1 flex min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[9px] font-semibold leading-[16px] text-primary-foreground"
              >
                {count}
              </span>
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
}