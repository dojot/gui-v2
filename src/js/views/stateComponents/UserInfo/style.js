import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  list: {
    minWidth: 160,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
  },
  clickableListItem: {
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.action.hover,
    },
  },
  listItemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  listItemSwitch: {
    marginLeft: theme.spacing(2),
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    margin: '0 15px',
  },
  button: {
    textTransform: 'initial',
  },
  buttonWithRightMargin: {
    textTransform: 'initial',
    marginRight: theme.spacing(2),
  },
  selectedListItem: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));
