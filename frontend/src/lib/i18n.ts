import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      overview: "Overview",
      borrowers: "Borrowers",
      loans: "Loans",
      analytics: "Analytics",
      settings: "Settings",
    },
  },

  hi: {
    translation: {
      overview: "डैशबोर्ड",
      borrowers: "उधारकर्ता",
      loans: "ऋण",
      analytics: "विश्लेषण",
      settings: "सेटिंग्स",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng:
      localStorage.getItem(
        "language"
      ) || "en",

    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;