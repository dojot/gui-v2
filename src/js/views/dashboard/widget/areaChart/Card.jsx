import { ImageCard } from 'Components/Cards';
import React from 'react';
import Area from 'Assets/images/area.png';

export default props => {
  const { onClick } = props;
  return (
    <ImageCard
      title="Gráfico de Área"
      image={Area}
      description="Representa os dados por meio de uma área preenchida"
      handleClick={() => onClick()}
    />
  );
};
