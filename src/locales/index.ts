import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocalStorage } from '../services/storage.service';
import { DEFAULT_LANGUAGE } from '../common/constants';

import en from './en.json';
import ar from './ar.json';
import am from './am.json';
import sw from './sw.json';

const lang = getLocalStorage(DEFAULT_LANGUAGE);
i18n.use(initReactI18next).init({
  resources: {
    ar: { translation: ar },
    am: { translation: am },
    sw: { translation: sw },
    en: { translation: en },
  },
  lng: lang,
  fallbackLng: 'ar',
  interpolation: {
    escapeValue: false,
  },
});
