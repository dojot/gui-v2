import { useCallback } from 'react';

import { useHistory } from 'react-router-dom';

/**
 * A hook inspired by the useState hook to set the value in the URL search params.
 *
 * @param {string} options.key Search param name. Prefer short names since the URL has a length limitation
 * @param {string} options.type string | number | boolean - Only primitive values that can be stored in the URL
 * @param {*} options.defaultValue The default value. Can be any primitive value or a function that returns a primitive value
 *
 * @returns [value, setValue] - An array with the value and a function to set the value, similar to useState
 */
export const useSearchParamState = ({ key, type = 'string', defaultValue }) => {
  const history = useHistory();

  const handleFormatValueType = useCallback(
    value => {
      if (value === undefined) return value;

      switch (type) {
        case 'string':
          return String(value);
        case 'number':
          return Number(value);
        case 'boolean':
          return value === true || value === 'true';
        default:
          return value;
      }
    },
    [type],
  );

  const handleGetSearchParams = useCallback(() => {
    const searchParamsString = history.location.search;
    return searchParamsString ? new URLSearchParams(searchParamsString) : undefined;
  }, [history.location.search]);

  const handleGetDefaultValue = useCallback(() => {
    if (typeof defaultValue === 'function') return defaultValue();
    return defaultValue;
  }, [defaultValue]);

  const handleGetCurrentParamValue = useCallback(() => {
    if (!key) return handleGetDefaultValue();
    const searchParams = handleGetSearchParams();
    const paramValue = searchParams?.get(key);
    if (searchParams && paramValue) return handleFormatValueType(paramValue);
    return handleGetDefaultValue();
  }, [handleFormatValueType, handleGetDefaultValue, handleGetSearchParams, key]);

  const handleGetNewValue = useCallback((currentValue, valueChanger) => {
    if (typeof valueChanger === 'function') return valueChanger(currentValue);
    return valueChanger;
  }, []);

  const handleChangeValue = useCallback(
    valueChanger => {
      if (!key) return;

      const searchParams = handleGetSearchParams();

      let searchParamsString = '';
      if (searchParams) {
        const currentValue = handleGetCurrentParamValue();
        const newValue = handleGetNewValue(currentValue, valueChanger);
        if (newValue === '') searchParams.delete(key);
        else searchParams.set(key, newValue);
        searchParamsString = searchParams.toString();
      } else {
        const newValue = handleGetNewValue(undefined, valueChanger);
        const newSearchParams = new URLSearchParams({ [key]: newValue });
        searchParamsString = newSearchParams.toString();
      }

      history.push(`${history.location.pathname}?${searchParamsString}`);
    },
    [handleGetCurrentParamValue, handleGetNewValue, handleGetSearchParams, history, key],
  );

  return [handleGetCurrentParamValue(), handleChangeValue];
};
