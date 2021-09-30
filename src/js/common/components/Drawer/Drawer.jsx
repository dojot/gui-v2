import React, { useCallback } from 'react';

import Drawer from '@material-ui/core/Drawer';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import logo from 'Assets/images/dojotLogo.png';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { useStyles } from './Drawer';

const DrawerComponent = props => {
  const classes = useStyles();

  const { isOpen, primaryItems, secondaryItems, location } = props;

  const activeRoute = useCallback(
    prop => {
      return location.pathname.indexOf(prop.path) > -1;
    },
    [location.pathname],
  );

  return (
    <Drawer
      variant='permanent'
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isOpen,
        [classes.drawerClose]: !isOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isOpen,
          [classes.drawerClose]: !isOpen,
          [classes.paperShadow]: true,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <img src={logo} alt='dojot logo' />
      </div>
      <MenuList disablePadding color='white'>
        {primaryItems.map(item =>
          item.visible ? (
            <Link to={item.path} className={classes.menuLink} key={item.label}>
              <MenuItem selected={activeRoute(item)} classes={{ selected: classes.selected }}>
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </MenuItem>
            </Link>
          ) : null,
        )}
      </MenuList>
      <MenuList className={classes.bottomList}>
        {secondaryItems.map(item =>
          item.visible ? (
            <Link to={item.path} className={classes.menuLink} key={item.label}>
              <MenuItem selected={activeRoute(item)} classes={{ selected: classes.selected }}>
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </MenuItem>
            </Link>
          ) : null,
        )}
      </MenuList>
    </Drawer>
  );
};

DrawerComponent.defaultProps = {
  secondaryItems: [],
  isOpen: true,
};

DrawerComponent.propTypes = {
  primaryItems: PropTypes.array.isRequired,
  secondaryItems: PropTypes.array,
  isOpen: PropTypes.bool,
};

export default withRouter(DrawerComponent);
