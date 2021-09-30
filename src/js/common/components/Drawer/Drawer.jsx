import React from 'react';

import { Drawer, ListItemIcon, ListItemText, MenuItem, MenuList } from '@material-ui/core';
import logo from 'Assets/images/dojotLogo.png';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { useStyles } from './style';

const DrawerComponent = props => {
  const { isOpen, menuItems, location } = props;
  const classes = useStyles();

  const getActiveRoute = path => {
    return location.pathname.indexOf(path) > -1;
  };

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
        <img
          className={isOpen ? classes.logo : classes.logoSmall}
          draggable={false}
          alt='Dojot logo'
          src={logo}
        />
      </div>

      <MenuList className={classes.menuList} disablePadding>
        {menuItems.map(item => {
          if (!item.visible) return null;

          const isSelected = getActiveRoute(item.path);

          return (
            <Link to={item.path} className={classes.menuLink} key={item.label}>
              <MenuItem
                selected={isSelected}
                classes={{
                  root: isOpen ? classes.menuItem : classes.menuClosedItem,
                  selected: classes.selected,
                }}
              >
                <ListItemIcon>
                  <item.icon className={isSelected ? classes.iconSelected : classes.icon} />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </MenuItem>
            </Link>
          );
        })}
      </MenuList>
    </Drawer>
  );
};

DrawerComponent.defaultProps = {
  isOpen: true,
};

DrawerComponent.propTypes = {
  menuItems: PropTypes.array.isRequired,
  isOpen: PropTypes.bool,
};

export default withRouter(DrawerComponent);
