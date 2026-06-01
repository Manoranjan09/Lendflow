import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Users, Calculator, BarChart3, Bot, Settings, Sparkles, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/borrowers", label: "Borrowers", icon: Users },
  { to: "/dashboard/loans", label: "Loans", icon: Calculator },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/calculator", label: "Calculators", icon: Calculator },
  { to: "/dashboard/assistant", label: "AI Assistant", icon: Bot },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
] as const;

export function DashboardShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl md:flex md:flex-col">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent glow">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="font-display font-semibold tracking-tight">CreditFlow AI</div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((n) => {
            const active = path === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_0_0_0_1px_var(--color-sidebar-border)]"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                )}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="m-3 rounded-2xl border border-sidebar-border bg-gradient-to-br from-primary/10 to-accent/10 p-4">
          <div className="text-xs font-medium text-primary">Pro tip</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Ask the AI Assistant: "Which borrowers are overdue this month?"
          </p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/50 bg-background/60 px-6 backdrop-blur-xl">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Lender workspace</div>
            <div className="font-display text-base font-semibold">Welcome back, Arjun</div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative grid h-9 w-9 place-items-center rounded-full border border-border bg-card hover:bg-secondary transition">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
            </button>
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-semibold text-primary-foreground">
              AR
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
