import React from 'react';

import TableLight from 'Assets/images/table.svg';
import TableDark from 'Assets/images/table.dark.png';
import { ImageCard } from 'sharedComponents/Cards';
import Proptypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Card = ({ onClick }) => {
  const { t } = useTranslation(['dashboard']);
  return (
    <ImageCard
      title={t('dashboard:table.title')}
      image={localStorage.getItem('THEME') === 'dark' ? TableDark : TableLight}
      description={t('dashboard:table.description')}
      handleClick={() => onClick()}
    />
  );
};

Card.propTypes = {
  onClick: Proptypes.func.isRequired,
};

export default Card;
