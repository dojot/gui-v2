import React from 'react';

import LineLight from 'Assets/images/linha.png';
import LineDark from 'Assets/images/linha.dark.png';
import { ImageCard } from 'sharedComponents/Cards';
import { useTranslation } from 'react-i18next';

export default ({ onClick }) => {
  const { t } = useTranslation(['dashboard']);
  return (
    <ImageCard
      title={t('dashboard:line.title')}
      image={localStorage.getItem('THEME') === 'dark' ? LineDark : LineLight}
      description={t('dashboard:line.description')}
      handleClick={() => onClick()}
    />
  );
};
