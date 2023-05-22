import type { TLocalStorageKey } from './local-storage.helper.type';

const getLSValue = (key: TLocalStorageKey, logging = false): string | undefined => {
  const item = window.localStorage.getItem(key);
  let parsed: string | undefined;

  try {
    parsed = item !== null ? String(item) : undefined;
  } catch {
    if (logging) console.warn('No key in local storage, please clear cookies and refresh');
  }

  return parsed;
};

const setLSValue = (key: TLocalStorageKey, value: unknown): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const delLSValue = (key: TLocalStorageKey): void => {
  window.localStorage.removeItem(key);
};

export { getLSValue, setLSValue, delLSValue };
