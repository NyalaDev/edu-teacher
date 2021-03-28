import { useTranslation } from 'react-i18next';

import { setLocalStorage } from '../services/storage.service';
import { DEFAULT_LANGUAGE } from '../common/constants';

type HookReturnValues = {
  changeLanguage: (lang: string) => void;
  language: string;
  isRtl: boolean;
};

const useLanguage = (): HookReturnValues => {
  const { i18n } = useTranslation();
  const { language } = i18n;
  const isRtl = language === 'ar';

  const setCurrentLanguage = (locale: string) => {
    i18n.changeLanguage(locale);
    setLocalStorage(DEFAULT_LANGUAGE, locale);
  };

  return {
    changeLanguage: setCurrentLanguage,
    language,
    isRtl,
  };
};

export default useLanguage;
