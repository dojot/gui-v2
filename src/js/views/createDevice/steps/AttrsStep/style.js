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
    background: theme.palette.grey[200],
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

export const useAttrDataList = makeStyles(theme => ({
  container: {
    border: `1px solid ${theme.palette.grey[300]}`,
    background: theme.palette.grey[100],
    minHeight: '4rem',
    marginBottom: '1rem',
    paddingBottom: 0,
    userSelect: 'none',
  },
  header: {
    cursor: 'pointer',
  },
  title: {
    padding: theme.spacing(0, 2),
  },
  icon: {
    transition: 'transform .2s ease-in-out',
    transform: ({ isContentVisible }) => {
      return isContentVisible ? 'rotate(-90deg)' : 'rotate(0deg)';
    },
  },
}));
