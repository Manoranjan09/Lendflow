export function getLanguage() {
  return (
    localStorage.getItem("language") ||
    "en"
  );
}

export function setLanguage(
  language: string
) {
  localStorage.setItem(
    "language",
    language
  );

  window.location.reload();
}