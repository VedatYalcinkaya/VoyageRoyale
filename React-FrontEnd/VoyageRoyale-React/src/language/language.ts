import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/english/en.json";
import trTranslation from "./locales/turkish/tr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    tr: {
      translation: trTranslation,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
