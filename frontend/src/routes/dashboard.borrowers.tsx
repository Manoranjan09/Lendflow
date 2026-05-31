import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search, Plus, MoreHorizontal, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { borrowers as seed, fmtINR, statusColor, totalDue, type Borrower, type LoanStatus, type InterestType } from "@/lib/loan-data";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/borrowers")({
  component: BorrowersPage,
});

const STATUSES: LoanStatus[] = ["Active", "Overdue", "High Risk", "Closed"];

function BorrowersPage() {
  const [list, setList] = useState<Borrower[]>(seed);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    return list.filter((b) => {
      const matchQ = !q || b.name.toLowerCase().includes(q.toLowerCase()) || b.id.toLowerCase().includes(q.toLowerCase());
      const matchS = status === "all" || b.status === status;
      return matchQ && matchS;
    });
  }, [list, q, status]);

  function addBorrower(form: FormData) {
    const name = String(form.get("name") || "").trim();
    const principal = Number(form.get("principal") || 0);
    const rate = Number(form.get("rate") || 0);
    if (!name || !principal || !rate) {
      toast.error("Please fill all fields");
      return;
    }
    const b: Borrower = {
      id: `BR-${1048 + list.length}`,
      name,
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      principal,
      rate,
      interestType: (form.get("type") as InterestType) || "Compound",
      issueDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString(),
      paid: 0,
      status: "Active",
    };
    setList([b, ...list]);
    setOpen(false);
    toast.success("Borrower added", { description: `${name} · ${fmtINR(principal)} @ ${rate}%` });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Borrowers</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} of {list.length} accounts</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground glow hover:opacity-90">
              <Plus className="mr-1.5 h-4 w-4" /> Add borrower
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display">New borrower</DialogTitle>
            </DialogHeader>
            <form
              className="grid gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                addBorrower(new FormData(e.currentTarget));
              }}
            >
              <div className="grid gap-1.5">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" name="name" placeholder="e.g. Asha Nair" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="asha@example.com" />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" placeholder="+91 …" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="principal">Amount (₹)</Label>
                  <Input id="principal" name="principal" type="number" placeholder="100000" required />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="rate">Rate (%)</Label>
                  <Input id="rate" name="rate" type="number" step="0.1" placeholder="12" required />
                </div>
                <div className="grid gap-1.5">
                  <Label>Type</Label>
                  <Select name="type" defaultValue="Compound">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Simple">Simple</SelectItem>
                      <SelectItem value="Compound">Compound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="mt-2">
                <Button type="submit" className="bg-gradient-to-r from-primary to-accent text-primary-foreground">Create borrower</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or ID…" className="pl-9" />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3 text-left">Borrower</th>
              <th className="px-5 py-3 text-left">Contact</th>
              <th className="px-5 py-3 text-right">Principal</th>
              <th className="px-5 py-3 text-right">Rate</th>
              <th className="px-5 py-3 text-right">Due</th>
              <th className="px-5 py-3 text-right">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((b, i) => (
              <motion.tr
                key={b.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.02 }}
                className="border-t border-border/40 hover:bg-secondary/30"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary/30 to-accent/30 text-xs font-semibold">
                      {b.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <div className="font-medium">{b.name}</div>
                      <div className="text-xs text-muted-foreground">{b.id} · {b.interestType}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5"><Mail className="h-3 w-3" /> {b.email}</div>
                  <div className="mt-0.5 flex items-center gap-1.5"><Phone className="h-3 w-3" /> {b.phone}</div>
                </td>
                <td className="px-5 py-3.5 text-right font-medium">{fmtINR(b.principal)}</td>
                <td className="px-5 py-3.5 text-right">{b.rate}%</td>
                <td className="px-5 py-3.5 text-right">{fmtINR(Math.max(totalDue(b) - b.paid, 0))}</td>
                <td className="px-5 py-3.5 text-right">
                  <Badge variant="outline" className={statusColor[b.status]}>{b.status}</Badge>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-secondary"><MoreHorizontal className="h-4 w-4" /></button>
                </td>
              </motion.tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-5 py-10 text-center text-sm text-muted-foreground">No borrowers match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
