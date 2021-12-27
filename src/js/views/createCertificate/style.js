import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  content: {
    flex: 1,
    display: 'flex',
    alignItems: 'cener',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  footer: {
    width: '60vw',
    alignSelf: 'center',
    padding: theme.spacing(4, 0),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    margin: theme.spacing(0, 4),
  },
}));
