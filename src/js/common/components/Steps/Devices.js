import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.default,
    position: 'relative',
    zIndex: 999,
  },
  button: {
    marginTop: 8,
    marginBottom: 4,
    marginLeft: 100,
  },
  picker: {
    position: 'absolute',
    top: 54,
    right: 0,
    zIndex: 999,
  },
  action: {
    transform: 'none',
    top: 0,
  },
}));
