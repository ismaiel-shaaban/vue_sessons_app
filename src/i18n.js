import { createI18n } from "vue-i18n";
import en from "./Locales/en.json";
import ar from "./Locales/ar.json";

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "en",
  fallbackLocale: "ar",
  messages: { en, ar },
  sync: true,
});

export default i18n;
