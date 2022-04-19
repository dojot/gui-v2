import React from 'react';

import Bubble from 'Assets/images/bubble.png';
import { ImageCard } from 'sharedComponents/Cards';
import { useTranslation } from 'react-i18next';

export default ({ onClick }) => {
  const { t } = useTranslation(['dashboard']);
  return (
    <ImageCard
      title={t('dashboard:bubble.title')}
      image={Bubble}
      description={t('dashboard:bubble.description')}
      handleClick={() => onClick()}
    />
  );
};
