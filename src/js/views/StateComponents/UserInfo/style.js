import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  list: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    margin: '0 15px',
  },
  button: {
    textTransform: 'none',
  },
}));
