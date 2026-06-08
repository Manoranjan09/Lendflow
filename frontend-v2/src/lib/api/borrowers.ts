import { apiFetch } from "./client";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000";

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

export function deleteBorrower(
  borrowerId: number
) {
  return apiFetch(
    `/borrowers/${borrowerId}`,
    {
      method: "DELETE",
    }
  );
}

export function updateBorrower(
  id: number,
  data: any
) {
  return apiFetch(
    `/borrowers/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
}

export function getBorrowerProfile(
  borrowerId: number
) {
  return apiFetch(
    `/borrowers/${borrowerId}/profile`
  );
}

export function downloadBorrowerStatement(
  borrowerId: number
) {
  window.open(
    `${API_BASE_URL}/borrowers/${borrowerId}/statement`,
    "_blank"
  );
}

export function getBorrowerRisk(
  borrowerId: number
) {
  return apiFetch(
    `/borrowers/${borrowerId}/risk`
  );
}

export function getBorrowerDocuments(
  borrowerId: number
) {
  return apiFetch(
    `/borrowers/${borrowerId}/documents`
  );
}

export async function uploadBorrowerDocument(
  borrowerId: number,
  formData: FormData
) {
  const response = await fetch(
    `${API_BASE_URL}/borrowers/${borrowerId}/documents`,
    {
      method: "POST",
      body: formData,
    }
  );

  return response.json();
}

export function viewDocument(
  documentId: number
) {
  window.open(
    `${API_BASE_URL}/borrowers/documents/${documentId}`,
    "_blank"
  );
}

export function deleteDocument(
  documentId: number
) {
  return apiFetch(
    `/borrowers/documents/${documentId}`,
    {
      method: "DELETE",
    }
  );
}