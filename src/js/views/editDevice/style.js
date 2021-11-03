import { makeStyles } from '@material-ui/core/styles';

export const useEditDeviceStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
  },
  content: {
    flex: '1',
    width: '100%',
    maxWidth: '1268px',
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    flex: '1',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    margin: '0 -8px',
    '& > *': {
      margin: '0 8px',
    },
  },
  input: {
    width: '100%',
  },
  emptyList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListText: {
    fontStyle: 'italic',
  },
}));

export const useAttrsTableStyles = makeStyles(theme => ({
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
