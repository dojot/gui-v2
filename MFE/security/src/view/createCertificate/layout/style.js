import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  csrHelpLink: {
    color: theme.palette.secondary.main,
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
    textDecoration: 'underline',
    gap: 10,
    fontSize: 16,
    color: theme.palette.primary.light,
  },
  certificateAndKeysTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontSize: 16,
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
  warningIcon: {
    color: theme.palette.warning.dark,
  },
}));
