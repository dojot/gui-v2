import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: 50,
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
  footer: {
    width: '100%',
    padding: '10px 0',
    position: 'fixed',
    bottom: 0,
    zIndex: 999,
    backdropFilter: 'blur(4px)',

    '& button': {
      margin: '0 10px',
    },
  },
}));
