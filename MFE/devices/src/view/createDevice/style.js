import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  stepperWrapper: {
    width: '100%',
    maxWidth: '1268px',
    margin: '0 auto',
    marginBottom: '24px',
    padding: '16px 0',
  },
  step: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  stepContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1268px',
    width: '100%',
    margin: '0 auto',
  },
}));
