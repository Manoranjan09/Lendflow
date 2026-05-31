export type LoanStatus = "Active" | "Closed" | "Overdue" | "High Risk";
export type InterestType = "Simple" | "Compound";

export interface Borrower {
  id: string;
  name: string;
  email: string;
  phone: string;
  principal: number;
  rate: number; // annual %
  interestType: InterestType;
  issueDate: string; // ISO
  dueDate: string; // ISO
  paid: number;
  status: LoanStatus;
  avatar?: string;
}

export const borrowers: Borrower[] = [
  { id: "BR-1042", name: "Ananya Sharma", email: "ananya@example.com", phone: "+91 98201 23456", principal: 250000, rate: 12, interestType: "Compound", issueDate: "2025-01-10", dueDate: "2026-01-10", paid: 80000, status: "Active" },
  { id: "BR-1043", name: "Rohan Mehta", email: "rohan@example.com", phone: "+91 90011 87654", principal: 120000, rate: 10, interestType: "Simple", issueDate: "2024-09-01", dueDate: "2025-09-01", paid: 60000, status: "Overdue" },
  { id: "BR-1044", name: "Priya Iyer", email: "priya@example.com", phone: "+91 99876 11223", principal: 500000, rate: 14, interestType: "Compound", issueDate: "2024-11-20", dueDate: "2026-11-20", paid: 220000, status: "Active" },
  { id: "BR-1045", name: "Aman Verma", email: "aman@example.com", phone: "+91 90909 33221", principal: 75000, rate: 18, interestType: "Compound", issueDate: "2024-06-15", dueDate: "2025-06-15", paid: 0, status: "High Risk" },
  { id: "BR-1046", name: "Sneha Kapoor", email: "sneha@example.com", phone: "+91 98765 44567", principal: 300000, rate: 11, interestType: "Simple", issueDate: "2024-03-01", dueDate: "2025-03-01", paid: 300000, status: "Closed" },
  { id: "BR-1047", name: "Vikram Singh", email: "vikram@example.com", phone: "+91 90123 99887", principal: 180000, rate: 13, interestType: "Compound", issueDate: "2025-02-12", dueDate: "2026-02-12", paid: 40000, status: "Active" },
];

export function calcInterest(p: number, r: number, years: number, type: InterestType) {
  if (type === "Simple") return (p * r * years) / 100;
  return p * Math.pow(1 + r / 100, years) - p;
}

export function yearsBetween(a: string, b: string) {
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.max(ms / (365.25 * 24 * 3600 * 1000), 0);
}

export function totalDue(b: Borrower) {
  const yrs = yearsBetween(b.issueDate, new Date().toISOString());
  return b.principal + calcInterest(b.principal, b.rate, yrs, b.interestType);
}

export const statusColor: Record<LoanStatus, string> = {
  Active: "bg-primary/15 text-primary border-primary/30",
  Closed: "bg-muted text-muted-foreground border-border",
  Overdue: "bg-destructive/15 text-destructive border-destructive/30",
  "High Risk": "bg-warning/15 text-warning border-warning/30",
};

export const fmtINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
