import { createFileRoute } from "@tanstack/react-router";

import {
  getDashboardStats,
  getAnalytics,
} from "@/lib/api/dashboard";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { useQuery } from "@tanstack/react-query";
import { getAnalyticsData } from "@/lib/api/dashboard";

export const Route = createFileRoute("/dashboard/analytics")({
  component: Analytics,
});


const COLORS = ["oklch(0.78 0.18 158)", "oklch(0.65 0.20 265)", "oklch(0.82 0.16 80)", "oklch(0.66 0.22 22)"];
const fmtINR = (value: number) =>
  `₹${Number(value).toLocaleString("en-IN")}`;

function Analytics() {

const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);

const lenderId =
  user?.dbUser?.id;

const { data } = useQuery({
  queryKey: [
    "analytics",
    lenderId,
  ],

  queryFn: () =>
    getAnalyticsData(
      lenderId
    ),

  enabled: !!lenderId,
});

const {
  data: analyticsData = [],
} = useQuery({
  queryKey: [
    "interest-recovery",
    lenderId,
  ],

  queryFn: () =>
    getAnalytics(
      lenderId
    ),

  enabled: !!lenderId,
});
const byStatus =
  data?.portfolio_status ?? [];

const { data: stats } = useQuery({
  queryKey: [
    "dashboard-stats",
    lenderId,
  ],

  queryFn: () =>
    getDashboardStats(
      lenderId
    ),

  enabled: !!lenderId,
});

const topRisky =
  data?.top_exposure ?? [];

const riskyAccounts =
  data?.risky_accounts ?? [];

  return (
  <div className="space-y-6">

    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Analytics
      </h1>

      <p className="text-sm text-muted-foreground">
        Portfolio performance & risk distribution.
      </p>
    </div>

    <div className="grid gap-4 md:grid-cols-4">

      <div className="rounded-2xl border border-border/60 bg-card/70 p-5">
        <div className="text-sm text-muted-foreground">
          Total Borrowers
        </div>

        <div className="mt-2 text-3xl font-bold">
          {stats?.total_borrowers ?? 0}
        </div>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card/70 p-5">
        <div className="text-sm text-muted-foreground">
          Total Loans
        </div>

        <div className="mt-2 text-3xl font-bold">
          {stats?.total_loans ?? 0}
        </div>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card/70 p-5">
        <div className="text-sm text-muted-foreground">
          Total Lent
        </div>

        <div className="mt-2 text-3xl font-bold">
          ₹{Number(
            stats?.total_lent ?? 0
          ).toLocaleString()}
        </div>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card/70 p-5">
        <div className="text-sm text-muted-foreground">
          Outstanding
        </div>

        <div className="mt-2 text-3xl font-bold">
          ₹{Number(
            stats?.outstanding_balance ?? 0
          ).toLocaleString()}
        </div>
      </div>

    </div>
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground">Portfolio performance & risk distribution.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card/70 p-5 lg:col-span-2">
          <div className="font-display text-base font-semibold">Interest earned vs Recovery</div>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="i1" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0%" stopColor="oklch(0.78 0.18 158)" stopOpacity={0.6} />
  <stop offset="100%" stopColor="oklch(0.78 0.18 158)" stopOpacity={0} />
</linearGradient>

<linearGradient id="i2" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0%" stopColor="oklch(0.65 0.20 265)" stopOpacity={0.5} />
  <stop offset="100%" stopColor="oklch(0.65 0.20 265)" stopOpacity={0} />
</linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.30 0.03 252 / 0.5)" />
               <XAxis dataKey="month" stroke="oklch(0.70 0.02 250)" fontSize={12} />
                <YAxis stroke="oklch(0.70 0.02 250)" fontSize={12} tickFormatter={(v) => `${v/1000}k`} />
                <Tooltip contentStyle={{ background: "oklch(0.20 0.03 250)", border: "1px solid oklch(0.30 0.03 252)", borderRadius: 12 }} formatter={(v: number) => fmtINR(v)} />
               <Area
  type="monotone"
  dataKey="recovered"
  name="Recovered"
  stroke="oklch(0.65 0.20 265)"
  strokeWidth={3}
  fill="url(#i2)"
/>

<Area
  type="monotone"
  dataKey="interest"
  name="Interest"
  stroke="oklch(0.78 0.18 158)"
  strokeWidth={3}
  fill="url(#i1)"
/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/70 p-5">
          <div className="font-display text-base font-semibold">Portfolio by status</div>
          <div className="mt-2 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={byStatus} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={4}>
                  {byStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "oklch(0.20 0.03 250)", border: "1px solid oklch(0.30 0.03 252)", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
           {byStatus.map((s: any, i: number) => (
  <div
    key={s.name}
    className="flex items-center gap-2"
  >
                <span className="h-2 w-2 rounded-full" style={{ background: COLORS[i] }} />
                <span className="text-muted-foreground">{s.name}</span>
                <span className="ml-auto font-medium">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-card/70 p-5">
          <div className="font-display text-base font-semibold">Top exposure</div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topRisky} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.30 0.03 252 / 0.5)" />
                <XAxis type="number" stroke="oklch(0.70 0.02 250)" fontSize={12} tickFormatter={(v) => `${v/1000}k`} />
               <YAxis
  type="category"
  dataKey="borrower"stroke="oklch(0.70 0.02 250)" fontSize={12} width={110} />
                <Tooltip contentStyle={{ background: "oklch(0.20 0.03 250)", border: "1px solid oklch(0.30 0.03 252)", borderRadius: 12 }} formatter={(v: number) => fmtINR(v)} />
                <Bar dataKey="exposure" fill="oklch(0.65 0.20 265)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/70 p-5">
          <div className="font-display text-base font-semibold">Risky accounts</div>
          <ul className="mt-3 divide-y divide-border/40">
            {riskyAccounts.map((b: any, index: number) => (
              <li
  key={`${b.borrower}-${index}`}
  className="flex items-center justify-between py-3"
>
                <div>
                 <div className="font-medium">
  {b.borrower}
</div>
                  <div className="text-xs text-muted-foreground">{b.status}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
  ₹{Number(b.exposure).toLocaleString()}
</div>
                  <div className="text-xs text-muted-foreground">exposure</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
