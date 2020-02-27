import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Dashboard from '@material-ui/icons/Dashboard'
import logo from 'Assets/images/dojotLogo.png'
import { useStyles } from './Drawer'

const DrawerComponent = (props) => {
  const classes = useStyles();
  const { isOpen, handleClick } = props;

  const handleDrawerOpen = () => {
    handleClick(!isOpen);
  };

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
      <List>
        {['Dashboard', 'Dispositivos', 'Modelos', 'Fluxos', 'Notificações', 'Usuários', 'Perfis'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <List className={classes.bottomList}>
        {['Ajuda', 'Sair'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <Dashboard /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default DrawerComponent;
