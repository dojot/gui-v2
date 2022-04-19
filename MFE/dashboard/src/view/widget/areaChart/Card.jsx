import React from 'react';

import AreaLight from 'Assets/images/area.png';
import AreaDark from 'Assets/images/area.dark.png';
import { ImageCard } from 'sharedComponents/Cards';
import { useTranslation } from 'react-i18next';

export default ({ onClick }) => {
  const { t } = useTranslation(['dashboard']);
  return (
    <ImageCard
      title={t('dashboard:area.title')}
      image={localStorage.getItem('THEME') === 'dark' ? AreaDark : AreaLight}
      description={t('dashboard:area.description')}
      handleClick={() => onClick()}
    />
  );
};
