import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  dialogTitle: {
    borderTop: `solid 4px ${theme.palette.warning.main}`,
    textAlign: 'center',
  },
  icon: {
    color: theme.palette.warning.main,
    fontSize: '72px !important',
  },
  dialogActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    textTransform: 'uppercase',
  },
  itemList: {
    fontSize: '16px',
  },
}));
