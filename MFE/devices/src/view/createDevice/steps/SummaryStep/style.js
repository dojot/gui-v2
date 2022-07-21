import { makeStyles } from '@material-ui/core/styles';

export const useSummaryStepStyles = makeStyles(() => ({
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
  certificateData: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    '& > :first-child': {
      minWidth: '16rem',
    },
  },
}));
