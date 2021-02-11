import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { useStyles } from './Style';

const AppHeader = props => {
  const classes = useStyles();
  const { isOpen, handleClick, title, children } = props;

  return (
    <AppBar
      position='fixed'
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isOpen,
      })}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={() => handleClick(!isOpen)}
          edge='start'
          data-testid='butonOpen'
          className={clsx(classes.menuButton, {
            [classes.hide]: isOpen,
          })}
        >
          <MenuIcon />
        </IconButton>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={() => handleClick(!isOpen)}
          edge='start'
          data-testid='butonNotOpen'
          className={clsx(classes.menuButton, {
            [classes.hide]: !isOpen,
          })}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant='h6' noWrap>
          {title}
        </Typography>
        <div className={classes.childActions}>{children}</div>
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
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default AppHeader;
