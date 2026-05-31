import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/settings")({
  component: Settings,
});

function Settings() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Lender profile, defaults & notifications.</p>
      </div>

      <section className="rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur">
        <h2 className="font-display text-lg font-semibold">Lender profile</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="grid gap-1.5"><Label>Full name</Label><Input defaultValue="Arjun Rao" /></div>
          <div className="grid gap-1.5"><Label>Email</Label><Input defaultValue="arjun@creditflow.ai" /></div>
          <div className="grid gap-1.5"><Label>Business name</Label><Input defaultValue="Rao Capital" /></div>
          <div className="grid gap-1.5"><Label>Default currency</Label><Input defaultValue="INR (₹)" /></div>
        </div>
      </section>

      <section className="rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur">
        <h2 className="font-display text-lg font-semibold">Lending defaults</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="grid gap-1.5"><Label>Default interest rate</Label><Input defaultValue="12" /></div>
          <div className="grid gap-1.5"><Label>Default tenure (months)</Label><Input defaultValue="12" /></div>
          <div className="grid gap-1.5"><Label>Penalty per day (%)</Label><Input defaultValue="0.1" /></div>
        </div>
      </section>

      <section className="rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur">
        <h2 className="font-display text-lg font-semibold">Notifications</h2>
        <div className="mt-4 space-y-3">
          {[
            ["Email reminders", "Send EMI reminders 3 days before due"],
            ["SMS alerts", "Notify borrowers on penalty or interest changes"],
            ["WhatsApp messages", "Send branded WhatsApp reminders"],
            ["AI weekly digest", "Get an AI summary of portfolio health every Monday"],
          ].map(([t, d]) => (
            <div key={t} className="flex items-center justify-between rounded-xl border border-border/60 bg-background/40 p-4">
              <div>
                <div className="text-sm font-medium">{t}</div>
                <div className="text-xs text-muted-foreground">{d}</div>
              </div>
              <Switch defaultChecked />
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-end">
          <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground glow">Save changes</Button>
        </div>
      </section>
    </div>
  );
}
