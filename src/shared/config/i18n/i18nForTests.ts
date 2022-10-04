import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        lng: 'uk',
        fallbackLng: 'uk',
        debug: false,

        interpolation: {
            escapeValue: false, // not needed for react!!
        },

        resources: { uk: { translations: {} } },
    });

export default i18n;
