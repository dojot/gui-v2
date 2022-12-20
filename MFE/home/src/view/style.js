import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  card: {
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    border: 'solid 1px rgba(255,255,255,0.1)',
  },
  cardContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cardDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  headerWithDivider: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  divider: {
    background: theme.palette.divider,
    flex: 1,
    height: 2,
    alignSelf: 'center',
  },
  favoriteCard: {
    height: '100%',
    cursor: 'pointer',
    transition: 'background 0.1s ease-in-out',
    '&:hover': {
      background: theme.palette.action.hover,
    },
  },
  cardIcon: {
    fontSize: '40px',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  cardFooter: {
    '& > *:not(:first-child)': {
      marginLeft: 4,
    },
  },
}));
