import { apiFetch } from "./client";

export function googleLogin(data: any) {
  return apiFetch(
    "/users/google-login",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}