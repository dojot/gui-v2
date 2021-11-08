import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  content: {
    width: '60%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputNameCA: {
    marginBottom: theme.spacing(2),
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
