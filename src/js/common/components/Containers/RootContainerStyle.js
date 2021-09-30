import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flex: 1,
  },
  content: {
    marginTop: 64,
    flexGrow: 1,
    padding: theme.spacing(1),
    width: '50%',
    position: 'relative',
  },
}));
