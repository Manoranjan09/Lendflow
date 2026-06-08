import { apiFetch } from "./client";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000";

export function getDashboardStats(
  lenderId: number
) {
  return apiFetch(
    `/dashboard/stats?lender_id=${lenderId}`
  );
}

export function getAnalyticsData(
  lenderId: number
) {
  return apiFetch(
    `/dashboard/analytics?lender_id=${lenderId}`
  );
}

export function getRecentBorrowers(
  lenderId: number
) {
  return apiFetch(
    `/dashboard/recent-borrowers?lender_id=${lenderId}`
  );
}

export function getDashboardInsights(
  lenderId: number
) {
  return apiFetch(
    `/dashboard/insights?lender_id=${lenderId}`
  );
}

export function getWeeklyRepayments(
  lenderId: number
) {
  return apiFetch(
    `/dashboard/weekly-repayments?lender_id=${lenderId}`
  );
}

export function getMonthlyTrend(
  lenderId: number
) {
  return apiFetch(
    `/dashboard/monthly-trend?lender_id=${lenderId}`
  );
}

export function getDashboardAlerts(
  lenderId: number
) {
  return apiFetch(
    `/dashboard/alerts?lender_id=${lenderId}`
  );
}

export function getNotifications(
  lenderId: number
) {
  return apiFetch(
    `/dashboard/notifications?lender_id=${lenderId}`
  );
}

export function generateReminder(
  borrowerName: string
) {
  return apiFetch(
    `/dashboard/reminder/${borrowerName}`
  );
}

export function getAnalytics(
  lenderId: number
) {
  return apiFetch(
    `/dashboard/interest-recovery?lender_id=${lenderId}`
  );
}

export function getLandingInsight(
  lenderId: number
) {
  return apiFetch(
    `/dashboard/landing-insight?lender_id=${lenderId}`
  );
}

export function downloadPortfolioReport(
  lenderId: number
) {
  window.open(
    `${API_BASE_URL}/dashboard/portfolio-report/${lenderId}`,
    "_blank"
  );
}

export function downloadExcelReport(
  lenderId: number
) {
  window.open(
    `${API_BASE_URL}/dashboard/excel-report/${lenderId}`,
    "_blank"
  );
}

export function getPublicStats(
  lenderId: number
) {
  return apiFetch(
    `/dashboard/public-stats/${lenderId}`
  );
}