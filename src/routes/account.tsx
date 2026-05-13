import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, MapPin, Heart, LogIn, LogOut } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { useCart } from "@/store/cart";
import { useAuth } from "@/store/auth";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account | ZARA" },
      { name: "description", content: "Sign in or create your ZARA account." },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { orders } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const tiles = [
    { icon: Package, label: "Orders", desc: "Track and manage your orders" },
    { icon: Heart, label: "Wishlist", desc: "Items you've saved" },
    { icon: MapPin, label: "Addresses", desc: "Manage shipping addresses" },
  ];
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 pb-24 md:px-8 md:pb-12">
        <h1 className="font-serif-display text-3xl font-bold tracking-wide md:text-4xl">
          My account
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {isAuthenticated ? "Manage your demo profile and orders until refresh." : "Sign in to access demo orders, wishlist and saved addresses until refresh."}
        </p>

        <div className="mt-8 border border-border p-6">
          {user ? (
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
                  {user.avatarInitials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{user.displayName}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{user.stylePreference}</p>
                </div>
              </div>
              <button type="button" onClick={logout} className="inline-flex items-center gap-2 border border-foreground px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground hover:bg-foreground hover:text-background">
                <LogOut className="h-4 w-4" strokeWidth={1.5} /> Logout
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <LogIn className="h-5 w-5" strokeWidth={1.5} />
                <p className="text-sm font-medium">You are not signed in</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link to="/login" className="inline-flex items-center bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground hover:bg-foreground/90">Sign in</Link>
                <Link to="/signup" className="inline-flex items-center border border-foreground px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground hover:bg-foreground hover:text-background">Create account</Link>
              </div>
            </>
          )}
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-3">
          {tiles.map((t) => (
            <li key={t.label}>
              <Link
                to="/plp"
                search={{ category: "women" }}
                className="block border border-border p-5 transition-colors hover:border-foreground"
              >
                <t.icon className="h-5 w-5" strokeWidth={1.5} />
                <p className="mt-3 text-sm font-medium">{t.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
              </Link>
            </li>
          ))}
        </ul>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            My Orders
          </h2>
          {orders.length === 0 ? (
            <div className="mt-4 border border-dashed border-border p-6 text-sm text-muted-foreground">
              No orders yet. Complete the dummy checkout to see order status here until refresh.
            </div>
          ) : (
            <ul className="mt-4 space-y-4">
              {orders.map((order) => (
                <li key={order.id} className="border border-border p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{order.id}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Status: {order.status}
                      </p>
                    </div>
                    <p className="text-sm font-semibold tabular-nums">${order.total}</p>
                  </div>
                  <div className="mt-5 h-1.5 bg-muted">
                    <div className="h-full w-2/3 bg-primary" />
                  </div>
                  <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span>Pending</span>
                    <span>On the way</span>
                    <span>Delivered</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}