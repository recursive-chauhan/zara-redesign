import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Mail, Phone, Sparkles, User } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { useAuth } from "@/store/auth";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up | ZARA" },
      { name: "description", content: "Create a temporary ZARA prototype account." },
    ],
  }),
  component: SignupPage,
});

const preferences = ["Minimal tailoring", "Eveningwear", "Streetwear", "Kids essentials"];

function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: "",
    phone: "",
    stylePreference: preferences[0],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(form);
      navigate({ to: "/account" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign up.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-4 py-4 pb-20 md:grid-cols-[400px_1fr] md:gap-8 md:px-8 md:py-6 md:pb-6">
        <section className="flex flex-col justify-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">Refresh-only demo account</p>
          <h1 className="font-serif-display mt-2 text-3xl font-bold tracking-wide text-foreground">Sign up</h1>
          <p className="mt-2 text-xs text-muted-foreground">Create a demo account for this open page only. Refreshing clears it.</p>

          <form onSubmit={submit} className="mt-4 space-y-3" noValidate>
            <AuthField icon={User} label="Display Name" type="text" value={form.displayName} onChange={(value) => setForm((f) => ({ ...f, displayName: value }))} placeholder="Your name" />
            <AuthField icon={Mail} label="Email" type="email" value={form.email} onChange={(value) => setForm((f) => ({ ...f, email: value }))} placeholder="1323@gmail.com" />
            <AuthField icon={Sparkles} label="Password" type="password" value={form.password} onChange={(value) => setForm((f) => ({ ...f, password: value }))} placeholder="Any temporary password" />
            <AuthField icon={Phone} label="Phone" type="tel" value={form.phone} onChange={(value) => setForm((f) => ({ ...f, phone: value }))} placeholder="Optional phone" />

            <label className="block">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground">Style Preference</span>
              <select value={form.stylePreference} onChange={(e) => setForm((f) => ({ ...f, stylePreference: e.target.value }))} className="mt-1 h-10 w-full border border-border bg-background px-3 text-xs text-foreground outline-none focus:border-foreground focus:ring-2 focus:ring-ring">
                {preferences.map((preference) => <option key={preference}>{preference}</option>)}
              </select>
            </label>

            {error && <p role="alert" className="border border-destructive px-3 py-2 text-xs font-medium text-destructive">{error}</p>}
            <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground hover:bg-foreground/90 disabled:opacity-50">
              {loading ? "Creating..." : "Create account"}
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </form>

          <p className="mt-3 text-xs text-muted-foreground">
            Already signed up?{" "}
            <Link to="/login" className="font-medium text-foreground underline-offset-4 hover:underline">Log in</Link>
          </p>
        </section>

        <section className="relative hidden overflow-hidden bg-muted md:block">
          <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=80" alt="ZARA black and white editorial coat" className="absolute inset-0 h-full w-full object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-foreground/25" />
          <div className="absolute bottom-6 left-6 max-w-lg text-background">
            <p className="text-xs font-semibold uppercase tracking-[0.3em]">Profile details</p>
            <h2 className="font-serif-display mt-2 text-4xl font-bold tracking-wide">Your edit, saved.</h2>
          </div>
        </section>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

function AuthField(props: { icon: typeof Mail; label: string; type: string; value: string; placeholder: string; onChange: (value: string) => void }) {
  const Icon = props.icon;
  return (
    <label className="block">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground">{props.label}</span>
      <div className="mt-1 flex h-10 items-center border border-border bg-background px-3 focus-within:border-foreground focus-within:ring-2 focus-within:ring-ring">
        <Icon className="mr-2 h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
        <input type={props.type} value={props.value} placeholder={props.placeholder} onChange={(e) => props.onChange(e.target.value.slice(0, 120))} className="h-full flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground" />
      </div>
    </label>
  );
}
