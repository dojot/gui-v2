import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  content: {
    flex: 1,
  },

  searchContainer: {
    background: theme.palette.background.devices,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSide: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  searchTextField: {
    marginLeft: theme.spacing(1),
    width: '400px',
  },
  searchInput: {
    borderRadius: '100px',
  },
  createButton: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      background: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
    },
  },

  deviceCard: {
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.action.hover,
    },
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
  },
  menuItemText: {
    margin: theme.spacing(0, 1.5),
  },

  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  detailsModalTitle: {
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dataGroup: {
    background: '#f2f2f2',
    border: `1px solid ${theme.palette.divider}`,
    borderBottom: 'none',
  },
  dataGroupTitleIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  tableCellBold: {
    fontWeight: 'bold',
  },
  tableCellSecondary: {
    color: theme.palette.text.secondary,
  },

  massActionsContainer: {
    background: theme.palette.primary.main,
  },
  massActionsLabel: {
    color: theme.palette.background.default,
  },
  massActionsButton: {
    color: theme.palette.text.primary,
    background: theme.palette.background.default,
  },
  massActionsCloseButton: {
    color: theme.palette.background.default,
  },

  tableHead: {
    background: theme.palette.background.devices,
  },
  clickableCell: {
    cursor: 'pointer',
  },
}));
