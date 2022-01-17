import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 215;

export const useStyles = makeStyles(theme => ({
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
    borderRight: 'none',
  },
  menuList: {
    overflowY: 'auto',
  },
  menuLink: {
    textDecoration: 'none',
    color: theme.palette.text.secondary,
  },
  menuItem: {
    borderRadius: '0 100px 100px 0',
    margin: theme.spacing(0, 1, 0, 0),
    color: theme.palette.text.secondary,
  },
  menuClosedItem: {
    borderRadius: '100%',
    height: '43px',
    minHeight: '43px',
    width: '43px',
    minWidth: '43px',
    margin: 'auto',
    padding: '0 10.5px',
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
}));
