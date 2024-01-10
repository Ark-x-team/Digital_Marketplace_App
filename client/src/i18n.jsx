import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translation/en.json";
import fr from "./translation/fr.json";

// the translations
const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
