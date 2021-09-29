import { useCallback, useEffect, useState } from 'react';

/**
 * Save the value on local storage when it changes and get from local storage when the hook is mounted.
 *
 * @param {object} params Params
 * @param {string} params.key Local storage key
 * @param {string} params.defaultValue Default value
 * @param {boolean} params.isJson Is the value a JSON
 * @returns {Array} [value, setValue, handleClearValue]
 */
export const usePersistentState = ({ key, defaultValue, isJson = false }) => {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);
    if (!data) return defaultValue;
    if (isJson) return JSON.parse(data) || defaultValue;
    return data || defaultValue;
  });

  const handleRestoreDefault = useCallback(() => {
    localStorage.removeItem(key);
    setValue(defaultValue);
  }, [defaultValue, key]);

  useEffect(() => {
    if (value) {
      localStorage.setItem(key, isJson ? JSON.stringify(value) : value);
    } else {
      localStorage.removeItem(key);
    }
  }, [isJson, key, value]);

  return [value, setValue, handleRestoreDefault];
};
