import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: 50,
    minHeight: 'calc(100% - 50px)',
    display: 'flex',
    flexDirection: 'column',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  paper: {
    backgroundColor: 'inherit',
  },
  form: {
    display: 'flex',
    flex: 1,
  },
  footer: {
    width: '100%',
    padding: '10px 0',
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 999,
    backdropFilter: 'blur(4px)',
    backgroundColor: 'rgb(250 250 250 / 30%)',

    '& button': {
      margin: '0 10px',
    },
  },
  expanded: {
    marginLeft: 215,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  collapsed: {
    marginLeft: 65,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));
