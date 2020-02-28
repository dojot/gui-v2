import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ArrowBack'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useStyles } from './AppHeader'


const AppHeader = (props) => {
  const classes = useStyles()
  const { isOpen, handleClick, title } = props

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isOpen,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => handleClick(!isOpen)}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: isOpen,
          })}
        >
          <MenuIcon />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => handleClick(!isOpen)}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: !isOpen,
          })}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        Usuário
      </Toolbar>
    </AppBar>
  )
}

AppHeader.defaultProps = {}

AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default AppHeader
