import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 215;

export const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.header,
    zIndex: theme.zIndex.drawer + 2,
    boxShadow: 'none',
    width: '100%',
    borderBottom: theme.palette.type === 'dark' ? `solid 1px ${theme.palette.divider}` : 'none',
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
    display: 'flex',
    flexWrap: 'wrap',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  title: {
    marginLeft: '8px',
  },
}));
