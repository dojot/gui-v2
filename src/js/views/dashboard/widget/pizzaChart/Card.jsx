import React from 'react';

import Pizza from 'Assets/images/pizza.png';
import { ImageCard } from 'Components/Cards';
import { useTranslation } from 'react-i18next';

export default ({ onClick }) => {
  const { t } = useTranslation(['dashboard']);
  return (
    <ImageCard
      title={t('dashboard:pizza.title')}
      image={Pizza}
      description={t('dashboard:pizza.description')}
      handleClick={() => onClick()}
    />
  );
};
