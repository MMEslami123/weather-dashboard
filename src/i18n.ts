import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import faTranslation from "./locales/fa.json"
import enTranslation from "./locales/en.json"
const resources = {
    en: {
        translation: enTranslation
    },
    fa: {
        translation: faTranslation
    }
}
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en",
        detection: {
            order: ['localStorage'],
            caches: ['localStorage'],
            lookupLocalStorage: 'i18nextLng',
        },
        interpolation: {
            escapeValue: false
        }
    })

const updateDirection = (lng: string) => {
    const dir = lng === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lng;
};

updateDirection(i18n.language || 'en');

i18n.on('languageChanged', (lng) => {
    updateDirection(lng);
});
export default i18n