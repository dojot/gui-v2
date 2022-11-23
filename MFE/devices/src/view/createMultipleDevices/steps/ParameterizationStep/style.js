import { makeStyles } from '@material-ui/core/styles';

export const useParameterizationStepStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.main,
    '&:hover': {
      background: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
    },
  },
  headerButtonSuccess: {
    color: theme.palette.primary.contrastText,
    background: theme.palette.success.main,
    '&:hover': {
      color: theme.palette.primary.contrastText,
      background: theme.palette.success.main,
    },
  },
  stepHint: {
    fontSize: '18px',
  },
  stepComponent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  templateCreation: {
    flex: 1,
  },
  tooltip: {
    fontSize: '1rem',
  },
  devicesAmountInput: {
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
}));
