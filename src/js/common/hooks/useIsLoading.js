import { useSelector } from 'react-redux';

const loadingSelector = (...keys) => ({ loading: loadingReducer }) => {
  const loading = loadingReducer.get('loading');
  if (!loading) return false;

  if (keys.length === 1) {
    const [key] = keys;
    return !!loading && !!loading[key];
  }

  if (keys.length > 1) {
    const someKeysIsTruthy = Object.keys(loading).some(key => {
      const keyIsInKeysArray = keys.includes(key);
      return keyIsInKeysArray && !!loading[key];
    });

    return !!loading && someKeysIsTruthy;
  }

  return false;
};

export const useIsLoading = (...keys) => {
  return useSelector(loadingSelector(...keys));
};
