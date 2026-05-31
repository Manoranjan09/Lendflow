import { jsxs, jsx } from "react/jsx-runtime";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { b as borrowers, t as totalDue, f as fmtINR } from "./loan-data-oILmSadN.js";
const trend = Array.from({
  length: 12
}).map((_, i) => ({
  m: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
  interest: 12e3 + i * 4200 + i % 3 * 1800,
  recovery: 3e4 + i * 6100
}));
const COLORS = ["oklch(0.78 0.18 158)", "oklch(0.65 0.20 265)", "oklch(0.82 0.16 80)", "oklch(0.66 0.22 22)"];
function Analytics() {
  const byStatus = ["Active", "Overdue", "High Risk", "Closed"].map((s) => ({
    name: s,
    value: borrowers.filter((b) => b.status === s).length
  }));
  const topRisky = [...borrowers].map((b) => ({
    ...b,
    exposure: Math.max(totalDue(b) - b.paid, 0)
  })).sort((a, b) => b.exposure - a.exposure).slice(0, 5);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl font-semibold tracking-tight", children: "Analytics" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Portfolio performance & risk distribution." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border/60 bg-card/70 p-5 lg:col-span-2", children: [
        /* @__PURE__ */ jsx("div", { className: "font-display text-base font-semibold", children: "Interest earned vs Recovery" }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 h-72", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(AreaChart, { data: trend, children: [
          /* @__PURE__ */ jsxs("defs", { children: [
            /* @__PURE__ */ jsxs("linearGradient", { id: "i1", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "oklch(0.78 0.18 158)", stopOpacity: 0.6 }),
              /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "oklch(0.78 0.18 158)", stopOpacity: 0 })
            ] }),
            /* @__PURE__ */ jsxs("linearGradient", { id: "i2", x1: "0", y1: "0", x2: "0", y2: "1", children: [
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
          /* @__PURE__ */ jsx(Area, { type: "monotone", dataKey: "recovery", stroke: "oklch(0.65 0.20 265)", strokeWidth: 2, fill: "url(#i2)" }),
          /* @__PURE__ */ jsx(Area, { type: "monotone", dataKey: "interest", stroke: "oklch(0.78 0.18 158)", strokeWidth: 2, fill: "url(#i1)" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border/60 bg-card/70 p-5", children: [
        /* @__PURE__ */ jsx("div", { className: "font-display text-base font-semibold", children: "Portfolio by status" }),
        /* @__PURE__ */ jsx("div", { className: "mt-2 h-64", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(PieChart, { children: [
          /* @__PURE__ */ jsx(Pie, { data: byStatus, dataKey: "value", nameKey: "name", innerRadius: 55, outerRadius: 90, paddingAngle: 4, children: byStatus.map((_, i) => /* @__PURE__ */ jsx(Cell, { fill: COLORS[i % COLORS.length] }, i)) }),
          /* @__PURE__ */ jsx(Tooltip, { contentStyle: {
            background: "oklch(0.20 0.03 250)",
            border: "1px solid oklch(0.30 0.03 252)",
            borderRadius: 12
          } })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "mt-2 grid grid-cols-2 gap-2 text-xs", children: byStatus.map((s, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full", style: {
            background: COLORS[i]
          } }),
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: s.name }),
          /* @__PURE__ */ jsx("span", { className: "ml-auto font-medium", children: s.value })
        ] }, s.name)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border/60 bg-card/70 p-5", children: [
        /* @__PURE__ */ jsx("div", { className: "font-display text-base font-semibold", children: "Top exposure" }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 h-64", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(BarChart, { data: topRisky, layout: "vertical", children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.30 0.03 252 / 0.5)" }),
          /* @__PURE__ */ jsx(XAxis, { type: "number", stroke: "oklch(0.70 0.02 250)", fontSize: 12, tickFormatter: (v) => `${v / 1e3}k` }),
          /* @__PURE__ */ jsx(YAxis, { type: "category", dataKey: "name", stroke: "oklch(0.70 0.02 250)", fontSize: 12, width: 110 }),
          /* @__PURE__ */ jsx(Tooltip, { contentStyle: {
            background: "oklch(0.20 0.03 250)",
            border: "1px solid oklch(0.30 0.03 252)",
            borderRadius: 12
          }, formatter: (v) => fmtINR(v) }),
          /* @__PURE__ */ jsx(Bar, { dataKey: "exposure", fill: "oklch(0.65 0.20 265)", radius: [0, 6, 6, 0] })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border/60 bg-card/70 p-5", children: [
        /* @__PURE__ */ jsx("div", { className: "font-display text-base font-semibold", children: "Risky accounts" }),
        /* @__PURE__ */ jsx("ul", { className: "mt-3 divide-y divide-border/40", children: topRisky.map((b) => /* @__PURE__ */ jsxs("li", { className: "flex items-center justify-between py-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-medium", children: b.name }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
              b.id,
              " · ",
              b.status
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("div", { className: "font-medium", children: fmtINR(b.exposure) }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "exposure" })
          ] })
        ] }, b.id)) })
      ] })
    ] })
  ] });
}
export {
  Analytics as component
};
