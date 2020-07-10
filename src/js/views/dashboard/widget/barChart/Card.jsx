import { ImageCard } from 'Components/Cards';
import React from 'react';
import Bar from 'Assets/images/bar.png';

export default props => {
  const { onClick } = props;
  return (
    <ImageCard
      title="Gráfico de Barras"
      image={Bar}
      description="Representa os dados por barras"
      handleClick={() => onClick()}
    />
  );
};
