import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  StepLine: {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    opacity: 0.5,
    '&.shorted': {
      opacity: 1,
      flex: 'none',
      height: 20,
    },
    '& div': {
      height: '90%',
      borderLeft: '2px solid',
      borderLeftColor: theme.palette.primary.main,
      marginLeft: '12px',
    },
  },
}));
