import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { ChevronDown, Check, ChevronUp, X, Plus, Search, Mail, Phone, MoreHorizontal } from "lucide-react";
import { I as Input } from "./input-C0QjszdI.js";
import { B as Button } from "./button-BC9oXVxV.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import * as SelectPrimitive from "@radix-ui/react-select";
import { c as cn } from "./utils-H80jjgLf.js";
import { b as borrowers, f as fmtINR, t as totalDue, s as statusColor } from "./loan-data-oILmSadN.js";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { L as Label } from "./label-JU3yqRBo.js";
import { toast } from "sonner";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const STATUSES = ["Active", "Overdue", "High Risk", "Closed"];
function BorrowersPage() {
  const [list, setList] = useState(borrowers);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [open, setOpen] = useState(false);
  const filtered = useMemo(() => {
    return list.filter((b) => {
      const matchQ = !q || b.name.toLowerCase().includes(q.toLowerCase()) || b.id.toLowerCase().includes(q.toLowerCase());
      const matchS = status === "all" || b.status === status;
      return matchQ && matchS;
    });
  }, [list, q, status]);
  function addBorrower(form) {
    const name = String(form.get("name") || "").trim();
    const principal = Number(form.get("principal") || 0);
    const rate = Number(form.get("rate") || 0);
    if (!name || !principal || !rate) {
      toast.error("Please fill all fields");
      return;
    }
    const b = {
      id: `BR-${1048 + list.length}`,
      name,
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      principal,
      rate,
      interestType: form.get("type") || "Compound",
      issueDate: (/* @__PURE__ */ new Date()).toISOString(),
      dueDate: new Date(Date.now() + 365 * 24 * 3600 * 1e3).toISOString(),
      paid: 0,
      status: "Active"
    };
    setList([b, ...list]);
    setOpen(false);
    toast.success("Borrower added", {
      description: `${name} · ${fmtINR(principal)} @ ${rate}%`
    });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl font-semibold tracking-tight", children: "Borrowers" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          filtered.length,
          " of ",
          list.length,
          " accounts"
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { className: "bg-gradient-to-r from-primary to-accent text-primary-foreground glow hover:opacity-90", children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
          " Add borrower"
        ] }) }),
        /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-md", children: [
          /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { className: "font-display", children: "New borrower" }) }),
          /* @__PURE__ */ jsxs("form", { className: "grid gap-3", onSubmit: (e) => {
            e.preventDefault();
            addBorrower(new FormData(e.currentTarget));
          }, children: [
            /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Full name" }),
              /* @__PURE__ */ jsx(Input, { id: "name", name: "name", placeholder: "e.g. Asha Nair", required: true })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
                /* @__PURE__ */ jsx(Input, { id: "email", name: "email", type: "email", placeholder: "asha@example.com" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "phone", children: "Phone" }),
                /* @__PURE__ */ jsx(Input, { id: "phone", name: "phone", placeholder: "+91 …" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "principal", children: "Amount (₹)" }),
                /* @__PURE__ */ jsx(Input, { id: "principal", name: "principal", type: "number", placeholder: "100000", required: true })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "rate", children: "Rate (%)" }),
                /* @__PURE__ */ jsx(Input, { id: "rate", name: "rate", type: "number", step: "0.1", placeholder: "12", required: true })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
                /* @__PURE__ */ jsx(Label, { children: "Type" }),
                /* @__PURE__ */ jsxs(Select, { name: "type", defaultValue: "Compound", children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "Simple", children: "Simple" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "Compound", children: "Compound" })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx(DialogFooter, { className: "mt-2", children: /* @__PURE__ */ jsx(Button, { type: "submit", className: "bg-gradient-to-r from-primary to-accent text-primary-foreground", children: "Create borrower" }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-w-[240px]", children: [
        /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search by name or ID…", className: "pl-9" })
      ] }),
      /* @__PURE__ */ jsxs(Select, { value: status, onValueChange: setStatus, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: "w-44", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Status" }) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All statuses" }),
          STATUSES.map((s) => /* @__PURE__ */ jsx(SelectItem, { value: s, children: s }, s))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-5 py-3 text-left", children: "Borrower" }),
        /* @__PURE__ */ jsx("th", { className: "px-5 py-3 text-left", children: "Contact" }),
        /* @__PURE__ */ jsx("th", { className: "px-5 py-3 text-right", children: "Principal" }),
        /* @__PURE__ */ jsx("th", { className: "px-5 py-3 text-right", children: "Rate" }),
        /* @__PURE__ */ jsx("th", { className: "px-5 py-3 text-right", children: "Due" }),
        /* @__PURE__ */ jsx("th", { className: "px-5 py-3 text-right", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "px-5 py-3" })
      ] }) }),
      /* @__PURE__ */ jsxs("tbody", { children: [
        filtered.map((b, i) => /* @__PURE__ */ jsxs(motion.tr, { initial: {
          opacity: 0,
          y: 6
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.25,
          delay: i * 0.02
        }, className: "border-t border-border/40 hover:bg-secondary/30", children: [
          /* @__PURE__ */ jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary/30 to-accent/30 text-xs font-semibold", children: b.name.split(" ").map((s) => s[0]).slice(0, 2).join("") }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: b.name }),
              /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
                b.id,
                " · ",
                b.interestType
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("td", { className: "px-5 py-3.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(Mail, { className: "h-3 w-3" }),
              " ",
              b.email
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-0.5 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(Phone, { className: "h-3 w-3" }),
              " ",
              b.phone
            ] })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-5 py-3.5 text-right font-medium", children: fmtINR(b.principal) }),
          /* @__PURE__ */ jsxs("td", { className: "px-5 py-3.5 text-right", children: [
            b.rate,
            "%"
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-5 py-3.5 text-right", children: fmtINR(Math.max(totalDue(b) - b.paid, 0)) }),
          /* @__PURE__ */ jsx("td", { className: "px-5 py-3.5 text-right", children: /* @__PURE__ */ jsx(Badge, { variant: "outline", className: statusColor[b.status], children: b.status }) }),
          /* @__PURE__ */ jsx("td", { className: "px-5 py-3.5 text-right", children: /* @__PURE__ */ jsx("button", { className: "grid h-8 w-8 place-items-center rounded-lg hover:bg-secondary", children: /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4" }) }) })
        ] }, b.id)),
        filtered.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 7, className: "px-5 py-10 text-center text-sm text-muted-foreground", children: "No borrowers match your filters." }) })
      ] })
    ] }) })
  ] });
}
export {
  BorrowersPage as component
};
