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
