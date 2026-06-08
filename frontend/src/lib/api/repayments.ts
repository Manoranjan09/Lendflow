import { apiFetch } from "./client";

export function getLoanRepayments(loanId: number)  
{ 
    return apiFetch( `/repayments/loan/${loanId}`
  );
}

export function createRepayment(data: {
  loan_id: number;
  amount_paid: number;
  payment_date: string;
  payment_method: string;
  notes?: string;
}) {
  return apiFetch("/repayments/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
