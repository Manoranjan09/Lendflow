import { apiFetch } from "./client";

export function chatWithAssistant(
  message: string,
  lenderId: number
) {
  return apiFetch("/assistant/chat", {
    method: "POST",
    body: JSON.stringify({
      message,
      lender_id: lenderId,
    }),
  });
}
