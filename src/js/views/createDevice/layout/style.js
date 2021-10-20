import { makeStyles } from '@material-ui/core/styles';

export const useActionButtonStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: '0 -8px',
    '& > *': {
      margin: '0 8px',
    },
  },
  cancelButtonLeftAligned: {
    marginRight: 'auto',
  },
}));
