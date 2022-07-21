import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: 50,
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'row',
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
    flexDirection: 'column',
    width: '100%',
    maxWidth: '1268px',
    margin: '0 auto',
    padding: '16px',
  },
  formContent: {
    display: 'flex',
    flex: 1,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  footerButton: {
    marginLeft: '16px',
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
  stepper: {
    background: theme.palette.background.default,
  },
  developmentContainer: {
    padding: '0 0 0 24px',
    maxWidth: '400px',
    wordBreak: 'break-all',
    whiteSpace: 'pre-wrap',
  },
}));
