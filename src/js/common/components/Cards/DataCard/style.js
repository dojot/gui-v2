import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  header: {
    paddingBottom: 0,
  },
  content: {
    padding: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(1, 2),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    '&:last-child': {
      padding: theme.spacing(1, 2),
    },
  },
}));
