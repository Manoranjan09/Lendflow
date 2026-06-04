import { Bot } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useRouterState } from "@tanstack/react-router";
export function AIFab() {
  const navigate = useNavigate();
const path = useRouterState({
    select: (s) => s.location.pathname,
  });

  if (path === "/dashboard/assistant") {
    return null;
  }
  return (
   <button
  title="Ask CreditFlow AI"
  onClick={() =>
    navigate({
      to: "/dashboard/assistant",
    })
  }
      className="
        fixed
        bottom-6
        right-6
        z-[999]
        h-14
        w-14
        rounded-full
        bg-gradient-to-r
        from-primary
        to-accent
        shadow-lg
        hover:scale-110
        transition-all
        duration-300
      "
    >
      <div className="relative">
  <Bot className="mx-auto h-6 w-6 text-black" />

  <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-green-400 animate-pulse" />
</div>
    </button>
  );
}
