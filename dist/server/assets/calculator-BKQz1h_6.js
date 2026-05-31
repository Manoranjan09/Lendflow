import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import * as React from "react";
import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Calculator } from "lucide-react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { c as cn } from "./utils-H80jjgLf.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from "recharts";
import { f as fmtINR } from "./loan-data-oILmSadN.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "class-variance-authority";
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
const Slider = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(
  SliderPrimitive.Root,
  {
    ref,
    className: cn("relative flex w-full touch-none select-none items-center", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(SliderPrimitive.Track, { className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20", children: /* @__PURE__ */ jsx(SliderPrimitive.Range, { className: "absolute h-full bg-primary" }) }),
      /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })
    ]
  }
));
Slider.displayName = SliderPrimitive.Root.displayName;
function CalculatorPage() {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-5xl px-6 py-12", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground", children: [
      /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Back home"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent glow", children: /* @__PURE__ */ jsx(Calculator, { className: "h-5 w-5 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl font-semibold tracking-tight", children: "Smart Calculators" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Simple, compound, EMI & penalty — visualised live." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Tabs, { defaultValue: "compound", className: "mt-10", children: [
      /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-3 bg-card/60", children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "simple", children: "Simple" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "compound", children: "Compound" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "emi", children: "EMI" })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "simple", className: "mt-6", children: /* @__PURE__ */ jsx(SimpleCalc, {}) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "compound", className: "mt-6", children: /* @__PURE__ */ jsx(CompoundCalc, {}) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "emi", className: "mt-6", children: /* @__PURE__ */ jsx(EmiCalc, {}) })
    ] })
  ] }) });
}
function Field({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(Label, { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxs("div", { className: "text-sm font-medium", children: [
        value.toLocaleString("en-IN"),
        suffix
      ] })
    ] }),
    /* @__PURE__ */ jsx(Input, { type: "number", value, onChange: (e) => onChange(Number(e.target.value) || 0) }),
    /* @__PURE__ */ jsx(Slider, { value: [value], min, max, step: step ?? 1, onValueChange: (v) => onChange(v[0]) })
  ] });
}
function ResultCard({
  title,
  value,
  sub
}) {
  return /* @__PURE__ */ jsxs(motion.div, { initial: {
    opacity: 0,
    y: 8
  }, animate: {
    opacity: 1,
    y: 0
  }, className: "rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 to-accent/10 p-5", children: [
    /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: title }),
    /* @__PURE__ */ jsx("div", { className: "mt-1 font-display text-3xl font-semibold text-gradient", children: value }),
    sub && /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: sub })
  ] });
}
function SimpleCalc() {
  const [p, setP] = useState(1e5);
  const [r, setR] = useState(12);
  const [y, setY] = useState(2);
  const i = p * r * y / 100;
  const series = useMemo(() => Array.from({
    length: Math.max(Math.ceil(y), 1) + 1
  }).map((_, k) => ({
    yr: k,
    total: p + p * r * k / 100
  })), [p, r, y]);
  return /* @__PURE__ */ jsx(CalcLayout, { p, setP, r, setR, y, setY, interest: i, total: p + i, series });
}
function CompoundCalc() {
  const [p, setP] = useState(1e5);
  const [r, setR] = useState(12);
  const [y, setY] = useState(2);
  const total = p * Math.pow(1 + r / 100, y);
  const i = total - p;
  const series = useMemo(() => Array.from({
    length: Math.max(Math.ceil(y), 1) + 1
  }).map((_, k) => ({
    yr: k,
    total: p * Math.pow(1 + r / 100, k)
  })), [p, r, y]);
  return /* @__PURE__ */ jsx(CalcLayout, { p, setP, r, setR, y, setY, interest: i, total, series });
}
function CalcLayout({
  p,
  setP,
  r,
  setR,
  y,
  setY,
  interest,
  total,
  series
}) {
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-5 rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur", children: [
      /* @__PURE__ */ jsx(Field, { label: "Principal (₹)", value: p, onChange: setP, min: 1e3, max: 5e6, step: 1e3 }),
      /* @__PURE__ */ jsx(Field, { label: "Annual rate", value: r, onChange: setR, min: 1, max: 36, step: 0.5, suffix: " %" }),
      /* @__PURE__ */ jsx(Field, { label: "Tenure", value: y, onChange: setY, min: 1, max: 20, suffix: " yrs" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsx(ResultCard, { title: "Interest", value: fmtINR(interest) }),
        /* @__PURE__ */ jsx(ResultCard, { title: "Total payable", value: fmtINR(total), sub: `Principal + interest` })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border/60 bg-card/70 p-5", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "Growth over time" }),
        /* @__PURE__ */ jsx("div", { className: "mt-2 h-56", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(AreaChart, { data: series, children: [
          /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "cg", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "oklch(0.78 0.18 158)", stopOpacity: 0.6 }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "oklch(0.78 0.18 158)", stopOpacity: 0 })
          ] }) }),
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.30 0.03 252 / 0.5)" }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "yr", stroke: "oklch(0.70 0.02 250)", fontSize: 12, tickFormatter: (v) => `Y${v}` }),
          /* @__PURE__ */ jsx(YAxis, { stroke: "oklch(0.70 0.02 250)", fontSize: 12, tickFormatter: (v) => `${Math.round(v / 1e3)}k` }),
          /* @__PURE__ */ jsx(Tooltip, { contentStyle: {
            background: "oklch(0.20 0.03 250)",
            border: "1px solid oklch(0.30 0.03 252)",
            borderRadius: 12
          }, formatter: (v) => fmtINR(v) }),
          /* @__PURE__ */ jsx(Area, { type: "monotone", dataKey: "total", stroke: "oklch(0.78 0.18 158)", strokeWidth: 2, fill: "url(#cg)" })
        ] }) }) })
      ] })
    ] })
  ] });
}
function EmiCalc() {
  const [p, setP] = useState(5e5);
  const [r, setR] = useState(11);
  const [months, setMonths] = useState(24);
  const mr = r / 12 / 100;
  const emi = p * mr * Math.pow(1 + mr, months) / (Math.pow(1 + mr, months) - 1);
  const total = emi * months;
  const interest = total - p;
  const series = Array.from({
    length: months + 1
  }).map((_, k) => ({
    yr: k,
    total: emi * k
  }));
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-5 rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur", children: [
      /* @__PURE__ */ jsx(Field, { label: "Loan amount (₹)", value: p, onChange: setP, min: 1e4, max: 1e7, step: 5e3 }),
      /* @__PURE__ */ jsx(Field, { label: "Annual rate", value: r, onChange: setR, min: 1, max: 36, step: 0.5, suffix: " %" }),
      /* @__PURE__ */ jsx(Field, { label: "Months", value: months, onChange: setMonths, min: 3, max: 240 })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsx(ResultCard, { title: "Monthly EMI", value: fmtINR(emi) }),
        /* @__PURE__ */ jsx(ResultCard, { title: "Total interest", value: fmtINR(interest) }),
        /* @__PURE__ */ jsx(ResultCard, { title: "Total payable", value: fmtINR(total) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border/60 bg-card/70 p-5", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "Payment timeline" }),
        /* @__PURE__ */ jsx("div", { className: "mt-2 h-56", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(AreaChart, { data: series, children: [
          /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "eg", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "oklch(0.65 0.20 265)", stopOpacity: 0.6 }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "oklch(0.65 0.20 265)", stopOpacity: 0 })
          ] }) }),
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.30 0.03 252 / 0.5)" }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "yr", stroke: "oklch(0.70 0.02 250)", fontSize: 12, tickFormatter: (v) => `M${v}` }),
          /* @__PURE__ */ jsx(YAxis, { stroke: "oklch(0.70 0.02 250)", fontSize: 12, tickFormatter: (v) => `${Math.round(v / 1e3)}k` }),
          /* @__PURE__ */ jsx(Tooltip, { contentStyle: {
            background: "oklch(0.20 0.03 250)",
            border: "1px solid oklch(0.30 0.03 252)",
            borderRadius: 12
          }, formatter: (v) => fmtINR(v) }),
          /* @__PURE__ */ jsx(Area, { type: "monotone", dataKey: "total", stroke: "oklch(0.65 0.20 265)", strokeWidth: 2, fill: "url(#eg)" })
        ] }) }) })
      ] })
    ] })
  ] });
}
export {
  CalculatorPage as component
};
