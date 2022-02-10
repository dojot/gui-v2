import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  csrHelpLink: {
    color: '#F1B44C',
    textDecoration: 'underline',
    padding: theme.spacing(2),
  },
  csrHelpSteps: {
    userSelect: 'text',
  },
  generateCertificateButton: {
    width: 200,
    marginTop: theme.spacing(2),
  },
  certificateData: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    '& > :first-child': {
      minWidth: '16rem',
    },
  },
}));
