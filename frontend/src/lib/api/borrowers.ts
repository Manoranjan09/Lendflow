import { apiFetch } from "./client";

export function getBorrowers() {
  return apiFetch("/borrowers/");
}

export function createBorrower(data: {
  name: string;
  phone: string;
  address: string;
  aadhaar: string;
}) {
  return apiFetch("/borrowers/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
export function deleteBorrower(borrowerId: number) {
  return apiFetch(`/borrowers/${borrowerId}`, { method: "DELETE" });
}
