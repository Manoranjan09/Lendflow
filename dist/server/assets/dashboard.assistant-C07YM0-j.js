import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Bot, User, Send } from "lucide-react";
import { B as Button } from "./button-BC9oXVxV.js";
import { I as Input } from "./input-C0QjszdI.js";
import { b as borrowers, f as fmtINR, t as totalDue } from "./loan-data-oILmSadN.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
const SUGGESTIONS = ["How much profit did I make this month?", "Which borrowers are overdue?", "How much compound interest accumulated?", "Predict next month's collections"];
function answer(q) {
  const lower = q.toLowerCase();
  if (lower.includes("overdue")) {
    const od = borrowers.filter((b) => b.status === "Overdue" || b.status === "High Risk");
    return `You currently have ${od.length} overdue/high-risk borrowers: ${od.map((b) => b.name).join(", ")}. Total exposure: ${fmtINR(od.reduce((s, b) => s + Math.max(totalDue(b) - b.paid, 0), 0))}.`;
  }
  if (lower.includes("profit") || lower.includes("earn")) {
    const total = borrowers.reduce((s, b) => s + Math.max(totalDue(b) - b.principal, 0), 0);
    return `Estimated interest profit accumulated across your active portfolio is ${fmtINR(total)}. This month's projected profit is around ${fmtINR(146e3)}.`;
  }
  if (lower.includes("compound")) {
    const c = borrowers.filter((b) => b.interestType === "Compound");
    const sum = c.reduce((s, b) => s + Math.max(totalDue(b) - b.principal, 0), 0);
    return `${c.length} loans are on compound interest, contributing ~${fmtINR(sum)} in accrued interest so far.`;
  }
  if (lower.includes("predict") || lower.includes("next")) {
    return `Based on repayment velocity and seasonality, expected collections next month are between ${fmtINR(38e4)} and ${fmtINR(46e4)}. Two accounts (BR-1043, BR-1045) are likely to delay.`;
  }
  return `I can help with profit, overdue tracking, compound interest, repayment predictions and borrower risk. Try one of the suggestions below.`;
}
function Assistant() {
  const [messages, setMessages] = useState([{
    role: "ai",
    text: "Hi Arjun 👋  I'm your CreditFlow AI. Ask me anything about your lending portfolio."
  }]);
  const [input, setInput] = useState("");
  function send(text) {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [...m, {
      role: "user",
      text: q
    }, {
      role: "ai",
      text: answer(q)
    }]);
    setInput("");
  }
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-[calc(100vh-9rem)] max-w-3xl flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent glow", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "font-display text-2xl font-semibold", children: "AI Assistant" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Conversational finance copilot" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 space-y-3 overflow-y-auto rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur", children: messages.map((m, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 6
    }, animate: {
      opacity: 1,
      y: 0
    }, className: `flex gap-3 ${m.role === "user" ? "justify-end" : ""}`, children: [
      m.role === "ai" && /* @__PURE__ */ jsx("div", { className: "grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent", children: /* @__PURE__ */ jsx(Bot, { className: "h-4 w-4 text-primary-foreground" }) }),
      /* @__PURE__ */ jsx("div", { className: `max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.role === "user" ? "bg-gradient-to-br from-primary to-accent text-primary-foreground" : "border border-border/60 bg-background/60"}`, children: m.text }),
      m.role === "user" && /* @__PURE__ */ jsx("div", { className: "grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-secondary", children: /* @__PURE__ */ jsx(User, { className: "h-4 w-4" }) })
    ] }, i)) }),
    /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: SUGGESTIONS.map((s) => /* @__PURE__ */ jsx("button", { onClick: () => send(s), className: "rounded-full border border-border/60 bg-card/60 px-3 py-1.5 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground", children: s }, s)) }),
    /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      send(input);
    }, className: "mt-3 flex gap-2", children: [
      /* @__PURE__ */ jsx(Input, { value: input, onChange: (e) => setInput(e.target.value), placeholder: "Ask about profits, overdue borrowers, predictions…", className: "h-12" }),
      /* @__PURE__ */ jsx(Button, { type: "submit", size: "lg", className: "bg-gradient-to-r from-primary to-accent text-primary-foreground glow", children: /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" }) })
    ] })
  ] });
}
export {
  Assistant as component
};
