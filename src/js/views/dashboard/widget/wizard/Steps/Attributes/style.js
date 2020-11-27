import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.default,
    position: 'relative',
    zIndex: 999,
    '& .listTitle': {
      fontWeight: '500',
    },
    '& .listId': {
      fontSize: '0.8rem',
      color: '#9A9A9A',
      marginLeft: '1rem',
    },
  },
  searchContainer: {
    width: '100%',
    padding: '0 20px',
    margin: '20px auto',
  },
  listContainer: {
    padding: '0 20px',
  },
  notFound: {
    width: '100%',
    textAlign: 'center',

    '& span': {
      fontWeight: 700,
    },
  },
  paginationContainer: {
    marginTop: '20px',
  },
  button: {
    marginTop: 8,
    marginBottom: 4,
    marginLeft: 100,
  },
  picker: {
    position: 'absolute',
    top: 54,
    right: 0,
    zIndex: 999,
  },
  action: {
    transform: 'none',
    top: 0,
  },
}));
