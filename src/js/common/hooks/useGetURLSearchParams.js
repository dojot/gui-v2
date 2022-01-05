import { useHistory } from 'react-router-dom';

/**
 * Gets the history search, transform it in an object and return.
 *
 * WARNING: The returned object contains only strings.
 *
 * @returns {object} Search params object with ONLY STRINGS
 */
export const useGetURLSearchParams = () => {
  const history = useHistory();

  if (history.location.search) {
    const searchParams = new URLSearchParams(history.location.search);
    return Object.fromEntries(searchParams);
  }

  return undefined;
};
