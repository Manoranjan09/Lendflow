import { jsx, jsxs } from "react/jsx-runtime";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { c as cn } from "./utils-H80jjgLf.js";
import { B as Button } from "./button-BC9oXVxV.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
const Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SwitchPrimitives.Root,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsx(
      SwitchPrimitives.Thumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = SwitchPrimitives.Root.displayName;
function Settings() {
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl font-semibold tracking-tight", children: "Settings" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Lender profile, defaults & notifications." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-lg font-semibold", children: "Lender profile" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Full name" }),
          /* @__PURE__ */ jsx(Input, { defaultValue: "Arjun Rao" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Email" }),
          /* @__PURE__ */ jsx(Input, { defaultValue: "arjun@creditflow.ai" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Business name" }),
          /* @__PURE__ */ jsx(Input, { defaultValue: "Rao Capital" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Default currency" }),
          /* @__PURE__ */ jsx(Input, { defaultValue: "INR (₹)" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-lg font-semibold", children: "Lending defaults" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-4 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Default interest rate" }),
          /* @__PURE__ */ jsx(Input, { defaultValue: "12" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Default tenure (months)" }),
          /* @__PURE__ */ jsx(Input, { defaultValue: "12" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Penalty per day (%)" }),
          /* @__PURE__ */ jsx(Input, { defaultValue: "0.1" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-lg font-semibold", children: "Notifications" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-3", children: [["Email reminders", "Send EMI reminders 3 days before due"], ["SMS alerts", "Notify borrowers on penalty or interest changes"], ["WhatsApp messages", "Send branded WhatsApp reminders"], ["AI weekly digest", "Get an AI summary of portfolio health every Monday"]].map(([t, d]) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-xl border border-border/60 bg-background/40 p-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: t }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: d })
        ] }),
        /* @__PURE__ */ jsx(Switch, { defaultChecked: true })
      ] }, t)) }),
      /* @__PURE__ */ jsx("div", { className: "mt-5 flex justify-end", children: /* @__PURE__ */ jsx(Button, { className: "bg-gradient-to-r from-primary to-accent text-primary-foreground glow", children: "Save changes" }) })
    ] })
  ] });
}
export {
  Settings as component
};
