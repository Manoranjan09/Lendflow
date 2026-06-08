import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Calculator, BarChart3, Bot, Settings,  Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  translations,
} from "@/lib/translations";

import {
  getLanguage,
} from "@/lib/language";
import {
  getNotifications,
  generateReminder,
} from "@/lib/api/dashboard";
import { Button } from "@/components/ui/button";
const nav = (t: any) => [
  {
    to: "/dashboard",
    label: t.overview,
    icon: LayoutDashboard,
  },

  {
    to: "/dashboard/borrowers",
    label: t.borrowers,
    icon: Users,
  },

  {
    to: "/dashboard/loans",
    label: t.loans,
    icon: Calculator,
  },

  {
    to: "/dashboard/analytics",
    label: t.analytics,
    icon: BarChart3,
  },

  {
    to: "/calculator",
    label: t.calculators,
    icon: Calculator,
  },

  {
    to: "/dashboard/assistant",
    label: t.assistant,
    icon: Bot,
  },

  {
    to: "/dashboard/settings",
    label: t.settings,
    icon: Settings,
  },
] as const;

export function DashboardShell() {
  const location = useLocation();
const path = location.pathname;
const language =
  getLanguage();

const t =
  translations[
    language as "en" | "hi"
  ];
  const [showNotifications, setShowNotifications] =
    useState(false);
    const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);

const lenderId =
  user?.dbUser?.id;

const userPhoto =
  user?.firebase?.photoURL ||
  user?.firebase?.providerData?.[0]?.photoURL ||
  null;

const userName =
  user?.dbUser?.name ||
  user?.firebase?.displayName ||
  "User";
const [reminderText, setReminderText] =
  useState("");
  const {
  data: notifications = [],
} = useQuery({
  queryKey: [
    "notifications",
    lenderId,
  ],

  queryFn: () =>
    getNotifications(
      lenderId
    ),

  enabled:
    !!lenderId,
});
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl md:flex md:flex-col">
     <div className="h-16 border-b border-sidebar-border px-5">
  <Link
    to="/"
    className="flex h-full items-center gap-2 hover:opacity-80 transition-opacity"
  >
   <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
     <span className="text-sm font-bold text-primary-foreground">
  CF
</span>
    </div>

    <div>
  <div className="font-display font-semibold tracking-tight">
    CreditFlow
  </div>

  <div className="text-[10px] text-muted-foreground">
    AI Powered Lending Platform
  </div>
</div>
  </Link>
</div>
        <nav className="flex-1 space-y-1 p-3">
          {nav(t).map((n) => {
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
            <div className="font-display text-base font-semibold">Welcome back</div>
          </div>
          <div className="relative flex items-center gap-3">
           <button
  onClick={() =>
    setShowNotifications(
      !showNotifications
    )
  }
  className="relative grid h-9 w-9 place-items-center rounded-full border border-border bg-card hover:bg-secondary transition"
>
  <Bell className="h-4 w-4" />

  {notifications.length > 0 && (
    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
      {notifications.length}
    </span>
  )}
</button>

{showNotifications && (
  <div className="absolute right-0 top-12 w-80 rounded-xl border border-border bg-card p-3 shadow-xl z-50">

    <div className="mb-3 font-semibold">
      Notifications
    </div>

    {notifications.length === 0 ? (
      <div className="text-sm text-muted-foreground">
        No notifications
      </div>
    ) : (
  notifications.map(
  (n: any, i: number) => {

    console.log("Notification Data:", n);

    return (
      <div
        key={i}
        className="mb-2 rounded-lg border p-3 text-sm"
      >
        <div>
          {n.message}
        </div>

        <Button
          size="sm"
          className="mt-2"
          onClick={async () => {
            const response: any =
              await generateReminder(
                n.message.split(" overdue")[0]
              );

            setReminderText(
              response.message
            );
          }}
        >
          Generate Reminder
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="mt-2 ml-2"
          onClick={() => {

            console.log(
              "WhatsApp Data:",
              n
            );

            const message =
              `Hello ${n.borrower},

This is a reminder that your loan payment is overdue by ${n.days} day(s).

Kindly clear the outstanding amount at the earliest.

Thank you.`;

            const whatsappUrl =
              `https://wa.me/91${n.phone}?text=${encodeURIComponent(message)}`;

            console.log(
              "WhatsApp URL:",
              whatsappUrl
            );

            window.open(
              whatsappUrl,
              "_blank"
            );
          }}
        >
          WhatsApp
        </Button>

      </div>
    );
  }
)
    )}
  </div>
)}
{reminderText && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

    <div className="w-[500px] rounded-xl bg-card p-5 shadow-xl">

      <div className="mb-3 text-lg font-semibold">
        WhatsApp Reminder
      </div>

      <textarea
        readOnly
        value={reminderText}
        className="h-48 w-full rounded-lg border p-3"
      />

      <div className="mt-3 flex gap-2">

        <Button
          onClick={() => {
            navigator.clipboard.writeText(
              reminderText
            );
          }}
        >
          Copy
        </Button>

        <Button
          variant="outline"
          onClick={() =>
            setReminderText("")
          }
        >
          Close
        </Button>

      </div>
    </div>
  </div>
)}
  {userPhoto ? (
  <img
    src={userPhoto}
    alt={userName}
    className="h-10 w-10 rounded-full border border-border object-cover"
  />
) : (
  <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-semibold text-primary-foreground">
    {userName
      .split(" ")
      .map((n: string) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()}
  </div>
)}
          </div>
        </header>
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
}
