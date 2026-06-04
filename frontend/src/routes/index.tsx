import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, BarChart3, Bot, Calculator, ShieldCheck, Sparkles, TrendingUp, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/site-nav";
import {getLandingInsight, getMonthlyTrend,} from "@/lib/api/dashboard";
import { useQuery } from "@tanstack/react-query";
import { getPublicStats } from "@/lib/api/dashboard";
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


function Landing() {
const lenderId = 4;
const { data: publicStats } =
  useQuery({
    queryKey: [
      "public-stats",
      lenderId,
    ],

    queryFn: () =>
      getPublicStats(
        lenderId
      ),
  });
  console.log("Public Stats:", publicStats);
  const { data: insight } =
  useQuery({
    queryKey: [
      "landing-insight",
    ],

    queryFn:
      getLandingInsight,
  });
  const { data: monthlyTrend = [] } =
  useQuery({
    queryKey: [
      "monthly-trend",
      lenderId,
    ],

    queryFn: () =>
      getMonthlyTrend(
        lenderId
      ),
  });
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
  Manage Borrowers,
  Loans & Repayments
  <br />
  <span className="text-gradient">
    with AI-Powered Intelligence.
  </span>
</h1>

            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
  Track loans, automate interest calculations,
  monitor repayments, generate reminders,
  and identify risky borrowers before they default.
</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
 <Button
  asChild
  size="lg"
  className="bg-gradient-to-r from-primary to-accent text-primary-foreground glow hover:opacity-90"
>
  <Link to="/dashboard">
    Open Dashboard
    <ArrowRight className="ml-1.5 h-4 w-4" />
  </Link>
</Button>
              <Button asChild size="lg" variant="outline" className="border-border/80 bg-card/40 backdrop-blur">
                <Link to="/calculator"><Calculator className="mr-1.5 h-4 w-4" /> AI Calculator</Link>
              </Button>
            </div>
          </motion.div>
<div className="mt-12 flex flex-wrap justify-center gap-3 text-sm">
  {[
    "Loan Management",
    "Borrower CRM",
    "AI Insights",
    "Risk Detection",
    "Repayment Tracking",
    "Analytics",
    "Reminder System",
  ].map((item) => (
    <div
      key={item}
      className="rounded-full border border-border/60 bg-card/40 px-4 py-2 backdrop-blur"
    >
      ✓ {item}
    </div>
  ))}
</div>
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
                 {[
  {
    v: publicStats
      ? `${publicStats.borrowers}`
      : "0",

    l: "Borrowers",
  },

  {
    v: publicStats
      ? `${publicStats.loans}`
      : "0",

    l: "Loans",
  },

  {
    v: publicStats
      ? `₹${Number(
          publicStats.portfolio
        ).toLocaleString()}`
      : "₹0",

    l: "Portfolio Value",
  },

  {
    v: publicStats
      ? `₹${Number(
          publicStats.recovered
        ).toLocaleString()}`
      : "₹0",

    l: "Recovered",
  },
].map((s) => (
  <div
    key={s.l}
    className="rounded-2xl border border-border/60 bg-card/60 p-4"
  >
    <div className="font-display text-2xl font-semibold text-gradient">
      {s.v}
    </div>

    <div className="mt-1 text-xs text-muted-foreground">
      {s.l}
    </div>
  </div>
))}
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-border/60 bg-card/60 p-5 md:col-span-2">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="text-sm text-muted-foreground"> Monthly Interest Trend</div>
                     <div className="text-xs text-primary">
  Live Data
</div>
                    </div>
                    <div className="flex h-32 items-end gap-2">
  {monthlyTrend.map(
    (item: any, i: number) => {
      const height =
        item.profit > 0
          ? Math.max(
              item.profit / 1000,
              10
            )
          : 5;

      return (
        <motion.div
          key={item.m}
          initial={{
            height: 0,
          }}
          animate={{
            height: `${Math.min(
              height,
              100
            )}%`,
          }}
          transition={{
            duration: 0.8,
            delay: 0.3 + i * 0.04,
          }}
          className="flex-1 rounded-md bg-gradient-to-t from-primary/30 to-primary"
        />
      );
    }
  )}
</div>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-accent/10 to-primary/10 p-5">
                   <Bot className="h-5 w-5 text-primary" />

<div className="mt-3 font-display text-sm font-semibold">
  AI Insight
</div>

<p className="mt-1 text-xs text-muted-foreground">
  {insight?.message ||
    "Loading AI insight..."}
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
  <div className="container mx-auto max-w-7xl px-6">

    <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">

      <div className="text-muted-foreground">
        © {new Date().getFullYear()} CreditFlow AI — Built for modern lenders.
      </div>

      <div className="text-muted-foreground">
        Developed by{" "}
        <span className="font-semibold text-foreground">
          Manoranjan Kumar
        </span>
      </div>

      <a
        href="mailto:manoranjank6203@gmail.com"
        className="font-medium text-primary hover:underline"
      >
        Contact Developer
      </a>

    </div>

  </div>
</footer>
    </div>
  );
}
