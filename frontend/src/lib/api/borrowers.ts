import { apiFetch } from "./client";

export function getBorrowers(lenderId: number) {
  return apiFetch(`/borrowers/${lenderId}`);
}

export function createBorrower(data: {
  lender_id: number;
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
export function updateBorrower(id: number, data: any) {
  return apiFetch(`/borrowers/${id}`,{ method: "PUT", body: JSON.stringify(data),});
}

