
import { useState, useEffect } from "react";
import {
  getLanguage,
  setLanguage,
} from "@/lib/language";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import {
  getSettings,
  updateSettings,
} from "@/lib/api/settings";



export default function Settings() {
  const language =
  getLanguage();
  const queryClient =
    useQueryClient();

  const user = JSON.parse(
    localStorage.getItem("user") ||
      "{}"
  );

  const lenderId =
    user?.dbUser?.id;

  const {
    data: settings,
    isLoading,
  } = useQuery({
    queryKey: [
      "settings",
      lenderId,
    ],

    queryFn: () =>
      getSettings(
        lenderId
      ),

    enabled:
      !!lenderId,
  });

  const [form, setForm] =
    useState<any>(null);

  useEffect(() => {
    if (settings) {
      setForm(settings);
    }
  }, [settings]);

  const updateMutation =
    useMutation({
      mutationFn: (
        data: any
      ) =>
        updateSettings(
          lenderId,
          data
        ),

      onSuccess: () => {
        toast.success(
          "Settings saved successfully"
        );

        queryClient.invalidateQueries(
          {
            queryKey: [
              "settings",
              lenderId,
            ],
          }
        );
      },

      onError: () => {
        toast.error(
          "Failed to save settings"
        );
      },
    });

  if (
    isLoading ||
    !form
  ) {
    return (
  <div className="flex h-64 items-center justify-center">
    Loading settings...
  </div>
);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Settings
        </h1>

        <p className="text-sm text-muted-foreground">
          Lender profile,
          defaults &
          notifications.
        </p>
      </div>

      <section className="rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur">
        <h2 className="font-display text-lg font-semibold">
          Lender Profile
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="grid gap-1.5">
            <Label>
              Full Name
            </Label>

            <Input
  value={user?.dbUser?.name}
  readOnly
  className="bg-muted"
/>
          </div>

          <div className="grid gap-1.5">
            <Label>
              Email
            </Label>

            <Input
              value={
                user?.dbUser
                  ?.email
              }
              readOnly
            />
          </div>

          <div className="grid gap-1.5">
            <Label>
              Business Name
            </Label>

            <Input
              value={
                form.business_name
              }
              onChange={(
                e
              ) =>
                setForm({
                  ...form,
                  business_name:
                    e.target
                      .value,
                })
              }
            />
          </div>

          <div className="grid gap-1.5">
            <Label>
              Currency
            </Label>

            <Input
              value={
                form.currency
              }
              onChange={(
                e
              ) =>
                setForm({
                  ...form,
                  currency:
                    e.target
                      .value,
                })
              }
            />
          </div>
        </div>
      </section>
<section className="rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur">

  <h2 className="font-display text-lg font-semibold">
    Language
  </h2>

  <div className="mt-4">

    <select
  value={language}
  onChange={(e) => {
    setLanguage(
      e.target.value
    );

    window.location.reload();
  }}
      className="rounded-lg border bg-background px-3 py-2"
    >
      <option value="en">
        English
      </option>

      <option value="hi">
        हिन्दी
      </option>

    </select>

  </div>

</section>
      <section className="rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur">
        <h2 className="font-display text-lg font-semibold">
          Lending Defaults
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="grid gap-1.5">
            <Label>
              Interest Rate
            </Label>

            <Input
              value={
                form.default_interest_rate
              }
              onChange={(
                e
              ) =>
                setForm({
                  ...form,
                  default_interest_rate:
                    Number(
                      e
                        .target
                        .value
                    ),
                })
              }
            />
          </div>

          <div className="grid gap-1.5">
            <Label>
              Tenure
            </Label>

            <Input
              value={
                form.default_tenure
              }
              onChange={(
                e
              ) =>
                setForm({
                  ...form,
                  default_tenure:
                    Number(
                      e
                        .target
                        .value
                    ),
                })
              }
            />
          </div>

          <div className="grid gap-1.5">
            <Label>
              Penalty %
            </Label>

            <Input
              value={
                form.penalty_per_day
              }
              onChange={(
                e
              ) =>
                setForm({
                  ...form,
                  penalty_per_day:
                    Number(
                      e
                        .target
                        .value
                    ),
                })
              }
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur">
        <h2 className="font-display text-lg font-semibold">
          Notifications
        </h2>

        <div className="mt-4 space-y-3">

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              Email Reminders
            </div>

            <Switch
              checked={
                form.email_reminders
              }
              onCheckedChange={(
                value
              ) =>
                setForm({
                  ...form,
                  email_reminders:
                    value,
                })
              }
            />
          </div>

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              SMS Alerts
            </div>

            <Switch
              checked={
                form.sms_alerts
              }
              onCheckedChange={(
                value
              ) =>
                setForm({
                  ...form,
                  sms_alerts:
                    value,
                })
              }
            />
          </div>

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              WhatsApp Messages
            </div>

            <Switch
              checked={
                form.whatsapp_messages
              }
              onCheckedChange={(
                value
              ) =>
                setForm({
                  ...form,
                  whatsapp_messages:
                    value,
                })
              }
            />
          </div>

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              AI Weekly Digest
            </div>

            <Switch
              checked={
                form.ai_weekly_digest
              }
              onCheckedChange={(
                value
              ) =>
                setForm({
                  ...form,
                  ai_weekly_digest:
                    value,
                })
              }
            />
          </div>

        </div>

        <div className="mt-5 flex justify-end">
          <Button
            onClick={() =>
              updateMutation.mutate(
                form
              )
            }
            disabled={
              updateMutation.isPending
            }
            className="bg-gradient-to-r from-primary to-accent text-primary-foreground glow"
          >
            {updateMutation.isPending
              ? "Saving..."
              : "Save Changes"}
          </Button>
        </div>
      </section>
    </div>
  );
}