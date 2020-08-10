import React from 'react';

import Bar from 'Assets/images/bar.png';
import { ImageCard } from 'Components/Cards';
import { useTranslation } from 'react-i18next';

export default ({ onClick }) => {
  const { t } = useTranslation(['dashboard']);
  return (
    <ImageCard
      title={t('dashboard:bar.title')}
      image={Bar}
      description={t('dashboard:bar.description')}
      handleClick={() => onClick()}
    />
  );
};
