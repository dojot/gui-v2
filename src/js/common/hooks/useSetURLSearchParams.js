import { useEffect } from 'react';

import { useHistory } from 'react-router-dom';

/**
 * Set URL search params every time the searchParamsObject variable changes.
 *
 * Prefer to use single character attributes in the searchParamsObject, because the URL has a limit of characters.
 *
 * @param {object} searchParamsObject A object with JS primitive values only (string, number, boolean)
 */
export const useSetURLSearchParams = searchParamsObject => {
  const history = useHistory();

  useEffect(() => {
    if (!searchParamsObject || typeof searchParamsObject !== 'object') return;

    const nonEmptyQueryParams = { ...searchParamsObject };
    Object.entries(nonEmptyQueryParams).forEach(([key, value]) => {
      const isUndefinedOrNull = value === undefined || value === null;
      const isFunction = typeof value === 'function';
      const isObject = typeof value === 'object';
      const isArray = Array.isArray(value);
      const isEmptyString = value === '';
      if (isUndefinedOrNull || isFunction || isObject || isArray || isEmptyString) {
        delete nonEmptyQueryParams[key];
      }
    });

    const params = new URLSearchParams(nonEmptyQueryParams).toString();
    const isParamsDifferent = `?${params}` !== history.location.search;

    if (params && isParamsDifferent) {
      history.push(`${history.location.pathname}?${params}`);
    }
  }, [history, searchParamsObject]);
};
