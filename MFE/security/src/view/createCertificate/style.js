import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(4),
  },
  content: {
    flex: 1,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: '968px',
    width: '100%',
    margin: 'auto',
  },
  footer: {
    margin: 'auto',
    maxWidth: '968px',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  goToCertificatesButton: {
    marginLeft: theme.spacing(2),
  },
}));
