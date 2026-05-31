import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, BarChart3, Bot, Calculator, ShieldCheck, Sparkles, TrendingUp, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/site-nav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CreditFlow AI — Smart Loan & Interest Management Platform" },
      { name: "description", content: "Track loans, automate interest, monitor repayments, and manage borrowers intelligently with AI." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Users, title: "Borrower CRM", desc: "Onboard borrowers, store KYC, notes and full repayment history in one place." },
  { icon: TrendingUp, title: "Smart Interest Engine", desc: "Simple, compound, daily or monthly — recalculated automatically on every change." },
  { icon: Bot, title: "AI Financial Assistant", desc: "Ask plain‑English questions about profit, overdue accounts, and risk in seconds." },
  { icon: BarChart3, title: "Live Analytics", desc: "Monthly earnings, recovery rate, overdue exposure — visualised beautifully." },
  { icon: ShieldCheck, title: "Role‑based Security", desc: "Borrowers see only their account. Encrypted storage, OTP login, activity logs." },
  { icon: Zap, title: "Auto Reminders", desc: "Email, SMS and WhatsApp nudges before EMIs go overdue. No more manual chasing." },
];

const stats = [
  { v: "₹42 Cr+", l: "Loans tracked" },
  { v: "18,400", l: "Active borrowers" },
  { v: "99.2%", l: "Recovery accuracy" },
  { v: "<200ms", l: "AI response" },
];

function Landing() {
  return (
    <div className="min-h-screen">
      <SiteNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6 pt-20 pb-28 md:pt-28 md:pb-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              AI‑powered fintech for modern lenders
            </div>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              Smart loan & interest <br />
              <span className="text-gradient">management, on autopilot.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
              Track loans, automate simple & compound interest, monitor repayments, and let AI surface risky borrowers before they default.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground glow hover:opacity-90">
                <Link to="/dashboard">
                  Start lending <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border/80 bg-card/40 backdrop-blur">
                <Link to="/calculator"><Calculator className="mr-1.5 h-4 w-4" /> AI Calculator</Link>
              </Button>
            </div>
          </motion.div>

          {/* Hero dashboard mock */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto mt-16 max-w-5xl"
          >
            <div className="glass rounded-3xl p-3 shadow-[0_30px_80px_-30px_oklch(0.05_0.02_240/0.9)]">
              <div className="rounded-2xl bg-background/80 p-6">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {stats.map((s) => (
                    <div key={s.l} className="rounded-2xl border border-border/60 bg-card/60 p-4">
                      <div className="font-display text-2xl font-semibold text-gradient">{s.v}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-border/60 bg-card/60 p-5 md:col-span-2">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">Monthly earnings</div>
                      <div className="text-xs text-primary">+18.4%</div>
                    </div>
                    <div className="flex h-32 items-end gap-2">
                      {[40, 55, 38, 62, 70, 58, 82, 75, 90, 86, 95, 110].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 0.8, delay: 0.3 + i * 0.04 }}
                          className="flex-1 rounded-md bg-gradient-to-t from-primary/30 to-primary"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-accent/10 to-primary/10 p-5">
                    <Bot className="h-5 w-5 text-primary" />
                    <div className="mt-3 font-display text-sm font-semibold">AI insight</div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      3 borrowers likely to delay this month. Suggested action: send a reminder to BR‑1043.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -inset-x-20 -bottom-10 -top-10 -z-10 bg-[radial-gradient(ellipse_at_center,oklch(0.65_0.20_265/0.25),transparent_60%)]" />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-12 max-w-2xl">
          <div className="text-xs uppercase tracking-widest text-primary">Everything you need</div>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">A complete lending operations suite.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur transition hover:border-primary/40 hover:bg-card"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary group-hover:from-primary/30 group-hover:to-accent/30">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="container mx-auto max-w-7xl px-6 pb-28">
        <div className="glass rounded-3xl p-10 md:p-14">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="text-xs uppercase tracking-widest text-primary">How it works</div>
              <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">From handshake to repaid — automated.</h2>
              <p className="mt-4 text-muted-foreground">
                Add a borrower, set the interest type & rate, and CreditFlow tracks every rupee. AI compounds, calculates penalties, and predicts risk so you can focus on growth.
              </p>
              <div className="mt-6 flex gap-3">
                <Button asChild className="bg-gradient-to-r from-primary to-accent text-primary-foreground glow hover:opacity-90">
                  <Link to="/dashboard">Open dashboard <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
            <ol className="space-y-4">
              {[
                "Add borrower & loan amount with interest type",
                "Engine tracks time, interest & penalties automatically",
                "AI assistant surfaces overdue, risky & top accounts",
                "Send reminders, collect payments, see profit grow",
              ].map((step, i) => (
                <li key={step} className="flex gap-4 rounded-2xl border border-border/60 bg-card/60 p-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent font-display text-sm font-semibold text-primary-foreground">
                    {i + 1}
                  </div>
                  <div className="pt-1.5 text-sm">{step}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 py-10">
        <div className="container mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} CreditFlow AI — Built for modern lenders.</div>
          <div className="flex gap-5">
            <a href="#features" className="hover:text-foreground">Features</a>
            <Link to="/calculator" className="hover:text-foreground">Calculator</Link>
            <Link to="/dashboard" className="hover:text-foreground">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
