import React from 'react';

import Table from 'Assets/images/table.svg';
import { ImageCard } from 'Components/Cards';
import Proptypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Card = ({ onClick }) => {
  const { t } = useTranslation(['dashboard']);
  return (
    <ImageCard
      title={t('dashboard:table.title')}
      image={Table}
      description={t('dashboard:table.description')}
      handleClick={() => onClick()}
    />
  );
};

Card.propTypes = {
  onClick: Proptypes.func.isRequired,
};

export default Card;
