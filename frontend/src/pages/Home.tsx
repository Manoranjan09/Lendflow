
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, BarChart3, Bot, Calculator, ShieldCheck, Sparkles, TrendingUp, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/site-nav";
import {getLandingInsight, getMonthlyTrend,} from "@/lib/api/dashboard";
import { useQuery } from "@tanstack/react-query";
import { getPublicStats } from "@/lib/api/dashboard";
import { useState, useEffect} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


const features = [
  {
    icon: Users,
    title: "Borrower CRM",
    desc: "Onboard borrowers, store KYC, notes and repayment history.",
    badge: "Core",
  },
  {
    icon: TrendingUp,
    title: "Smart Interest Engine",
    desc: "Automatic simple and compound interest calculations.",
    badge: "Popular",
  },
  {
    icon: Bot,
    title: "AI Financial Assistant",
    desc: "Get instant portfolio insights and risk analysis.",
    badge: "AI",
  },
  {
    icon: BarChart3,
    title: "Live Analytics",
    desc: "Monitor lending performance in real time.",
    badge: "Live",
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Security",
    desc: "Secure borrower data and access control.",
    badge: "Secure",
  },
  {
    icon: Zap,
    title: "Auto Reminders",
    desc: "Send repayment reminders automatically.",
    badge: "Automation",
  },
];

