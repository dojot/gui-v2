import React from 'react';

import Bubble from 'Assets/images/bubble.png';
import { ImageCard } from 'Components/Cards';
import { useTranslation } from 'react-i18next';

export default ({ onClick }) => {
  const { t } = useTranslation(['dashboard']);
  return (
    <ImageCard
      title={t('dashboard:card.bubble.title')}
      image={Bubble}
      description={t('dashboard:card.bubble.description')}
      handleClick={() => onClick()}
    />
  );
};
