import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100%',
    height: '100%',
  },
  content: {
    width: '60%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '2rem 0',
  },
  bottomButtonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: theme.spacing(4),
  },
  saveButton: {
    marginLeft: theme.spacing(4),
  },
}));
