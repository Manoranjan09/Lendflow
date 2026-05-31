const borrowers = [
  { id: "BR-1042", name: "Ananya Sharma", email: "ananya@example.com", phone: "+91 98201 23456", principal: 25e4, rate: 12, interestType: "Compound", issueDate: "2025-01-10", dueDate: "2026-01-10", paid: 8e4, status: "Active" },
  { id: "BR-1043", name: "Rohan Mehta", email: "rohan@example.com", phone: "+91 90011 87654", principal: 12e4, rate: 10, interestType: "Simple", issueDate: "2024-09-01", dueDate: "2025-09-01", paid: 6e4, status: "Overdue" },
  { id: "BR-1044", name: "Priya Iyer", email: "priya@example.com", phone: "+91 99876 11223", principal: 5e5, rate: 14, interestType: "Compound", issueDate: "2024-11-20", dueDate: "2026-11-20", paid: 22e4, status: "Active" },
  { id: "BR-1045", name: "Aman Verma", email: "aman@example.com", phone: "+91 90909 33221", principal: 75e3, rate: 18, interestType: "Compound", issueDate: "2024-06-15", dueDate: "2025-06-15", paid: 0, status: "High Risk" },
  { id: "BR-1046", name: "Sneha Kapoor", email: "sneha@example.com", phone: "+91 98765 44567", principal: 3e5, rate: 11, interestType: "Simple", issueDate: "2024-03-01", dueDate: "2025-03-01", paid: 3e5, status: "Closed" },
  { id: "BR-1047", name: "Vikram Singh", email: "vikram@example.com", phone: "+91 90123 99887", principal: 18e4, rate: 13, interestType: "Compound", issueDate: "2025-02-12", dueDate: "2026-02-12", paid: 4e4, status: "Active" }
];
function calcInterest(p, r, years, type) {
  if (type === "Simple") return p * r * years / 100;
  return p * Math.pow(1 + r / 100, years) - p;
}
function yearsBetween(a, b) {
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.max(ms / (365.25 * 24 * 3600 * 1e3), 0);
}
function totalDue(b) {
  const yrs = yearsBetween(b.issueDate, (/* @__PURE__ */ new Date()).toISOString());
  return b.principal + calcInterest(b.principal, b.rate, yrs, b.interestType);
}
const statusColor = {
  Active: "bg-primary/15 text-primary border-primary/30",
  Closed: "bg-muted text-muted-foreground border-border",
  Overdue: "bg-destructive/15 text-destructive border-destructive/30",
  "High Risk": "bg-warning/15 text-warning border-warning/30"
};
const fmtINR = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
export {
  borrowers as b,
  fmtINR as f,
  statusColor as s,
  totalDue as t
};
