import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Calculator as CalcIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { fmtINR } from "@/lib/loan-data";

export const Route = createFileRoute("/calculator")({
  head: () => ({ meta: [{ title: "AI Smart Calculator — CreditFlow AI" }] }),
  ssr: false,
  component: CalculatorPage,
});

function CalculatorPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
        <div className="mt-6 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent glow">
            <CalcIcon className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-4xl font-semibold tracking-tight">Smart Calculators</h1>
            <p className="text-sm text-muted-foreground">Simple, compound, EMI & penalty — visualised live.</p>
          </div>
        </div>

        <Tabs defaultValue="compound" className="mt-10">
          <TabsList className="grid w-full grid-cols-3 bg-card/60">
            <TabsTrigger value="simple">Simple</TabsTrigger>
            <TabsTrigger value="compound">Compound</TabsTrigger>
            <TabsTrigger value="emi">EMI</TabsTrigger>
          </TabsList>

          <TabsContent value="simple" className="mt-6"><SimpleCalc /></TabsContent>
          <TabsContent value="compound" className="mt-6"><CompoundCalc /></TabsContent>
          <TabsContent value="emi" className="mt-6"><EmiCalc /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, min, max, step, suffix }: { label: string; value: number; onChange: (n: number) => void; min: number; max: number; step?: number; suffix?: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
        <div className="text-sm font-medium">{value.toLocaleString("en-IN")}{suffix}</div>
      </div>
      <Input type="number" value={value} onChange={(e) => onChange(Number(e.target.value) || 0)} />
      <Slider value={[value]} min={min} max={max} step={step ?? 1} onValueChange={(v) => onChange(v[0])} />
    </div>
  );
}

function ResultCard({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 to-accent/10 p-5">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{title}</div>
      <div className="mt-1 font-display text-3xl font-semibold text-gradient">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </motion.div>
  );
}

function SimpleCalc() {
  const [p, setP] = useState(100000);
  const [r, setR] = useState(12);
  const [y, setY] = useState(2);
  const i = (p * r * y) / 100;
  const series = useMemo(() =>
    Array.from({ length: Math.max(Math.ceil(y), 1) + 1 }).map((_, k) => ({
      yr: k, total: p + (p * r * k) / 100,
    })), [p, r, y]);

  return <CalcLayout p={p} setP={setP} r={r} setR={setR} y={y} setY={setY} interest={i} total={p + i} series={series} />;
}

function CompoundCalc() {
  const [p, setP] = useState(100000);
  const [r, setR] = useState(12);
  const [y, setY] = useState(2);
  const total = p * Math.pow(1 + r / 100, y);
  const i = total - p;
  const series = useMemo(() =>
    Array.from({ length: Math.max(Math.ceil(y), 1) + 1 }).map((_, k) => ({
      yr: k, total: p * Math.pow(1 + r / 100, k),
    })), [p, r, y]);

  return <CalcLayout p={p} setP={setP} r={r} setR={setR} y={y} setY={setY} interest={i} total={total} series={series} />;
}

function CalcLayout({ p, setP, r, setR, y, setY, interest, total, series }: { p: number; setP: (n: number) => void; r: number; setR: (n: number) => void; y: number; setY: (n: number) => void; interest: number; total: number; series: { yr: number; total: number }[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-5 rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur">
        <Field label="Principal (₹)" value={p} onChange={setP} min={1000} max={5000000} step={1000} />
        <Field label="Annual rate" value={r} onChange={setR} min={1} max={36} step={0.5} suffix=" %" />
        <Field label="Tenure" value={y} onChange={setY} min={1} max={20} suffix=" yrs" />
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <ResultCard title="Interest" value={fmtINR(interest)} />
          <ResultCard title="Total payable" value={fmtINR(total)} sub={`Principal + interest`} />
        </div>
        <div className="rounded-2xl border border-border/60 bg-card/70 p-5">
          <div className="text-sm text-muted-foreground">Growth over time</div>
          <div className="mt-2 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series}>
                <defs>
                  <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.18 158)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.78 0.18 158)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.30 0.03 252 / 0.5)" />
                <XAxis dataKey="yr" stroke="oklch(0.70 0.02 250)" fontSize={12} tickFormatter={(v) => `Y${v}`} />
                <YAxis stroke="oklch(0.70 0.02 250)" fontSize={12} tickFormatter={(v) => `${Math.round(v/1000)}k`} />
                <Tooltip contentStyle={{ background: "oklch(0.20 0.03 250)", border: "1px solid oklch(0.30 0.03 252)", borderRadius: 12 }} formatter={(v: number) => fmtINR(v)} />
                <Area type="monotone" dataKey="total" stroke="oklch(0.78 0.18 158)" strokeWidth={2} fill="url(#cg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmiCalc() {
  const [p, setP] = useState(500000);
  const [r, setR] = useState(11);
  const [months, setMonths] = useState(24);
  const mr = r / 12 / 100;
  const emi = (p * mr * Math.pow(1 + mr, months)) / (Math.pow(1 + mr, months) - 1);
  const total = emi * months;
  const interest = total - p;
  const series = Array.from({ length: months + 1 }).map((_, k) => ({
    yr: k, total: (emi * k),
  }));
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-5 rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur">
        <Field label="Loan amount (₹)" value={p} onChange={setP} min={10000} max={10000000} step={5000} />
        <Field label="Annual rate" value={r} onChange={setR} min={1} max={36} step={0.5} suffix=" %" />
        <Field label="Months" value={months} onChange={setMonths} min={3} max={240} />
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <ResultCard title="Monthly EMI" value={fmtINR(emi)} />
          <ResultCard title="Total interest" value={fmtINR(interest)} />
          <ResultCard title="Total payable" value={fmtINR(total)} />
        </div>
        <div className="rounded-2xl border border-border/60 bg-card/70 p-5">
          <div className="text-sm text-muted-foreground">Payment timeline</div>
          <div className="mt-2 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series}>
                <defs>
                  <linearGradient id="eg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.65 0.20 265)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.65 0.20 265)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.30 0.03 252 / 0.5)" />
                <XAxis dataKey="yr" stroke="oklch(0.70 0.02 250)" fontSize={12} tickFormatter={(v) => `M${v}`} />
                <YAxis stroke="oklch(0.70 0.02 250)" fontSize={12} tickFormatter={(v) => `${Math.round(v/1000)}k`} />
                <Tooltip contentStyle={{ background: "oklch(0.20 0.03 250)", border: "1px solid oklch(0.30 0.03 252)", borderRadius: 12 }} formatter={(v: number) => fmtINR(v)} />
                <Area type="monotone" dataKey="total" stroke="oklch(0.65 0.20 265)" strokeWidth={2} fill="url(#eg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
