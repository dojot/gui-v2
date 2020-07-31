import React from 'react';

import Table from 'Assets/images/table.svg';
import { ImageCard } from 'Components/Cards';
import Proptypes from 'prop-types';

const Card = props => {
  const { onClick } = props;
  return (
    <ImageCard
      title="Tabela"
      image={Table}
      description="Representa os dados por meio de uma estrutura tabular"
      handleClick={() => onClick()}
    />
  );
};

Card.propTypes = {
  onClick: Proptypes.func.isRequired,
};

export default Card;
