import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Languages we support
const supportedLngs = ["en", "ar"];

i18n
  .use(HttpApi) // load translations via http (default public/locales)
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass to react-i18next
  .init({
    supportedLngs,
    fallbackLng: "en",
    debug: false,

    // If you changed "common" → "translate", set defaultNS here
    ns: ["translate"], // namespaces we support
    defaultNS: "translate", // default namespace

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },

    detection: {
      order: ["localStorage", "cookie", "navigator"],
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false, // react already escapes
    },
  });

// Handle <html dir> for RTL languages
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
});

export default i18n;
