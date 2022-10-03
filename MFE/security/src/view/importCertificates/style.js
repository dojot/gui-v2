import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '0 32px',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1268px',
    width: '100%',
    margin: '0 auto',
  },
  formTitle: {
    fontWeight: 500,
  },
  actionButtonsWrapper: {
    margin: '0 32px',
    paddingBottom: '16px',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1268px',
    width: '100%',
    margin: '0 auto',
  },
  caRootWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  certificatesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
}));
