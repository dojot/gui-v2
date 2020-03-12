import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
    },
  }
})


const ExampleView = (props) => {
  const classes = useStyles()

  const handleClick = () => {
    const { history } = props
    history.push('/dashboard/widget')
  }

  return (
    <Grid container justify="flex-start" className={classes.root} spacing={4}>
      <Button variant="outlined" color="primary" onClick={() => handleClick()}> TESTE </Button>
    </Grid>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExampleView)
