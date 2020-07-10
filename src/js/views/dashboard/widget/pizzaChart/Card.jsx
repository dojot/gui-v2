import { ImageCard } from "Components/Cards"
import React from "react"
import Pizza from "Assets/images/pizza.png"

export default props => {
  const { onClick } = props
  return (
    <ImageCard
      title="Gráfico de Pizza"
      image={Pizza}
      description="Cada categoria estatística representada é proporcional às respectivas frequências"
      handleClick={() => onClick()}
    />
  )
}
