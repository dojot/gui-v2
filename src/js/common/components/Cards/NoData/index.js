import React from 'react';

import { useTranslation } from 'react-i18next';

import useStyles from './style';

const NoData = () => {
  const { root, text } = useStyles();
  const { t } = useTranslation(['common']);
  return (
    <div className={root}>
      <span className={text}>{t('common:noData')}</span>
    </div>
  );
};

export default NoData;
