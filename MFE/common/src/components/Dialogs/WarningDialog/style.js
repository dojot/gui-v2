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
  dialogContent: {
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      background: theme.palette.divider,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  dialogActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    textTransform: 'uppercase',
  },
  itemBox: {
    fontSize: '16px',
    marginBottom: '24px',
    backgroundColor: theme.palette.background.shade[500],
    borderRadius: '4px',
    border: `solid 1px ${theme.palette.divider}`,
  },
  headerItemBox: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  description: {
    marginLeft: '12px',
  },
  expandIconOpened: {
    transform: 'rotateX(180deg)',
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  expandIconClosed: {
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  collapseContent: {
    padding: '10px',
  },
}));
