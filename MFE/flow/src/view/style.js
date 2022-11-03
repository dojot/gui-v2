import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  card: {
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    border: 'solid 1px rgba(255,255,255,0.1)'
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
}));
