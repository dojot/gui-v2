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
import darkLogo from 'Assets/images/dojotLogo.png';
import lightLogo from 'Assets/images/dojotLogoWhite.png';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link, withRouter, useHistory } from 'react-router-dom';

import { useStyles } from './style';

const DrawerComponent = ({ isOpen, menuItems, location }) => {
    const { t } = useTranslation('menu');
    const history = useHistory();
    const classes = useStyles();

    const [collapsedItems, setCollapsedItems] = useState({});

    const getActiveRoute = path => {
        return location.pathname.indexOf(path) > -1;
    };

    const handleToggleCollapsibleItem = label => {
        setCollapsedItems(currentCollapsedItems => {
            const collapsedItemsClone = { ...currentCollapsedItems };
            collapsedItemsClone[label] = !collapsedItemsClone[label];
            return collapsedItemsClone;
        });
    };

    return (
        <>
            <Drawer
                variant="permanent"
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
                        alt="Dojot logo"
                        src={localStorage.getItem('THEME') === 'dark' ? lightLogo: darkLogo}
                    />
                </div>

                <MenuList className={classes.menuList} disablePadding>
                    {menuItems.map(item => {
                        if(!item.visible) return null;

                        if(item.collapsible && item.subItems) {
                            const isCollapsed = collapsedItems[item.name];

                            const hasSelectedSubItem = item.subItems.find(subItem => {
                                return getActiveRoute(subItem.path);
                            });

                            const handleToggleCollapsibleItems = () => {
                                handleToggleCollapsibleItem(item.name);
                            };

                            const handleGoToSubItems = () => {
                                const notSelectedSubItem = item.subItems.find(subItem => {
                                    return !getActiveRoute(subItem.path);
                                });

                                if(notSelectedSubItem) history.push(notSelectedSubItem.path);
                            };

                            return (
                                <div key={item.name}>
                                    <MenuItem
                                        selected={!!hasSelectedSubItem}
                                        onClick={isOpen ? handleToggleCollapsibleItems : handleGoToSubItems}
                                        classes={{
                                            root: isOpen ? classes.menuItem : classes.menuClosedItem,
                                            selected: classes.selected,
                                        }}
                                    >
                                        <ListItemIcon>
                                            <item.icon
                                                className={hasSelectedSubItem ? classes.iconSelected : classes.icon}
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary={t(item.name)}/>
                                        {isCollapsed ? <ExpandLess/> : <ExpandMore/>}
                                    </MenuItem>

                                    <Collapse in={isCollapsed && isOpen} timeout="auto">
                                        {item.subItems.map(subItem => {
                                            const isSubItemSelected = getActiveRoute(subItem.path);

                                            return (
                                                <Link key={subItem.name} to={subItem.path} className={classes.menuLink}>
                                                    <MenuItem
                                                        selected={isSubItemSelected}
                                                        classes={{
                                                            root: isOpen ? classes.subItem : classes.closedSubItem,
                                                            selected: classes.subItemSelected,
                                                        }}
                                                    >
                                                        <ListItemText primary={t(subItem.name)}/>
                                                    </MenuItem>
                                                </Link>
                                            );
                                        })}
                                    </Collapse>
                                </div>
                            );
                        }

                        const isSelected = getActiveRoute(item.path);

                        return (
                            <Link key={item.name} to={item.path} className={classes.menuLink}>
                                <MenuItem
                                    selected={isSelected}
                                    classes={{
                                        root: isOpen ? classes.menuItem : classes.menuClosedItem,
                                        selected: classes.selected,
                                    }}
                                >
                                    <ListItemIcon>
                                        <item.icon className={isSelected ? classes.iconSelected : classes.icon}/>
                                    </ListItemIcon>
                                    <ListItemText primary={t(item.name)}/>
                                </MenuItem>
                            </Link>
                        );
                    })}
                </MenuList>
            </Drawer>
        </>
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
