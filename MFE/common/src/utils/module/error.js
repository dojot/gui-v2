export const getErrorTranslation = (errors, defaultTranslation = '', translations = {}) => {
  if (!errors?.length) return defaultTranslation;
  if (!translations) return defaultTranslation;

  const { data } = errors[0];
  if (!data?.message) return defaultTranslation;

  const key = Object.keys(translations).find(e => data.message.includes(e));
  if (!key) return defaultTranslation;

  return translations[key];
};
