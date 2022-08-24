import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  CustomStepIcon: {
    backgroundColor: 'transparent',
    border: '2px solid',
    borderColor: theme.palette.secondary.dark,
    borderRadius: '50%',
    width: 24,
    height: 24,
    display: 'grid',
    placeItems: 'center',
    margin: 0,
    padding: 0,
    opacity: '0.5',

    '&.completed': {
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.primary.contrastText,
      borderColor: 'transparent',
      opacity: '1',
    },
    '&.active': {
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.primary.contrastText,
      borderColor: 'transparent',
      transform: 'scale(1.2)',
      opacity: '1',
    },
  },
}));
