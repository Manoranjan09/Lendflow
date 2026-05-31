import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Wallet, TrendingUp, IndianRupee, AlertTriangle, Plus, Bot, ArrowUpRight } from "lucide-react";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, BarChart, Bar } from "recharts";
import { b as borrowers, t as totalDue, f as fmtINR, s as statusColor } from "./loan-data-oILmSadN.js";
import { B as Button } from "./button-BC9oXVxV.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
const monthly = [{
  m: "Jan",
  profit: 42e3,
  lent: 18e4
}, {
  m: "Feb",
  profit: 51e3,
  lent: 22e4
}, {
  m: "Mar",
  profit: 48e3,
  lent: 2e5
}, {
  m: "Apr",
  profit: 63e3,
  lent: 26e4
}, {
  m: "May",
  profit: 71e3,
  lent: 29e4
}, {
  m: "Jun",
  profit: 82e3,
  lent: 34e4
}, {
  m: "Jul",
  profit: 78e3,
  lent: 32e4
}, {
  m: "Aug",
  profit: 91e3,
  lent: 36e4
}, {
  m: "Sep",
  profit: 102e3,
  lent: 41e4
}, {
  m: "Oct",
  profit: 96e3,
  lent: 39e4
}, {
  m: "Nov",
  profit: 118e3,
  lent: 46e4
}, {
  m: "Dec",
  profit: 134e3,
  lent: 51e4
}];
function Overview() {
  const totalLent = borrowers.reduce((s, b) => s + b.principal, 0);
  const recovered = borrowers.reduce((s, b) => s + b.paid, 0);
  const pending = borrowers.reduce((s, b) => s + Math.max(totalDue(b) - b.paid, 0), 0);
  const overdue = borrowers.filter((b) => b.status === "Overdue" || b.status === "High Risk").length;
  const kpis = [{
    l: "Total lent",
    v: fmtINR(totalLent),
    icon: Wallet,
    trend: "+12.4%"
  }, {
    l: "Recovered",
    v: fmtINR(recovered),
    icon: TrendingUp,
    trend: "+8.1%"
  }, {
    l: "Pending",
    v: fmtINR(pending),
    icon: IndianRupee,
    trend: "-3.2%"
  }, {
    l: "Overdue accounts",
    v: String(overdue),
    icon: AlertTriangle,
    trend: "Review"
  }];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl font-semibold tracking-tight", children: "Overview" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Snapshot of your lending portfolio." })
      ] }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-gradient-to-r from-primary to-accent text-primary-foreground glow hover:opacity-90", children: /* @__PURE__ */ jsxs(Link, { to: "/dashboard/borrowers", children: [
        /* @__PURE__ */ jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
        " Add borrower"
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: kpis.map((k, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      duration: 0.3,
      delay: i * 0.05
    }, className: "rounded-2xl border border-border/60 bg-card/70 p-5 backdrop-blur", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: k.l }),
        /* @__PURE__ */ jsx("div", { className: "grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 text-primary", children: /* @__PURE__ */ jsx(k.icon, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-3 font-display text-2xl font-semibold", children: k.v }),
      /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-primary", children: k.trend })
    ] }, k.l)) }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border/60 bg-card/70 p-5 backdrop-blur lg:col-span-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-display text-base font-semibold", children: "Profit & lending trend" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Last 12 months" })
          ] }),
          /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "border-primary/40 text-primary", children: "+18.4% YoY" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-72", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(AreaChart, { data: monthly, children: [
          /* @__PURE__ */ jsxs("defs", { children: [
            /* @__PURE__ */ jsxs("linearGradient", { id: "g1", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "oklch(0.78 0.18 158)", stopOpacity: 0.6 }),
              /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "oklch(0.78 0.18 158)", stopOpacity: 0 })
            ] }),
            /* @__PURE__ */ jsxs("linearGradient", { id: "g2", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "oklch(0.65 0.20 265)", stopOpacity: 0.5 }),
              /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "oklch(0.65 0.20 265)", stopOpacity: 0 })
            ] })
          ] }),
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.30 0.03 252 / 0.5)" }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "m", stroke: "oklch(0.70 0.02 250)", fontSize: 12 }),
          /* @__PURE__ */ jsx(YAxis, { stroke: "oklch(0.70 0.02 250)", fontSize: 12, tickFormatter: (v) => `${v / 1e3}k` }),
          /* @__PURE__ */ jsx(Tooltip, { contentStyle: {
            background: "oklch(0.20 0.03 250)",
            border: "1px solid oklch(0.30 0.03 252)",
            borderRadius: 12
          }, formatter: (v) => fmtINR(v) }),
          /* @__PURE__ */ jsx(Area, { type: "monotone", dataKey: "lent", stroke: "oklch(0.65 0.20 265)", strokeWidth: 2, fill: "url(#g2)" }),
          /* @__PURE__ */ jsx(Area, { type: "monotone", dataKey: "profit", stroke: "oklch(0.78 0.18 158)", strokeWidth: 2, fill: "url(#g1)" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 to-accent/10 p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent glow", children: /* @__PURE__ */ jsx(Bot, { className: "h-4 w-4 text-primary-foreground" }) }),
          /* @__PURE__ */ jsx("div", { className: "font-display font-semibold", children: "AI insights" })
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-4 space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxs("li", { className: "rounded-xl border border-border/60 bg-background/50 p-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "●" }),
            " Rohan Mehta is 14 days overdue. Suggested action: send WhatsApp reminder."
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "rounded-xl border border-border/60 bg-background/50 p-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-warning", children: "●" }),
            " Aman Verma flagged as ",
            /* @__PURE__ */ jsx("b", { children: "High Risk" }),
            ". Consider restructuring loan."
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "rounded-xl border border-border/60 bg-background/50 p-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-accent", children: "●" }),
            " Projected next‑month profit: ",
            /* @__PURE__ */ jsx("b", { className: "text-gradient", children: fmtINR(146e3) }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", className: "mt-5 w-full border-primary/40", children: /* @__PURE__ */ jsxs(Link, { to: "/dashboard/assistant", children: [
          "Ask AI Assistant ",
          /* @__PURE__ */ jsx(ArrowUpRight, { className: "ml-1 h-4 w-4" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border/60 bg-card/70 p-5 backdrop-blur lg:col-span-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("div", { className: "font-display text-base font-semibold", children: "Recent borrowers" }),
          /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsx(Link, { to: "/dashboard/borrowers", children: "View all" }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-xl border border-border/60", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Borrower" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Principal" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Due" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Status" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: borrowers.slice(0, 5).map((b) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-border/40 transition hover:bg-secondary/30", children: [
            /* @__PURE__ */ jsxs("td", { className: "px-4 py-3", children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: b.name }),
              /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
                b.id,
                " · ",
                b.interestType,
                " @ ",
                b.rate,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: fmtINR(b.principal) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: fmtINR(totalDue(b) - b.paid) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsx(Badge, { variant: "outline", className: statusColor[b.status], children: b.status }) })
          ] }, b.id)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border/60 bg-card/70 p-5 backdrop-blur", children: [
        /* @__PURE__ */ jsx("div", { className: "font-display text-base font-semibold", children: "Repayments this week" }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 h-56", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(BarChart, { data: [{
          d: "Mon",
          v: 22
        }, {
          d: "Tue",
          v: 38
        }, {
          d: "Wed",
          v: 18
        }, {
          d: "Thu",
          v: 52
        }, {
          d: "Fri",
          v: 46
        }, {
          d: "Sat",
          v: 64
        }, {
          d: "Sun",
          v: 30
        }], children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.30 0.03 252 / 0.5)" }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "d", stroke: "oklch(0.70 0.02 250)", fontSize: 12 }),
          /* @__PURE__ */ jsx(YAxis, { stroke: "oklch(0.70 0.02 250)", fontSize: 12 }),
          /* @__PURE__ */ jsx(Tooltip, { contentStyle: {
            background: "oklch(0.20 0.03 250)",
            border: "1px solid oklch(0.30 0.03 252)",
            borderRadius: 12
          } }),
          /* @__PURE__ */ jsx(Bar, { dataKey: "v", fill: "oklch(0.78 0.18 158)", radius: [6, 6, 0, 0] })
        ] }) }) })
      ] })
    ] })
  ] });
}
export {
  Overview as component
};
