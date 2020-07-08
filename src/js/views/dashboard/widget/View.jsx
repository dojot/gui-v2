// import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { LineChartCard } from './lineChart'
import { AreaChartCard } from './areaChart'
import { BarChartCard } from './barChart'
import { PizzaChartCard } from './pizzaChart'
import { DonutChartCard } from './donutChart'
import { BubbleChartCard } from './bubbleChart'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
    },
  }
})

const WidgetView = (props) => {
  const classes = useStyles()

  const {
    line, area, bar, pizza, donut, bubble,
  } = __CONFIG__;

  const handleClick = (id) => {
    const { history } = props
    history.push(`/dashboard/widget/wizard/${id}`)
  }

  return (
    <Grid container justify="flex-start" className={classes.root}>
      <LineChartCard onClick={() => handleClick(line)} />
      <AreaChartCard onClick={() => handleClick(area)} />
      <PizzaChartCard onClick={() => handleClick(pizza)} />
      <DonutChartCard onClick={() => handleClick(donut)} />
      <BubbleChartCard onClick={() => handleClick(bubble)} />
      <BarChartCard onClick={() => handleClick(bar)} />
    </Grid>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetView)
