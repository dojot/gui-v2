// import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { ImageCard } from 'Components/Cards'
import Area from 'Assets/images/area.png'
import Donut from 'Assets/images/donut.png'
import Pizza from 'Assets/images/pizza.png'
import Bubble from 'Assets/images/bubble.png'
import { LineChartCard } from './lineChart/Card'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
    },
  }
})


const WidgetView = (props) => {
  const classes = useStyles()

  const handleClick = (id) => {
    const { history } = props
    history.push(`/dashboard/widget/wizard/${id}`)
  }

  return (
    <Grid container justify="flex-start" className={classes.root} spacing={4}>
      <LineChartCard onClick={() => handleClick(1)} />
      <ImageCard
        title="Gráfico de Área"
        image={Area}
        description="Representa os dados por meio de uma área preenchida"
        handleClick={() => handleClick(2)}
      />
      <ImageCard
        title="Gráfico de Pizza"
        image={Pizza}
        description="Cada categoria estatística representada é proporcional às respectivas frequências"
        handleClick={() => handleClick(3)}
      />
      <ImageCard
        title="Gráfico de Donut"
        image={Donut}
        description="Alternativa ao Gráfico de Pizza"
        handleClick={() => handleClick(4)}
      />
      <ImageCard
        title="Gráfico de Bolha"
        image={Bubble}
        description="Um gráfico de bolhas é uma variação de um gráfico de dispersão"
        handleClick={() => handleClick(5)}
      />
    </Grid>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetView)
