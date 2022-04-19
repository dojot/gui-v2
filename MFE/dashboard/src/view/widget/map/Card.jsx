import React from 'react';

import MapLight from 'Assets/images/map.png';
import MapDark from 'Assets/images/map.dark.png';
import { ImageCard } from 'sharedComponents/Cards';
import { useTranslation } from 'react-i18next';

export default ({ onClick }) => {
  const { t } = useTranslation(['dashboard']);
  return (
    <ImageCard
      title={t('dashboard:map.title')}
      image={localStorage.getItem('THEME') === 'dark' ? MapDark : MapLight}
      description={t('dashboard:map.description')}
      handleClick={() => onClick()}
    />
  );
};
