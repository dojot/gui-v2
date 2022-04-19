import React from 'react';

import BarLight from 'Assets/images/bar.png';
import BarDark from 'Assets/images/bar.dark.png';
import { ImageCard } from 'sharedComponents/Cards';
import { useTranslation } from 'react-i18next';

export default ({ onClick }) => {
  const { t } = useTranslation(['dashboard']);
  return (
    <ImageCard
      title={t('dashboard:bar.title')}
      image={localStorage.getItem('THEME') === 'dark' ? BarDark : BarLight}
      description={t('dashboard:bar.description')}
      handleClick={() => onClick()}
    />
  );
};
