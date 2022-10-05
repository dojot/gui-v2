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
  loadingWrapper: {
    display: 'flex',
    gap: '10px',
  },
  devicesAmount: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  table: {
    border: `solid 1px ${theme.palette.divider}`,
  },
  tableRow: {
    opacity: 0.75,
  },
}));
