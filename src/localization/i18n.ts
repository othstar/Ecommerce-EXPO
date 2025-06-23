import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ka from "./ka.json";
import de from "./de.json";
import ch from "./ch.json";
import it from "./it.json";
import sp from "./sp.json";
import fr from "./fr.json";

const LANGUAGES = {
  en: {
    translation: en,
  },
  ka: {
    translation: ka,
  },
  de: {
    translation: de,
  },
  ch: {
    translation: ch,
  },
  it: {
    translation: it,
  },
  sp: {
    translation: sp,
  },
  fr: {
    translation: fr,
  },
};

i18n.use(initReactI18next).init({
  resources: LANGUAGES,
  fallbackLng: "en",
  defaultNS: "translation",
  ns: ["translation"],
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
