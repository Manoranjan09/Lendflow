import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { chatWithAssistant } from "@/lib/api/assistant";

import {
  getDashboardStats,
} from "@/lib/api/dashboard";

import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute(
  "/dashboard/assistant"
)({
  component: Assistant,
});

type Msg = {
  role: "user" | "ai";
  text: string;
  time: string;
};

const SUGGESTIONS = [
  "How much profit did I make this month?",
  "Which borrowers are overdue?",
  "How much compound interest accumulated?",
  "Predict next month's collections",
];

function Assistant() {
  const [messages, setMessages] =
    useState<Msg[]>([
    {
  role: "ai",
  text:
    "Welcome to CreditFlow AI 👋. I can help you analyze borrowers, loans, repayments, interest, profit, overdue accounts, and portfolio risk.",
  time: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
}
    ]);

  const [input, setInput] =
    useState("");
const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);

const lenderId =
  user?.dbUser?.id;

const {
  data: stats,
} = useQuery({
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
  const chatMutation =
    useMutation({
      mutationFn: chatWithAssistant,
    });

  async function send(
    text: string
  ) {
    const q = text.trim();

    if (!q) return;

   setMessages((m) => [
  ...m,
  {
    role: "user",
    text: q,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
]);

    setInput("");

    try {
      const response: any =
        await chatMutation.mutateAsync(
          q
        );

      setMessages((m) => [
        ...m,
       {
  role: "ai",
  text:
    response.answer ??
    "No response received.",
  time: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
},
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text:
            "Sorry, I couldn't process that request.",
        },
      ]);
    }
  }

  return (
    <div className="flex h-[calc(100vh-7rem)] w-full flex-col">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent">
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </div>

        <div>
          <h1 className="font-display text-2xl font-semibold">
            AI Assistant
          </h1>

          <p className="text-xs text-muted-foreground">
            Conversational finance copilot
          </p>
        </div>
      </div>
<div className="mb-3 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2">

  <div className="flex items-center justify-around text-sm">

    <span>
      👥 {stats?.total_borrowers || 0} Borrowers
    </span>

    <span>
      📄 {stats?.total_loans || 0} Loans
    </span>

    <span>
      💰 ₹{Number(
        stats?.total_lent || 0
      ).toLocaleString()}
    </span>

    <span className="text-red-400">
      ⚠ {stats?.overdue_loans || 0} Overdue
    </span>

  </div>

</div>

<div className="flex-1 overflow-y-auto rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur">
        <div className="space-y-4">
          {messages.map(
            (m, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: 6,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className={`flex gap-3 ${
                  m.role === "user"
                    ? "justify-end"
                    : ""
                }`}
              >
                {m.role === "ai" && (
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}

              <div
  className={`min-w-[120px] max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
    m.role === "user"
      ? "bg-gradient-to-br from-primary to-accent text-primary-foreground"
      : "border border-primary/20 bg-card/70 backdrop-blur"
  }`}
>
  <div className="mb-2 flex items-center justify-between">

  {m.role === "ai" ? (
    <div className="text-[10px] uppercase tracking-wider text-primary">
      CreditFlow AI
    </div>
  ) : (
    <div className="text-[10px] uppercase tracking-wider opacity-70">
      You
    </div>
  )}

  <div className="text-[10px] opacity-60">
    {m.time}
  </div>

</div>

  {m.text}
</div>

                {m.role === "user" && (
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-secondary">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </motion.div>
            )
          )}

          {chatMutation.isPending && (
            <div className="flex gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>

              <div className="rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-sm">
                Thinking...
              </div>
            </div>
          )}
        </div>
      </div>

    <div className="mt-4 flex flex-wrap gap-3">

  {[
    {
      title: "Portfolio Summary",
      icon: "📈",
      prompt: "Give me portfolio summary",
    },

    {
      title: "Overdue Borrowers",
      icon: "⚠️",
      prompt: "Which borrowers are overdue?",
    },

    {
      title: "Interest Analysis",
      icon: "💰",
      prompt: "How much compound interest accumulated?",
    },

    {
      title: "Collection Forecast",
      icon: "🧠",
      prompt: "Predict next month's collections",
    },
  ].map((card) => (
    <button
      key={card.title}
      onClick={() =>
        send(card.prompt)
      }
     className="
  flex
  items-center
  gap-3
  rounded-xl
  border
  border-border/60
  bg-card/50
  px-4
  py-3
  text-left
  transition
  hover:border-primary/40
  hover:bg-card
"
    >
     <div className="text-xl">
  {card.icon}
</div>

<div>
  <div className="font-medium text-sm">
    {card.title}
  </div>

 <div className="font-medium">
  {card.title}
</div>
</div>
    </button>
  ))}

</div>
      

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="mt-4 flex gap-2"
      >
        <Input
          value={input}
          onChange={(e) =>
            setInput(
              e.target.value
            )
          }
          placeholder="Ask about profits, overdue borrowers, repayments..."
          className="h-12"
        />

        <Button
          type="submit"
          size="lg"
          disabled={
            chatMutation.isPending
          }
          className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
