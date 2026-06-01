import { apiFetch } from "./client";

export function getDashboardStats() {
  return apiFetch("/dashboard/stats");
}

export function getAnalyticsData() {
  return apiFetch("/dashboard/analytics");
}