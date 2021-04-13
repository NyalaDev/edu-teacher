import { LocaleStorage } from '../common/constants';

export const getLocalStorage = (key: string): string => {
  if (
    key === LocaleStorage.AUTH_TOKEN &&
    process.env.REACT_APP_AUTH_TOKEN &&
    process.env.NODE_ENV !== 'production'
  ) {
    return process.env.REACT_APP_AUTH_TOKEN;
  }
  return localStorage.getItem(key) || '';
};

export const setLocalStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const clearLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};
