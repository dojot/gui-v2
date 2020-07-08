import { ImageCard } from 'Components/Cards'
import React from 'react'
import Bubble from 'Assets/images/bubble.png'

export default (props) => {
  const { onClick } = props
  return (
    <ImageCard
      title="Gráfico de Bolha"
      image={Bubble}
      description="Um gráfico de bolhas é uma variação de um gráfico de dispersão"
      handleClick={() => onClick()}
    />
  )
}
