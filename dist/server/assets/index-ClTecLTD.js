import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, Calculator, Bot, Users, TrendingUp, BarChart3, ShieldCheck, Zap } from "lucide-react";
import { B as Button } from "./button-BC9oXVxV.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
function SiteNav() {
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-40 w-full border-b border-border/40 backdrop-blur-xl bg-background/60", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex h-16 max-w-7xl items-center justify-between px-6", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("div", { className: "grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent glow", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxs("span", { className: "font-display text-lg font-semibold tracking-tight", children: [
        "CreditFlow",
        /* @__PURE__ */ jsx("span", { className: "text-primary", children: " AI" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("nav", { className: "hidden items-center gap-8 text-sm text-muted-foreground md:flex", children: [
      /* @__PURE__ */ jsx("a", { href: "#features", className: "hover:text-foreground transition", children: "Features" }),
      /* @__PURE__ */ jsx("a", { href: "#how", className: "hover:text-foreground transition", children: "How it works" }),
      /* @__PURE__ */ jsx(Link, { to: "/calculator", className: "hover:text-foreground transition", children: "Calculator" }),
      /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "hover:text-foreground transition", children: "Dashboard" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsx(Link, { to: "/dashboard", children: "Sign in" }) }),
      /* @__PURE__ */ jsx(Button, { asChild: true, size: "sm", className: "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90", children: /* @__PURE__ */ jsx(Link, { to: "/dashboard", children: "Start lending" }) })
    ] })
  ] }) });
}
const features = [{
  icon: Users,
  title: "Borrower CRM",
  desc: "Onboard borrowers, store KYC, notes and full repayment history in one place."
}, {
  icon: TrendingUp,
  title: "Smart Interest Engine",
  desc: "Simple, compound, daily or monthly — recalculated automatically on every change."
}, {
  icon: Bot,
  title: "AI Financial Assistant",
  desc: "Ask plain‑English questions about profit, overdue accounts, and risk in seconds."
}, {
  icon: BarChart3,
  title: "Live Analytics",
  desc: "Monthly earnings, recovery rate, overdue exposure — visualised beautifully."
}, {
  icon: ShieldCheck,
  title: "Role‑based Security",
  desc: "Borrowers see only their account. Encrypted storage, OTP login, activity logs."
}, {
  icon: Zap,
  title: "Auto Reminders",
  desc: "Email, SMS and WhatsApp nudges before EMIs go overdue. No more manual chasing."
}];
const stats = [{
  v: "₹42 Cr+",
  l: "Loans tracked"
}, {
  v: "18,400",
  l: "Active borrowers"
}, {
  v: "99.2%",
  l: "Recovery accuracy"
}, {
  v: "<200ms",
  l: "AI response"
}];
function Landing() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx(SiteNav, {}),
    /* @__PURE__ */ jsx("section", { className: "relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-7xl px-6 pt-20 pb-28 md:pt-28 md:pb-36", children: [
      /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.6
      }, className: "mx-auto max-w-3xl text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "mx-auto inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5 text-primary" }),
          "AI‑powered fintech for modern lenders"
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl", children: [
          "Smart loan & interest ",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-gradient", children: "management, on autopilot." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg", children: "Track loans, automate simple & compound interest, monitor repayments, and let AI surface risky borrowers before they default." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-9 flex flex-wrap items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "bg-gradient-to-r from-primary to-accent text-primary-foreground glow hover:opacity-90", children: /* @__PURE__ */ jsxs(Link, { to: "/dashboard", children: [
            "Start lending ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-1.5 h-4 w-4" })
          ] }) }),
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", variant: "outline", className: "border-border/80 bg-card/40 backdrop-blur", children: /* @__PURE__ */ jsxs(Link, { to: "/calculator", children: [
            /* @__PURE__ */ jsx(Calculator, { className: "mr-1.5 h-4 w-4" }),
            " AI Calculator"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 40
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.8,
        delay: 0.2
      }, className: "relative mx-auto mt-16 max-w-5xl", children: [
        /* @__PURE__ */ jsx("div", { className: "glass rounded-3xl p-3 shadow-[0_30px_80px_-30px_oklch(0.05_0.02_240/0.9)]", children: /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-background/80 p-6", children: [
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 md:grid-cols-4", children: stats.map((s) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border/60 bg-card/60 p-4", children: [
            /* @__PURE__ */ jsx("div", { className: "font-display text-2xl font-semibold text-gradient", children: s.v }),
            /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: s.l })
          ] }, s.l)) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 grid gap-4 md:grid-cols-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border/60 bg-card/60 p-5 md:col-span-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "Monthly earnings" }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-primary", children: "+18.4%" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex h-32 items-end gap-2", children: [40, 55, 38, 62, 70, 58, 82, 75, 90, 86, 95, 110].map((h, i) => /* @__PURE__ */ jsx(motion.div, { initial: {
                height: 0
              }, animate: {
                height: `${h}%`
              }, transition: {
                duration: 0.8,
                delay: 0.3 + i * 0.04
              }, className: "flex-1 rounded-md bg-gradient-to-t from-primary/30 to-primary" }, i)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border/60 bg-gradient-to-br from-accent/10 to-primary/10 p-5", children: [
              /* @__PURE__ */ jsx(Bot, { className: "h-5 w-5 text-primary" }),
              /* @__PURE__ */ jsx("div", { className: "mt-3 font-display text-sm font-semibold", children: "AI insight" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "3 borrowers likely to delay this month. Suggested action: send a reminder to BR‑1043." })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -inset-x-20 -bottom-10 -top-10 -z-10 bg-[radial-gradient(ellipse_at_center,oklch(0.65_0.20_265/0.25),transparent_60%)]" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { id: "features", className: "container mx-auto max-w-7xl px-6 pb-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-12 max-w-2xl", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-widest text-primary", children: "Everything you need" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-3 font-display text-3xl font-semibold md:text-4xl", children: "A complete lending operations suite." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-3", children: features.map((f, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true,
        margin: "-50px"
      }, transition: {
        duration: 0.4,
        delay: i * 0.05
      }, className: "group rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur transition hover:border-primary/40 hover:bg-card", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary group-hover:from-primary/30 group-hover:to-accent/30", children: /* @__PURE__ */ jsx(f.icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("h3", { className: "mt-4 font-display text-lg font-semibold", children: f.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-sm text-muted-foreground", children: f.desc })
      ] }, f.title)) })
    ] }),
    /* @__PURE__ */ jsx("section", { id: "how", className: "container mx-auto max-w-7xl px-6 pb-28", children: /* @__PURE__ */ jsx("div", { className: "glass rounded-3xl p-10 md:p-14", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-10 md:grid-cols-2 md:items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-widest text-primary", children: "How it works" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-3 font-display text-3xl font-semibold md:text-4xl", children: "From handshake to repaid — automated." }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground", children: "Add a borrower, set the interest type & rate, and CreditFlow tracks every rupee. AI compounds, calculates penalties, and predicts risk so you can focus on growth." }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 flex gap-3", children: /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-gradient-to-r from-primary to-accent text-primary-foreground glow hover:opacity-90", children: /* @__PURE__ */ jsxs(Link, { to: "/dashboard", children: [
          "Open dashboard ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "ml-1.5 h-4 w-4" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsx("ol", { className: "space-y-4", children: ["Add borrower & loan amount with interest type", "Engine tracks time, interest & penalties automatically", "AI assistant surfaces overdue, risky & top accounts", "Send reminders, collect payments, see profit grow"].map((step, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-4 rounded-2xl border border-border/60 bg-card/60 p-4", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent font-display text-sm font-semibold text-primary-foreground", children: i + 1 }),
        /* @__PURE__ */ jsx("div", { className: "pt-1.5 text-sm", children: step })
      ] }, step)) })
    ] }) }) }),
    /* @__PURE__ */ jsx("footer", { className: "border-t border-border/40 py-10", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " CreditFlow AI — Built for modern lenders."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-5", children: [
        /* @__PURE__ */ jsx("a", { href: "#features", className: "hover:text-foreground", children: "Features" }),
        /* @__PURE__ */ jsx(Link, { to: "/calculator", className: "hover:text-foreground", children: "Calculator" }),
        /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "hover:text-foreground", children: "Dashboard" })
      ] })
    ] }) })
  ] });
}
export {
  Landing as component
};
