export const getLocalStorage = (key: string): string => {
  return localStorage.getItem(key) || '';
};

export const setLocalStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const clearLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};
