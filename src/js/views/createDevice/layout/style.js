import { makeStyles } from '@material-ui/core/styles';

export const useActionButtonStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: '0 -16px',
    '& > *': {
      margin: '0 16px',
    },
  },
  cancelButtonLeftAligned: {
    marginRight: 'auto',
  },
}));

export const useDeviceWizardStepperStyles = makeStyles(theme => ({
  stepper: {
    height: '100%',
    background: theme.palette.background.default,
  },
}));
