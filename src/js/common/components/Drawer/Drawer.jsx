import React from 'react'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import logo from 'Assets/images/dojotLogo.png'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { useStyles } from './Drawer'

const DrawerComponent = (props) => {
  const classes = useStyles()
  const {
    isOpen, primaryItems, secondaryItems, handleChange,
  } = props
  const activeRoute = (prop) => {
    if (props.location.pathname.indexOf(prop.path) > -1) {
      handleChange(prop.label)
      return true
    }
    return false
  }

  return (
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
        <img src={logo} alt="dojot logo" />
      </div>
      <MenuList disablePadding>
        {primaryItems.map((item) => (
          <Link to={item.path} className={classes.menuLink} key={item.label}>
            <MenuItem
              selected={activeRoute(item)}
              className={clsx({ [classes.menuItemSelected]: activeRoute(item) })}
            >
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </MenuItem>
          </Link>
        ))}
      </MenuList>
      <MenuList className={classes.bottomList}>
        {secondaryItems.map((item) => (
          <Link to={item.path} className={classes.menuLink} key={item.label}>
            <MenuItem
              selected={activeRoute(item)}
              className={clsx({ [classes.menuItemSelected]: activeRoute(item) })}
            >
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </Drawer>
  )
}

DrawerComponent.defaultProps = {
  secondaryItems: [],
  isOpen: true,
  handleChange: () => {
  },
}

DrawerComponent.propTypes = {
  primaryItems: PropTypes.array.isRequired,
  secondaryItems: PropTypes.array,
  isOpen: PropTypes.bool,
  handleChange: PropTypes.func,
}

export default withRouter(DrawerComponent)
