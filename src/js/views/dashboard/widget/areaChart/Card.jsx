import React from 'react';

import Area from 'Assets/images/area.png';
import { ImageCard } from 'Components/Cards';
import { useTranslation } from 'react-i18next';

export default ({ onClick }) => {
  const { t } = useTranslation(['dashboard']);
  return (
    <ImageCard
      title={t('dashboard:card.area.title')}
      image={Area}
      description={t('dashboard:card.area.description')}
      handleClick={() => onClick()}
    />
  );
};
