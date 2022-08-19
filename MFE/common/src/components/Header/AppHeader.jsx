import React from 'react';

import { Toolbar, AppBar, IconButton, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

import PropTypes from 'prop-types';

import { useStyles } from './Style';

const AppHeader = props => {
  const classes = useStyles();
  const { isOpen, handleClick, title, children } = props;

  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={() => handleClick(!isOpen)}
          edge='start'
          data-testid='butonOpen'
          className={classes.menuButton}
        >
          <Menu />
        </IconButton>

        <Typography variant='h6' noWrap className={classes.title}>
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
