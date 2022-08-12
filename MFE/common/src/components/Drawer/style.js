import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 215;

export const useStyles = makeStyles(theme => {
  return {
    drawer: {
      flexShrink: 0,
      width: drawerWidth,
      whiteSpace: 'nowrap',
      zIndex: theme.zIndex.drawer + 1,
      overflowX: 'hidden',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create(['width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      width: theme.spacing(8) + 1,
      transition: theme.transitions.create(['width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    paperShadow: {
      boxShadow:
        '0px 1px 10px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14)',
      overflow: 'hidden',
      borderRight: 'solid 1px rgba(255,255,255,0.1)',
    },
    menuList: {
      overflowY: 'auto',
    },
    menuLink: {
      textDecoration: 'none',
      color: theme.palette.text.primary,
    },
    menuItem: {
      borderRadius: 100,
      margin: theme.spacing(0, 1.31, 1, 1.31),
      paddingRight: 12,
      paddingLeft: 12,
      color: theme.palette.text.primary,
      transition: theme.transitions.create(['borderRadius', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuClosedItem: {
      borderRadius: 100,
      margin: theme.spacing(0, 1.31, 1, 1.31),
      paddingRight: 10,
      paddingLeft: 10,
      transition: theme.transitions.create(['borderRadius', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    selected: {
      backgroundColor: `${theme.palette.primary.main} !important`,
      color: 'white',
    },
    subItem: {
      margin: theme.spacing(0, 0, 0, 0),
      paddingLeft: '72px',
      whiteSpace: 'nowrap',
    },
    closedSubItem: {
      display: 'none',
    },
    subItemSelected: {
      backgroundColor: 'transparent !important',
      color: theme.palette.primary.main,
    },
    icon: {
      color: theme.palette.text.secondary,
    },
    iconSelected: {
      color: 'white',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(0, 1),
      overflow: 'hidden',
      ...theme.mixins.toolbar,
    },
    logo: {
      width: '90px',
      userSelect: 'none',
      transition: theme.transitions.create(['width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    logoSmall: {
      width: '50px',
      userSelect: 'none',
      transition: theme.transitions.create(['width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  };
});
