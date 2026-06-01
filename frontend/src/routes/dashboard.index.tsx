import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, IndianRupee, TrendingUp, AlertTriangle, Wallet, Bot, Plus } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar } from "recharts";
import { borrowers, fmtINR, statusColor, totalDue } from "@/lib/loan-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "@/lib/api/dashboard";
export const Route = createFileRoute("/dashboard/")({
  component: Overview,
});

const monthly = [
  { m: "Jan", profit: 42000, lent: 180000 },
  { m: "Feb", profit: 51000, lent: 220000 },
  { m: "Mar", profit: 48000, lent: 200000 },
  { m: "Apr", profit: 63000, lent: 260000 },
  { m: "May", profit: 71000, lent: 290000 },
  { m: "Jun", profit: 82000, lent: 340000 },
  { m: "Jul", profit: 78000, lent: 320000 },
  { m: "Aug", profit: 91000, lent: 360000 },
  { m: "Sep", profit: 102000, lent: 410000 },
  { m: "Oct", profit: 96000, lent: 390000 },
  { m: "Nov", profit: 118000, lent: 460000 },
  { m: "Dec", profit: 134000, lent: 510000 },
];

function Overview() {
  const { data: stats } = useQuery({ queryKey: ["dashboard-stats"], queryFn: getDashboardStats });
  const totalLent = stats?.total_lent ?? 0;
  const recovered = stats?.total_collected ?? 0;
  const pending = stats?.outstanding_balance ?? 0;
  const overdue = stats?.overdue_loans ?? 0;

  const kpis = [
    { l: "Total lent", v: fmtINR(totalLent), icon: Wallet, trend: "+12.4%" },
    { l: "Recovered", v: fmtINR(recovered), icon: TrendingUp, trend: "+8.1%" },
    { l: "Pending", v: fmtINR(pending), icon: IndianRupee, trend: "-3.2%" },
    { l: "Overdue accounts", v: String(overdue), icon: AlertTriangle, trend: "Review" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Overview</h1>
          <p className="text-sm text-muted-foreground">Snapshot of your lending portfolio.</p>
        </div>
        <Button asChild className="bg-gradient-to-r from-primary to-accent text-primary-foreground glow hover:opacity-90">
          <Link to="/dashboard/borrowers"><Plus className="mr-1.5 h-4 w-4" /> Add borrower</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k, i) => (
          <motion.div
            key={k.l}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="rounded-2xl border border-border/60 bg-card/70 p-5 backdrop-blur"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">{k.l}</div>
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
                <k.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 font-display text-2xl font-semibold">{k.v}</div>
            <div className="mt-1 text-xs text-primary">{k.trend}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card/70 p-5 backdrop-blur lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="font-display text-base font-semibold">Profit & lending trend</div>
              <div className="text-xs text-muted-foreground">Last 12 months</div>
            </div>
            <Badge variant="outline" className="border-primary/40 text-primary">+18.4% YoY</Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthly}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.18 158)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.78 0.18 158)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.65 0.20 265)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.65 0.20 265)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.30 0.03 252 / 0.5)" />
                <XAxis dataKey="m" stroke="oklch(0.70 0.02 250)" fontSize={12} />
                <YAxis stroke="oklch(0.70 0.02 250)" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ background: "oklch(0.20 0.03 250)", border: "1px solid oklch(0.30 0.03 252)", borderRadius: 12 }}
                  formatter={(v: number) => fmtINR(v)}
                />
                <Area type="monotone" dataKey="lent" stroke="oklch(0.65 0.20 265)" strokeWidth={2} fill="url(#g2)" />
                <Area type="monotone" dataKey="profit" stroke="oklch(0.78 0.18 158)" strokeWidth={2} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 to-accent/10 p-5">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent glow">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="font-display font-semibold">AI insights</div>
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="rounded-xl border border-border/60 bg-background/50 p-3">
              <span className="text-primary">●</span> Rohan Mehta is 14 days overdue. Suggested action: send WhatsApp reminder.
            </li>
            <li className="rounded-xl border border-border/60 bg-background/50 p-3">
              <span className="text-warning">●</span> Aman Verma flagged as <b>High Risk</b>. Consider restructuring loan.
            </li>
            <li className="rounded-xl border border-border/60 bg-background/50 p-3">
              <span className="text-accent">●</span> Projected next‑month profit: <b className="text-gradient">{fmtINR(146000)}</b>.
            </li>
          </ul>
          <Button asChild variant="outline" className="mt-5 w-full border-primary/40">
            <Link to="/dashboard/assistant">Ask AI Assistant <ArrowUpRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card/70 p-5 backdrop-blur lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div className="font-display text-base font-semibold">Recent borrowers</div>
            <Button asChild variant="ghost" size="sm"><Link to="/dashboard/borrowers">View all</Link></Button>
          </div>
          <div className="overflow-hidden rounded-xl border border-border/60">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left">Borrower</th>
                  <th className="px-4 py-3 text-right">Principal</th>
                  <th className="px-4 py-3 text-right">Due</th>
                  <th className="px-4 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {borrowers.slice(0, 5).map((b) => (
                  <tr key={b.id} className="border-t border-border/40 transition hover:bg-secondary/30">
                    <td className="px-4 py-3">
                      <div className="font-medium">{b.name}</div>
                      <div className="text-xs text-muted-foreground">{b.id} · {b.interestType} @ {b.rate}%</div>
                    </td>
                    <td className="px-4 py-3 text-right">{fmtINR(b.principal)}</td>
                    <td className="px-4 py-3 text-right">{fmtINR(totalDue(b) - b.paid)}</td>
                    <td className="px-4 py-3 text-right">
                      <Badge variant="outline" className={statusColor[b.status]}>{b.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/70 p-5 backdrop-blur">
          <div className="font-display text-base font-semibold">Repayments this week</div>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { d: "Mon", v: 22 }, { d: "Tue", v: 38 }, { d: "Wed", v: 18 },
                { d: "Thu", v: 52 }, { d: "Fri", v: 46 }, { d: "Sat", v: 64 }, { d: "Sun", v: 30 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.30 0.03 252 / 0.5)" />
                <XAxis dataKey="d" stroke="oklch(0.70 0.02 250)" fontSize={12} />
                <YAxis stroke="oklch(0.70 0.02 250)" fontSize={12} />
                <Tooltip contentStyle={{ background: "oklch(0.20 0.03 250)", border: "1px solid oklch(0.30 0.03 252)", borderRadius: 12 }} />
                <Bar dataKey="v" fill="oklch(0.78 0.18 158)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
