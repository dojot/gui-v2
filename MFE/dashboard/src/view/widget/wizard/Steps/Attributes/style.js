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
    '--red': 250,
    '--green': 250,
    '--blue': 250,
    '--r': 'calc(var(--red) * 0.2126)',
    '--g': 'calc(var(--green) * 0.7152)',
    '--b': 'calc(var(--blue) * 0.0722)',
    '--sum': 'calc(var(--r) + var(--g) + var(--b))',
    '--perceived-lightness': 'calc(var(--sum) / 255)',
    backgroundColor: 'rgb(var(--red), var(--green), var(--blue))',
    color: 'hsl(0, 0%, calc((var(--perceived-lightness) - 0.5) * -10000000%))',
    border: 'solid 1px hsla(0, 0%, calc((var(--perceived-lightness) - 0.5) * -10000000%), 0.23)',

    '&:hover': {
      backgroundColor: 'rgba(var(--red), var(--green), var(--blue), 0.94)',
      textDecoration: 'none',
    },
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
