import { ImageCard } from 'Components/Cards'
import Line from 'Assets/images/linha.png'
import React from 'react'

export default (props) => {
  const { onClick } = props
  return (
    <ImageCard
      title="Gráfico de Linhas"
      image={Line}
      description="Esse gráfico, por padrão, utiliza o tempo como medida da abscissa"
      handleClick={() => onClick()}
    />
  )
}
