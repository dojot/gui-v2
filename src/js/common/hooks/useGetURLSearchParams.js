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

  // Get the search string without the "?" character
  const searchParams = history.location.search.slice(1);
  if (!searchParams) return undefined;

  return Object.fromEntries(new URLSearchParams(searchParams));
};
