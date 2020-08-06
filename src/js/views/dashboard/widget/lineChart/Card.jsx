import React from 'react';

import Line from 'Assets/images/linha.png';
import { ImageCard } from 'Components/Cards';
import { useTranslation } from 'react-i18next';

export default ({ onClick }) => {
  const { t } = useTranslation(['dashboard']);
  return (
    <ImageCard
      title={t('dashboard:card.line.title')}
      image={Line}
      description={t('dashboard:card.line.description')}
      handleClick={() => onClick()}
    />
  );
};
