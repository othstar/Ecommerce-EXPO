import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ka from "./ka.json";
import de from "./de.json";
import ch from "./ch.json";
import it from "./it.json";
import sp from "./sp.json";
import fr from "./fr.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const LANGUAGE_DETECTOR = {
  type: "languageDetector",
  async: true,

  detect: async (callback: (lang: string) => void) => {
    try {
      const savedLanguage = await AsyncStorage.getItem("LANGUAGE");
      if (savedLanguage) {
        callback(savedLanguage);
        return;
      }
    } catch (error) {
      console.log("Error reading language", error);
    }
    callback("en");
  },

  cacheUserLanguage: async (lang: string) => {
    try {
      await AsyncStorage.setItem("LANGUAGE", lang);
    } catch (error) {
      console.log("Error saving language", error);
    }
  },
};

i18n
  .use(LANGUAGE_DETECTOR as any)
  .use(initReactI18next)
  .init({
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
