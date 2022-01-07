import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  collapsibleCard: {
    minHeight: 100,
    marginBottom: 50,
    width: '60%',
    alignSelf: 'center',
    cursor: 'pointer',
  },
  title: {
    fontWeight: 700,
  },
  subTitle: {
    fontSize: 14,
  },
  createCertificateOneClick: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
  },
  textLink: {
    color: '#7B92FF',
    textDecoration: 'underline',
  },
  createCertificateCSR: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
  },
  createCertificateCA: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
  },
  csrHelpLink: {
    color: '#F1B44C',
    textDecoration: 'underline',
    padding: theme.spacing(2),
  },
  generateCertificateButton: {
    width: 200,
    marginTop: theme.spacing(2),
  },
  filesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'space-between',
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
