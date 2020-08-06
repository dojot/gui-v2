import React from 'react';

import Bar from 'Assets/images/bar.png';
import { ImageCard } from 'Components/Cards';
import { useTranslation } from 'react-i18next';

export default ({ onClick }) => {
  const { t } = useTranslation(['dashboard']);
  return (
    <ImageCard
      title={t('dashboard:card.bar.title')}
      image={Bar}
      description={t('dashboard:card.bar.description')}
      handleClick={() => onClick()}
    />
  );
};
