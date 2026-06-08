import { apiFetch } from "./client";

export function getLoans(lenderId: number) {
  return apiFetch(`/loans/?lender_id=${lenderId}`);
}

export function createLoan(data: {
  borrower_id: number;
  principal_amount: number;
  interest_rate: number;
  interest_type: string;
  is_compound: boolean;
  issue_date: string;
  due_date: string;
}) {
  return apiFetch("/loans/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
export function getLoanSummary(loanId: number) {
  return apiFetch(`/loans/${loanId}/summary`);
}
export function deleteLoan(loanId: number) {
  return apiFetch(`/loans/${loanId}`, { method: "DELETE" });
}
export function updateLoan(id: number, data: any) {
  return apiFetch(`/loans/${id}`, { method: "PUT", body: JSON.stringify(data),});
}
