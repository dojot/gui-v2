import { ImageCard } from "Components/Cards"
import React from "react"
import Donut from "Assets/images/donut.png"

export default props => {
  const { onClick } = props
  return (
    <ImageCard
      title="Gráfico de Donut"
      image={Donut}
      description="Alternativa ao Gráfico de Pizza"
      handleClick={() => onClick()}
    />
  )
}
