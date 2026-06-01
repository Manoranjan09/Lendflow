import { apiFetch } from "./client";

export function getDashboardStats() {
  return apiFetch("/dashboard/stats");
}

export function getAnalyticsData() {
  return apiFetch("/dashboard/analytics");
}
export function getRecentBorrowers() {
  return apiFetch("/dashboard/recent-borrowers");
}
export function getDashboardInsights() {
  return apiFetch("/dashboard/insights");
}
export function getWeeklyRepayments() {
  return apiFetch("/dashboard/weekly-repayments");
}
export function getMonthlyTrend() {
  return apiFetch("/dashboard/monthly-trend");
}
export function getDashboardAlerts() {
  return apiFetch("/dashboard/alerts");
}
