import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 215;

export const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.primary,
    zIndex: theme.zIndex.drawer,
    boxShadow: 'none',
    width: `calc(100% - ${theme.spacing(8) + 1}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    backgroundColor: theme.palette.primary,
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  childActions: {
    marginLeft: 'auto',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  title: {
    flexGrow: 1,
  },
}));
