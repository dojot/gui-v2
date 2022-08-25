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
      width: 20,
      height: 2,
    },
    '& div': {
      width: '90% !important',
      height: 2,
      backgroundColor: theme.palette.secondary.dark,
      marginLeft: '12px',
    },
  },
}));
