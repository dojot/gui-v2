import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useStyles } from './Style';
// import AccountCircle from '@material-ui/icons/AccountCircle'

const AppHeader = props => {
  const classes = useStyles();
  const { isOpen, handleClick, title, children } = props;

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
        <div className={classes.childActions}>{children}</div>
        {/* <IconButton */}
        {/*  aria-label="account of current user" */}
        {/*  aria-controls="menu-appbar" */}
        {/*  aria-haspopup="true" */}
        {/*  color="inherit" */}
        {/* > */}
        {/*  <AccountCircle /> */}
        {/* </IconButton> */}
        {/* Usuário */}
      </Toolbar>
    </AppBar>
  );
};

AppHeader.defaultProps = {
  children: React.createElement('div'),
};

AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.element,
};

export default AppHeader;
