import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Music2, Youtube, Mail, MapPin, Phone, ChevronRight } from "lucide-react";

export function Footer() {
  const cols = [
    {
      title: "Support",
      links: ["Help", "Customer service", "Order tracking", "Shipping information", "Returns & exchanges", "Size guide"],
    },
    {
      title: "FAQs",
      links: ["FAQs", "Payments", "Gift cards", "Account help", "Product care", "Store pickup"],
    },
    {
      title: "Company",
      links: ["About us", "Sustainability", "Stores", "Careers", "Press"],
    },
    {
      title: "Legal",
      links: ["Privacy policy", "Terms of use", "Cookie settings", "Accessibility"],
    },
  ];

  const socials = [
    { label: "Instagram", icon: Instagram },
    { label: "TikTok", icon: Music2 },
    { label: "YouTube", icon: Youtube },
    { label: "Facebook", icon: Facebook },
  ];

  const contacts = [
    { label: "support@zara-concept.com", icon: Mail },
    { label: "+34 900 000 000", icon: Phone },
    { label: "Find a store near you", icon: MapPin },
  ];

  return (
    <footer className="mt-24 border-t border-border bg-background pb-24 scroll-reveal-up md:pb-12">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-14 md:grid-cols-[1.2fr_repeat(4,1fr)] md:px-8 md:py-16">
        <div className="stagger-list">
          <p className="font-serif-display text-3xl font-bold tracking-[0.18em]">ZARA</p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
            Premium fashion, redesigned around fast discovery, clearer support, and confident checkout.
          </p>
          <div className="mt-7 flex items-center gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="group flex h-10 w-10 items-center justify-center border border-border text-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-foreground hover:text-background"
              >
                <social.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.6} />
              </a>
            ))}
          </div>
          <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
            {contacts.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <item.icon className="h-4 w-4 text-foreground" strokeWidth={1.5} />
                <a href="#" className="story-link hover:text-foreground">{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {cols.map((c) => (
          <div key={c.title} className="scroll-reveal-up">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground">
              {c.title}
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {c.links.map((l) => (
                <li key={l}>
                  <Link to={l === "FAQs" ? "/faqs" : l === "Help" || l === "Customer service" ? "/help" : "/"} className="group inline-flex items-center gap-2 transition-colors hover:text-foreground">
                    <ChevronRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" strokeWidth={1.5} />
                    <span className="story-link">{l}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-5 border-t border-border px-4 py-8 md:grid-cols-[1fr_auto] md:items-center md:px-8">
        <form className="flex max-w-xl flex-col gap-2 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="footer-email" className="sr-only">Email address</label>
          <input
            id="footer-email"
            type="email"
            placeholder="Email for support updates"
            className="flex-1 border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
          />
          <button className="bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/90" type="submit">
            Join
          </button>
        </form>
        <div className="text-xs leading-6 text-muted-foreground md:text-right">
          <p>© {new Date().getFullYear()} ZARA Redesign Concept. ALL RIGHT RESERVE : MUHAMMAD HASSAN.</p>
          <p>A UX prototype — not affiliated with Industria de Diseño Textil, S.A.</p>
        </div>
      </div>
    </footer>
  );
}