import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 215

export const useStyles = makeStyles((theme) => ({
  drawer: {
    zIndex: theme.zIndex.drawer + 1,
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    overflowX: 'hidden',
    width: theme.spacing(8) + 1,
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  paperShadow: {
    boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14)',
    overflow: 'hidden',
  },
  menuLink: {
    textDecoration: 'none',
    color: theme.palette.text.secondary,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    overflow: 'hidden',
    ...theme.mixins.toolbar,
  },
  bottomList: {
    marginTop: 'auto',
  },
}))
