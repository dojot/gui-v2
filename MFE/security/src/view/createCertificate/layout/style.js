import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  csrHelpLink: {
    color: '#F1B44C',
    textDecoration: 'underline',
    padding: theme.spacing(2),
    cursor: 'pointer',
  },
  csrHelpSteps: {
    userSelect: 'text',
    marginBottom: theme.spacing(2),
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
  inputCommand: {
    fontSize: 14,
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    width: 400,
  },
  successIcon: {
    color: theme.palette.success.main,
  },
  successMessage: {
    marginLeft: 8,
  },
}));
