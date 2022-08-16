import { makeStyles } from '@material-ui/core/styles';

export const useActionButtonStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    marginRight: 'auto',
  },
  backButton: {
    marginLeft: '1rem',
  },
  nextButton: {
    marginLeft: '1rem',
  },
}));

export const useDeviceWizardStepperStyles = makeStyles(theme => ({
  stepper: {
    height: '100%',
    maxHeight: '100vh',
    background: theme.palette.background.default,
    padding: '24px 8px',
  },
}));
