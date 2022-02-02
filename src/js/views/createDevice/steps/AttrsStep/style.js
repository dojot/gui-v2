import { makeStyles } from '@material-ui/core/styles';

export const useAttrsStepStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  content: {
    flex: 1,
  },
  header: {
    minHeight: '3rem',
    display: 'flex',
    alignItems: 'center',
  },
  tableHead: {
    textTransform: 'uppercase',
    background: theme.palette.background.shade[500],
  },
  tableBody: {
    '& > tr:last-child td': {
      borderBottom: 'none',
    },
    '& > tr': {
      height: '4rem',
    },
  },
  input: {
    width: '100%',
  },
}));
