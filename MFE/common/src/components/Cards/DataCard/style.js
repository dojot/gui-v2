import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    paddingBottom: 0,
  },
  content: {
    flex: 1,
    padding: theme.spacing(2, 2, 0, 2),
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
