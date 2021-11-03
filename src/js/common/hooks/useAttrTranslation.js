import { useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { TEMPLATE_ATTR_TYPES, TEMPLATE_ATTR_VALUE_TYPES } from '../constants';

const ATTR_TYPE_TRANSLATIONS = {};
Object.values(TEMPLATE_ATTR_TYPES).forEach(({ value, translation }) => {
  ATTR_TYPE_TRANSLATIONS[value] = translation;
});

const ATTR_VALUE_TYPE_TRANSLATIONS = {};
Object.values(TEMPLATE_ATTR_VALUE_TYPES).forEach(({ value, translation }) => {
  ATTR_VALUE_TYPE_TRANSLATIONS[value] = translation;
});

export const useAttrTranslation = () => {
  const { t } = useTranslation('attrs');

  const getAttrTypeTranslation = useCallback(
    attrType => {
      const typeTranslation = ATTR_TYPE_TRANSLATIONS[attrType];
      if (typeTranslation) return t(typeTranslation);
      return attrType;
    },
    [t],
  );

  const getAttrValueTypeTranslation = useCallback(
    attrValueType => {
      const valueTranslation = ATTR_VALUE_TYPE_TRANSLATIONS[attrValueType];
      if (valueTranslation) return t(valueTranslation);
      return attrValueType;
    },
    [t],
  );

  return {
    getAttrTypeTranslation,
    getAttrValueTypeTranslation,
  };
};
