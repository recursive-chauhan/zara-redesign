import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronLeft, CreditCard, MapPin, PackageCheck, Truck } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { useCart, type Order } from "@/store/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | ZARA" },
      { name: "description", content: "Complete your ZARA dummy checkout." },
    ],
  }),
  component: CheckoutPage,
});

type ShippingForm = {
  fullName: string;
  address: string;
  city: string;
  phone: string;
};

type PaymentForm = {
  cardNumber: string;
  expiry: string;
  cvv: string;
};

const SHIPPING_CHARGE = 10;
const steps = ["Shipping", "Payment", "Summary"];

function CheckoutPage() {
  const { lines, resolve, subtotal, addOrder } = useCart();
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState<ShippingForm>({
    fullName: "",
    address: "",
    city: "",
    phone: "",
  });
  const [payment, setPayment] = useState<PaymentForm>({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [processing, setProcessing] = useState(false);
  const [confirmed, setConfirmed] = useState<Order | null>(null);

  const total = subtotal + SHIPPING_CHARGE;
  const cartItems = useMemo(
    () => lines.map((line) => ({ line, product: resolve(line) })).filter((item) => item.product),
    [lines, resolve],
  );

  const shippingErrors = {
    fullName: shipping.fullName.trim() ? "" : "Full name is required",
    address: shipping.address.trim() ? "" : "Address is required",
    city: shipping.city.trim() ? "" : "City is required",
    phone: /^\+?[0-9\s-]{7,}$/.test(shipping.phone.trim()) ? "" : "Enter a valid phone number",
  };

  const paymentErrors = {
    cardNumber: /^\d{16}$/.test(payment.cardNumber.replace(/\s/g, "")) ? "" : "Use 16 digits",
    expiry: /^(0[1-9]|1[0-2])\/\d{2}$/.test(payment.expiry.trim()) ? "" : "Use MM/YY",
    cvv: /^\d{3,4}$/.test(payment.cvv.trim()) ? "" : "Use 3 or 4 digits",
  };

  const shippingValid = Object.values(shippingErrors).every(Boolean) === false && Object.values(shippingErrors).every((e) => !e);
  const paymentValid = Object.values(paymentErrors).every(Boolean) === false && Object.values(paymentErrors).every((e) => !e);

  function markFields(fields: string[]) {
    setTouched((prev) => ({ ...prev, ...Object.fromEntries(fields.map((f) => [f, true])) }));
  }

  function nextStep() {
    if (step === 0 && !shippingValid) {
      markFields(Object.keys(shippingErrors));
      return;
    }
    if (step === 1 && !paymentValid) {
      markFields(Object.keys(paymentErrors));
      return;
    }
    setStep((s) => Math.min(s + 1, 2));
  }

  function payNow() {
    if (!paymentValid || !shippingValid || lines.length === 0) return;
    setProcessing(true);
    window.setTimeout(() => {
      const order: Order = {
        id: `ZRA-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toISOString(),
        subtotal,
        shipping: SHIPPING_CHARGE,
        total,
        status: "On the way to deliver",
        lines: [...lines],
      };
      addOrder(order);
      setConfirmed(order);
      setProcessing(false);
    }, 2000);
  }

  if (confirmed) {
    return <CheckoutSuccess order={confirmed} />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 pb-24 md:px-8 md:py-12 md:pb-12">
        <Link to="/plp" search={{ category: "women" }} className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground hover:underline">
          <ChevronLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> Continue shopping
        </Link>

        <p className="mt-4 text-sm text-muted-foreground">
          Demo checkout only. Cart and order details clear when the page refreshes.
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
          <section>
            <h1 className="font-serif-display text-3xl font-bold tracking-wide text-foreground md:text-4xl">Checkout</h1>
            <ol className="mt-8 grid grid-cols-3 border border-border">
              {steps.map((label, index) => (
                <li key={label} className={`border-r border-border px-3 py-4 last:border-r-0 ${index === step ? "bg-foreground text-background" : "bg-background text-foreground"}`}>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider">Step {index + 1}</span>
                  <span className="mt-1 block text-sm font-medium">{label}</span>
                </li>
              ))}
            </ol>

            <div className="mt-8 border border-border p-5 md:p-8">
              {step === 0 && (
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <MapPin className="h-5 w-5" strokeWidth={1.5} />
                    <h2 className="text-sm font-semibold uppercase tracking-wider">Shipping address</h2>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full Name" value={shipping.fullName} error={shippingErrors.fullName} touched={touched.fullName} onBlur={() => setTouched((t) => ({ ...t, fullName: true }))} onChange={(value) => setShipping((s) => ({ ...s, fullName: value }))} />
                    <Field label="Phone Number" value={shipping.phone} error={shippingErrors.phone} touched={touched.phone} onBlur={() => setTouched((t) => ({ ...t, phone: true }))} onChange={(value) => setShipping((s) => ({ ...s, phone: value }))} inputMode="tel" />
                    <Field label="Address" value={shipping.address} error={shippingErrors.address} touched={touched.address} onBlur={() => setTouched((t) => ({ ...t, address: true }))} onChange={(value) => setShipping((s) => ({ ...s, address: value }))} wide />
                    <Field label="City" value={shipping.city} error={shippingErrors.city} touched={touched.city} onBlur={() => setTouched((t) => ({ ...t, city: true }))} onChange={(value) => setShipping((s) => ({ ...s, city: value }))} />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <CreditCard className="h-5 w-5" strokeWidth={1.5} />
                    <h2 className="text-sm font-semibold uppercase tracking-wider">Payment method</h2>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Card Number" value={payment.cardNumber} error={paymentErrors.cardNumber} touched={touched.cardNumber} maxLength={19} onBlur={() => setTouched((t) => ({ ...t, cardNumber: true }))} onChange={(value) => setPayment((p) => ({ ...p, cardNumber: value.replace(/[^0-9\s]/g, "") }))} wide inputMode="numeric" />
                    <Field label="Expiry Date" placeholder="MM/YY" value={payment.expiry} error={paymentErrors.expiry} touched={touched.expiry} maxLength={5} onBlur={() => setTouched((t) => ({ ...t, expiry: true }))} onChange={(value) => setPayment((p) => ({ ...p, expiry: value }))} />
                    <Field label="CVV" value={payment.cvv} error={paymentErrors.cvv} touched={touched.cvv} maxLength={4} onBlur={() => setTouched((t) => ({ ...t, cvv: true }))} onChange={(value) => setPayment((p) => ({ ...p, cvv: value.replace(/\D/g, "") }))} inputMode="numeric" />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <PackageCheck className="h-5 w-5" strokeWidth={1.5} />
                    <h2 className="text-sm font-semibold uppercase tracking-wider">Order summary</h2>
                  </div>
                  <ul className="divide-y divide-border">
                    {cartItems.map(({ line, product }) => product && (
                      <li key={`${line.productId}-${line.size}`} className="flex items-center gap-4 py-4">
                        <img src={product.image} alt={product.name} className="h-20 w-14 object-cover" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{product.name}</p>
                          <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">Size {line.size} · Qty {line.qty}</p>
                        </div>
                        <p className="text-sm font-semibold tabular-nums">${product.price * line.qty}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
                <button type="button" onClick={() => setStep((s) => Math.max(s - 1, 0))} disabled={step === 0 || processing} className="border border-border px-5 py-3 text-xs font-semibold uppercase tracking-wider text-foreground hover:bg-muted disabled:opacity-30">Back</button>
                {step < 2 ? (
                  <button type="button" onClick={nextStep} className="bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground hover:bg-foreground/90">Continue</button>
                ) : (
                  <button type="button" onClick={payNow} disabled={processing || lines.length === 0} className="bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground hover:bg-foreground/90 disabled:opacity-40">
                    {processing ? "Processing Payment..." : `Pay Now · $${total}`}
                  </button>
                )}
              </div>
            </div>
          </section>

          <aside className="h-fit border border-border p-5 lg:sticky lg:top-24">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">Bag total</h2>
            {lines.length === 0 ? (
              <div className="mt-6 text-sm text-muted-foreground">Your bag is empty.</div>
            ) : (
              <div className="mt-5 space-y-3 text-sm">
                <Row label="Subtotal" value={`$${subtotal}`} />
                <Row label="Shipping Charges" value={`$${SHIPPING_CHARGE}`} />
                <div className="border-t border-border pt-3">
                  <Row label="Net Total" value={`$${total}`} strong />
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

function Field(props: {
  label: string;
  value: string;
  error: string;
  touched?: boolean;
  placeholder?: string;
  wide?: boolean;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  onChange: (value: string) => void;
  onBlur: () => void;
}) {
  const showError = props.touched && props.error;
  return (
    <label className={`block ${props.wide ? "sm:col-span-2" : ""}`}>
      <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground">{props.label}</span>
      <input
        value={props.value}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        inputMode={props.inputMode}
        onBlur={props.onBlur}
        onChange={(e) => props.onChange(e.target.value)}
        aria-invalid={!!showError}
        className={`mt-2 h-11 w-full border bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-ring ${showError ? "border-destructive" : "border-border focus:border-foreground"}`}
      />
      {showError && <span className="mt-1 block text-xs font-medium text-destructive">{props.error}</span>}
    </label>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${strong ? "text-base font-semibold" : "text-sm"}`}>
      <span className="text-muted-foreground">{label}</span>
      <span className="tabular-nums text-foreground">{value}</span>
    </div>
  );
}

function CheckoutSuccess({ order }: { order: Order }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-12 pb-24 text-center md:px-8 md:pb-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-foreground">
          <Check className="h-7 w-7" strokeWidth={1.5} />
        </div>
        <h1 className="font-serif-display mt-6 text-4xl font-bold tracking-wide text-foreground">Payment Successful!</h1>
        <p className="mt-3 text-sm text-muted-foreground">Order ID: {order.id}</p>
        <div className="mt-8 border border-border p-6 text-left">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">Status: {order.status}</span>
            <Truck className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <div className="mt-5 h-1.5 bg-muted">
            <div className="h-full w-2/3 bg-primary" />
          </div>
          <div className="mt-3 flex justify-between text-[11px] uppercase tracking-wider text-muted-foreground">
            <span>Pending</span>
            <span>On the way</span>
            <span>Delivered</span>
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/account" className="border border-foreground px-6 py-3 text-xs font-semibold uppercase tracking-wider text-foreground hover:bg-foreground hover:text-background">My Orders</Link>
          <Link to="/plp" search={{ category: "women" }} className="bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground hover:bg-foreground/90">Continue Shopping</Link>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
