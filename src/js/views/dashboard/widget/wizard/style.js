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
    zIndex: 999,
    backdropFilter: 'blur(4px)',
    marginLeft: -8,

    '& button': {
      margin: '0 10px',
    },
  },
}));
