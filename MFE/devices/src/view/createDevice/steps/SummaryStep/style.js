import { makeStyles } from '@material-ui/core/styles';

export const useSummaryStepStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  content: {
    flex: 1,
  },
  deviceNameHint: {
    fontSize: '18px',
  },
  warningIcon: {
    color: '#F1B44C',
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
}));