export default function Home() {
const [lenderId, setLenderId] =
  useState<number | undefined>();

useEffect(() => {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  setLenderId(
    user?.dbUser?.id
  );
}, []);
const { data: publicStats } =
  useQuery({
    queryKey: [
      "public-stats",
      lenderId,
    ],

    enabled: !!lenderId,

    queryFn: () =>
  getPublicStats(
    lenderId!
  ),
  });
  console.log("Public Stats:", publicStats);
 const { data: insight } =
  useQuery({
    queryKey: [
      "landing-insight",
      lenderId,
    ],

    enabled: !!lenderId,

    queryFn: () =>
  getLandingInsight(
    lenderId!
  ),
  });
  const [guideOpen, setGuideOpen] =
  useState(false);
  const [aboutOpen, setAboutOpen] =
  useState(false);
 const { data: monthlyTrend = [] } =
  useQuery({
    queryKey: [
      "monthly-trend",
      lenderId,
    ],

    enabled: !!lenderId,

    queryFn: () =>
  getMonthlyTrend(
    lenderId!
  ),
  });
  return (
     <>
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
      const maxProfit = Math.max(
  ...monthlyTrend.map(
    (x: any) => x.profit
  ),
  1
);

const height =
  item.profit > 0
    ? Math.max(
        (item.profit / maxProfit) * 100,
        15
      )
    : 5;

     return (
  <div
  key={item.m}
  className="flex flex-1 flex-col items-center justify-end h-full"
>
    <motion.div
      initial={{ height: 0 }}
      animate={{
        height: `${height}%`,
      }}
      transition={{
        duration: 0.8,
        delay: 0.3 + i * 0.04,
      }}
    className="w-full rounded-md bg-gradient-to-t from-primary/30 to-primary min-h-[8px]"
    />

    <div className="mt-2 text-[10px] text-muted-foreground">
      {item.m}
    </div>
  </div>
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
             <div className="mt-4 flex items-center justify-between">
  <h3 className="font-display text-lg font-semibold">
    {f.title}
  </h3>

  <span className="rounded-full border border-primary/30 px-2 py-1 text-[10px] text-primary">
    {f.badge}
  </span>
</div>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
<section className="container mx-auto max-w-7xl px-6 pb-24">
  <div className="mb-12 text-center">
    <div className="text-xs uppercase tracking-widest text-primary">
      Why CreditFlow AI
    </div>

    <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
      Built specifically for lenders.
    </h2>

    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
      Traditional spreadsheets can't track risk, overdue loans,
      borrower history and portfolio growth efficiently.
      CreditFlow AI does it automatically.
    </p>
  </div>

  <div className="grid gap-6 md:grid-cols-4">
    <div className="rounded-3xl border border-border/60 bg-card/60 p-6">
      <div className="text-3xl font-bold text-primary">
        100%
      </div>

      <div className="mt-2 text-sm text-muted-foreground">
        Automated interest calculations
      </div>
    </div>

    <div className="rounded-3xl border border-border/60 bg-card/60 p-6">
      <div className="text-3xl font-bold text-primary">
        AI
      </div>

      <div className="mt-2 text-sm text-muted-foreground">
        Portfolio risk detection
      </div>
    </div>

    <div className="rounded-3xl border border-border/60 bg-card/60 p-6">
      <div className="text-3xl font-bold text-primary">
        Live
      </div>

      <div className="mt-2 text-sm text-muted-foreground">
        Analytics & borrower tracking
      </div>
    </div>

    <div className="rounded-3xl border border-border/60 bg-card/60 p-6">
      <div className="text-3xl font-bold text-primary">
        Smart
      </div>

      <div className="mt-2 text-sm text-muted-foreground">
        Reminders & recovery actions
      </div>
    </div>
  </div>
</section>
      {/* How it works */}
      <section id="how" className="container mx-auto max-w-7xl px-6 pb-28">
        <div className="glass rounded-3xl p-10 md:p-14">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="text-xs uppercase tracking-widest text-primary">How it works</div>
              <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">From borrower onboarding
to loan recovery — automated.</h2>
              <p className="mt-4 text-muted-foreground">
               Manage the entire lending lifecycle from borrower onboarding and loan issuance to repayment tracking, risk monitoring and portfolio reporting — all from a single dashboard.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs">
  {[
    "Borrower",
    "Loan",
    "Interest",
    "Repayment",
    "AI Analysis",
    "Report"
  ].map((item) => (
    <span
      key={item}
      className="rounded-full border border-border/60 px-3 py-1"
    >
      {item}
    </span>
  ))}
</div>

             <div className="mt-6 flex flex-wrap gap-3">
  <Button
    asChild
    className="bg-gradient-to-r from-primary to-accent text-primary-foreground glow hover:opacity-90"
  >
    <Link to="/dashboard">
      Open Dashboard
      <ArrowRight className="ml-1.5 h-4 w-4" />
    </Link>
  </Button>

<Button
  asChild
  variant="outline"
  className="border-primary/20 hover:border-primary/40"
>
  <Link to="/user-guide">
    📘 User Guide
  </Link>
</Button>
</div>
            </div>
            <ol className="space-y-4">
              {[
                "Create borrower profile and upload KYC documents",
                "Issue loans with simple or compound interest rules",
                "Track repayments, overdue accounts and portfolio health",
                "Generate AI insights, reports and recovery actions",
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

      <div className="flex gap-2">

        <Button
          variant="outline"
          size="sm"
          onClick={() => setAboutOpen(true)}
        >
          🚀 About & Roadmap
        </Button>

        <a
          href="mailto:manoranjank6203@gmail.com"
          className="font-medium text-primary hover:underline flex items-center"
        >
          Contact Developer
        </a>

      </div>

    </div>

  </div>
</footer>

</div>

{/* USER GUIDE */}
<Dialog
  open={guideOpen}
  onOpenChange={setGuideOpen}
>
  <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">

    <DialogHeader>
      <DialogTitle>
        📘 CreditFlow Complete User Guide (English + हिंदी)
      </DialogTitle>
    </DialogHeader>

    <div className="space-y-6 text-sm">
     <div className="space-y-6 text-sm leading-7">

  <div>
    <h3 className="font-semibold text-primary">
      📘 1. Getting Started
    </h3>

    <p>
      After login, create borrowers and issue loans.
    </p>

    <p>
      Login करने के बाद Borrowers जोड़ें और Loans बनाएं।
    </p>
  </div>

  <div>
    <h3 className="font-semibold text-primary">
      👥 2. Borrower Management
    </h3>

    <ul className="ml-6 list-disc">
      <li>Add borrower details</li>
      <li>Phone number</li>
      <li>Address</li>
      <li>Borrowing history</li>
    </ul>

    <p>
      Borrower वह व्यक्ति है जिसे Loan दिया जाता है।
    </p>
  </div>

  <div>
    <h3 className="font-semibold text-primary">
      💰 3. Loan Management
    </h3>

    <ul className="ml-6 list-disc">
      <li>Principal Amount</li>
      <li>Interest Rate</li>
      <li>Interest Type</li>
      <li>Due Date</li>
    </ul>
  </div>

  <div>
    <h3 className="font-semibold text-primary">
      📅 4. Repayment Tracking
    </h3>

    <p>
      Record repayments and monitor outstanding balances.
    </p>
  </div>

  <div>
    <h3 className="font-semibold text-primary">
      📊 5. Analytics Dashboard
    </h3>

    <ul className="ml-6 list-disc">
      <li>Total Lent</li>
      <li>Total Collected</li>
      <li>Outstanding Balance</li>
      <li>Overdue Loans</li>
    </ul>
  </div>

  <div>
    <h3 className="font-semibold text-primary">
      🤖 6. AI Portfolio Analyst
    </h3>

    <p>
      Ask questions like:
    </p>

    <ul className="ml-6 list-disc">
      <li>Give me portfolio summary</li>
      <li>Which borrowers are overdue?</li>
      <li>How much have I collected?</li>
    </ul>
  </div>

  <div>
    <h3 className="font-semibold text-primary">
      📄 7. Reports
    </h3>

    <p>
      Export PDF and Excel reports.
    </p>
  </div>

</div>
    </div>

  </DialogContent>
</Dialog>

{/* ABOUT & ROADMAP */}
<Dialog
  open={aboutOpen}
  onOpenChange={setAboutOpen}
>
  <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">

    <DialogHeader>
      <DialogTitle>
        🚀 About CreditFlow AI
      </DialogTitle>
    </DialogHeader>

   <div className="space-y-6 text-sm leading-7">

  <div>
    <h3 className="font-semibold text-primary">
      🚀 What is CreditFlow AI?
    </h3>

    <p>
      CreditFlow AI is an AI-powered Loan &
      Interest Management Platform for lenders,
      financial advisors and microfinance businesses.
    </p>
  </div>

  <div>
    <h3 className="font-semibold text-primary">
      🎯 Mission
    </h3>

    <p>
      Simplify lending operations using automation,
      analytics and AI.
    </p>
  </div>

  <div>
    <h3 className="font-semibold text-primary">
      ✅ Current Features
    </h3>

    <ul className="ml-6 list-disc">
      <li>Borrower Management</li>
      <li>Loan Management</li>
      <li>Repayment Tracking</li>
      <li>Analytics Dashboard</li>
      <li>AI Portfolio Assistant</li>
      <li>PDF Reports</li>
      <li>Excel Export</li>
    </ul>
  </div>

  <div>
    <h3 className="font-semibold text-primary">
      🏆 Roadmap
    </h3>

    <ul className="ml-6 list-disc">
      <li>WhatsApp Reminders</li>
      <li>SMS Notifications</li>
      <li>Email Reports</li>
      <li>Credit Risk Scoring</li>
      <li>EMI Management</li>
      <li>Mobile App</li>
    </ul>
  </div>

 <div>
  <h3 className="font-semibold text-primary">
    👨‍💻 Developer
  </h3>

  <p>
    Manoranjan Kumar
    <br />
    BE Computer Science Engineering
    <br />
    Generative AI | FastAPI | React | LangChain | RAG
  </p>
</div>

</div>

  </DialogContent>
</Dialog>

  </>
);
}
