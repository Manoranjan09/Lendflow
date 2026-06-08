import { apiFetch } from "./client";

export function getSettings(
  lenderId: number
) {
  return apiFetch(
    `/settings/${lenderId}`
  );
}

export function updateSettings(
  lenderId: number,
  data: any
) {
  return apiFetch(
    `/settings/${lenderId}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
}