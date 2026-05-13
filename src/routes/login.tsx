import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { useAuth } from "@/store/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login | ZARA" },
      { name: "description", content: "Log in to your temporary ZARA prototype account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate({ to: "/account" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to log in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-4 py-4 pb-20 md:grid-cols-[1fr_400px] md:gap-8 md:px-8 md:py-6 md:pb-6">
        <section className="relative hidden overflow-hidden bg-muted md:block">
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80" alt="ZARA editorial fashion model" className="absolute inset-0 h-full w-full object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-foreground/25" />
          <div className="absolute bottom-6 left-6 text-background">
            <p className="text-xs font-semibold uppercase tracking-[0.3em]">ZARA account</p>
            <h1 className="font-serif-display mt-2 text-4xl font-bold tracking-wide">Welcome back.</h1>
          </div>
        </section>

        <section className="flex flex-col justify-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">Refresh-only demo login</p>
          <h1 className="font-serif-display mt-2 text-3xl font-bold tracking-wide text-foreground">Log in</h1>
          <p className="mt-2 text-xs text-muted-foreground">Use an email and password signed up in this open page. Refreshing clears demo accounts.</p>

          <form onSubmit={submit} className="mt-5 space-y-3" noValidate>
            <AuthField icon={Mail} label="Email" type="email" value={email} onChange={setEmail} placeholder="1323@gmail.com" />
            <AuthField icon={Lock} label="Password" type="password" value={password} onChange={setPassword} placeholder="Your temporary password" />
            {error && <p role="alert" className="border border-destructive px-3 py-2 text-xs font-medium text-destructive">{error}</p>}
            <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground hover:bg-foreground/90 disabled:opacity-50">
              {loading ? "Checking..." : "Log in"}
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </form>

          <p className="mt-4 text-xs text-muted-foreground">
            Not signed up yet?{" "}
            <Link to="/signup" className="font-medium text-foreground underline-offset-4 hover:underline">Create an account first</Link>
          </p>
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
