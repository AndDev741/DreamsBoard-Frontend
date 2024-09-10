import i18n, { loadResources } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEn from './translations/en/translation.json';
import translationPt from './translations/pt/translation.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
       resources: {
            en: {
                translation: translationEn
            },
            pt: {
                translation: translationPt
            }
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        } 
    });

export default i18n;