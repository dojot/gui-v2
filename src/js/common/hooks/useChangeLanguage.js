import { useCallback, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { LANGUAGE_KEYS } from '../constants';

export const useChangeLanguage = () => {
  const { i18n } = useTranslation();

  const languages = useMemo(() => {
    if (i18n.options.resources) return Object.keys(i18n.options.resources);
    return [i18n.options.fallbackLng];
  }, [i18n.options.fallbackLng, i18n.options.resources]);

  // * i18n.changeLanguage is asynchronous, but since all resources are in the front-end (no need to download translations) the operation is very fast.
  const handleChangeLanguage = useCallback(
    async newLanguage => {
      if (i18n.language === newLanguage) return;
      await i18n.changeLanguage(newLanguage);
      localStorage.setItem(LANGUAGE_KEYS.LANGUAGE, newLanguage);
    },
    [i18n],
  );

  return {
    languages,
    handleChangeLanguage,
  };
};
