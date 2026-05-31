import { jsxs, jsx } from "react/jsx-runtime";
import { useRouterState, Link, Outlet } from "@tanstack/react-router";
import { Sparkles, LayoutDashboard, Users, BarChart3, Calculator, Bot, Settings, Bell } from "lucide-react";
import { c as cn } from "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
const nav = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/borrowers", label: "Borrowers", icon: Users },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/calculator", label: "Calculators", icon: Calculator },
  { to: "/dashboard/assistant", label: "AI Assistant", icon: Bot },
  { to: "/dashboard/settings", label: "Settings", icon: Settings }
];
function DashboardShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen", children: [
    /* @__PURE__ */ jsxs("aside", { className: "hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl md:flex md:flex-col", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex h-16 items-center gap-2 border-b border-sidebar-border px-5", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent glow", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4 text-primary-foreground" }) }),
        /* @__PURE__ */ jsx("div", { className: "font-display font-semibold tracking-tight", children: "CreditFlow AI" })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "flex-1 space-y-1 p-3", children: nav.map((n) => {
        const active = path === n.to;
        return /* @__PURE__ */ jsxs(
          Link,
          {
            to: n.to,
            className: cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
              active ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_0_0_0_1px_var(--color-sidebar-border)]" : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
            ),
            children: [
              /* @__PURE__ */ jsx(n.icon, { className: "h-4 w-4" }),
              n.label
            ]
          },
          n.to
        );
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "m-3 rounded-2xl border border-sidebar-border bg-gradient-to-br from-primary/10 to-accent/10 p-4", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-primary", children: "Pro tip" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: 'Ask the AI Assistant: "Which borrowers are overdue this month?"' })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-1 flex-col", children: [
      /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/50 bg-background/60 px-6 backdrop-blur-xl", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Lender workspace" }),
          /* @__PURE__ */ jsx("div", { className: "font-display text-base font-semibold", children: "Welcome back, Arjun" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxs("button", { className: "relative grid h-9 w-9 place-items-center rounded-full border border-border bg-card hover:bg-secondary transition", children: [
            /* @__PURE__ */ jsx(Bell, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { className: "absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-semibold text-primary-foreground", children: "AR" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("main", { className: "flex-1 p-6 md:p-8", children: /* @__PURE__ */ jsx(Outlet, {}) })
    ] })
  ] });
}
const SplitComponent = DashboardShell;
export {
  SplitComponent as component
};
