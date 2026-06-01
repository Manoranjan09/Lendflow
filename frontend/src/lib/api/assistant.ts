import { apiFetch } from "./client";

export function chatWithAssistant(message: string) {
  return apiFetch("/assistant/chat", {
    method: "POST",
    body: JSON.stringify({
      message,
    }),
  });
}
