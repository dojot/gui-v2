import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  list: {
    minWidth: 160,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
  },
  listItemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    margin: '0 15px',
  },
  button: {
    textTransform: 'capitalize',
  },
  paper: {},
}));
