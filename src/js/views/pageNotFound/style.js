import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  icon: {
    fontSize: '6rem',
    color: theme.palette.error.main,
  },
  title: {
    fontWeight: 'bold',
  },
}));
