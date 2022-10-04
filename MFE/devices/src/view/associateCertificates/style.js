import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  containerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: '16px',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1268px',
    width: '100%',
    margin: '0 auto',
  },
  associatingStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  fieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    backgroundColor: theme.palette.header,
  },
  bottomButtonWrapper: {
    maxWidth: '1268px',
    width: '100%',
    margin: '0 auto',
  },
}));
