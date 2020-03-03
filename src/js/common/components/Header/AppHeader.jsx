import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ArrowBack';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx'
import { useStyles } from './AppHeader'


export default (props) => {
  const classes = useStyles()
  const { isOpen, handleClick } = props;

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
        <Typography
          className={classes.title}
          variant="h6"
          noWrap
        >
          Dashboard
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
