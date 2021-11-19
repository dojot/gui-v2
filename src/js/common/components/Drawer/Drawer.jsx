import React, { useState } from 'react';

import {
  Drawer,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Collapse,
} from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import logo from 'Assets/images/dojotLogo.png';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { useStyles } from './style';

const DrawerComponent = props => {
  const { isOpen, menuItems, location } = props;
  const classes = useStyles();
  const [collapsibleItemOpen, setCollapsibleItemOpen] = useState(false);

  const getActiveRoute = path => {
    return location.pathname.indexOf(path) > -1;
  };

  const toggleCollapsibleItem = label => {
    if (label === collapsibleItemOpen) {
      setCollapsibleItemOpen(null);
    } else {
      setCollapsibleItemOpen(label);
    }
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

          if (item.collapsible) {
            return (
              <>
                <MenuItem
                  onClick={() => toggleCollapsibleItem(item.label)}
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
                  {collapsibleItemOpen ? <ExpandLess /> : <ExpandMore />}
                </MenuItem>

                <Collapse in={collapsibleItemOpen && isOpen} timeout='auto'>
                  {item.subItems.map(subItem => {
                    const isSubItemSelected = getActiveRoute(subItem.path);

                    return (
                      <Link to={subItem.path} className={classes.menuLink} key={subItem.label}>
                        <MenuItem
                          selected={isSubItemSelected}
                          classes={{
                            root: isOpen ? classes.subItem : classes.closedSubItem,
                            selected: classes.subItemSelected,
                          }}
                        >
                          <ListItemText primary={subItem.label} />
                        </MenuItem>
                      </Link>
                    );
                  })}
                </Collapse>
              </>
            );
          }

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
