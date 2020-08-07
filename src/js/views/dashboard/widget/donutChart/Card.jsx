import React from 'react';

import Donut from 'Assets/images/donut.png';
import { ImageCard } from 'Components/Cards';
import { useTranslation } from 'react-i18next';

export default ({ onClick }) => {
  const { t } = useTranslation(['dashboard']);
  return (
    <ImageCard
      title={t('dashboard:donut.title')}
      image={Donut}
      description={t('dashboard:donut.description')}
      handleClick={() => onClick()}
    />
  );
};
