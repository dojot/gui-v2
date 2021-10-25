import { makeStyles } from '@material-ui/core/styles';

export const useSearchBarStyles = makeStyles(theme => ({
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
}));

export const useCardsStyles = makeStyles(theme => ({
  deviceCard: {
    cursor: 'pointer',
    transition: 'background 0.1s ease-in-out',
    '&:hover': {
      background: theme.palette.action.hover,
    },
  },
  deviceCardIcon: {
    fontSize: '40px',
  },
  deviceCardTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
}));

export const useDeviceOptionsStyles = makeStyles(theme => ({
  menuItem: {
    display: 'flex',
    alignItems: 'center',
  },
  menuItemText: {
    margin: theme.spacing(0, 1.5),
  },
}));

export const usePaginationStyles = makeStyles(() => ({
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

export const useDetailsModalStyles = makeStyles(theme => ({
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
}));

export const useMassActionsStyles = makeStyles(theme => ({
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
}));

export const useDataTableStyles = makeStyles(theme => ({
  tableHead: {
    background: theme.palette.background.devices,
  },
  clickableCell: {
    cursor: 'pointer',
  },
  linkedCertificate: {
    textDecoration: 'underline',
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
  statusValid: {
    color: theme.palette.background.paper,
    fontWeight: 'bold',
    backgroundColor: theme.palette.success.main,
  },
  statusExpired: {
    color: theme.palette.background.paper,
    fontWeight: 'bold',
    backgroundColor: theme.palette.error.main,
  },
  statusToExpire: {
    color: theme.palette.background.paper,
    fontWeight: 'bold',
    backgroundColor: theme.palette.favorite,
  },
}));

export const useCreateCAStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  content: {
    width: '60%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputNameCA: {
    marginBottom: theme.spacing(2),
  },
  bottomButtonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: theme.spacing(4),
  },
  saveButton: {
    marginLeft: theme.spacing(4),
  },
}));
