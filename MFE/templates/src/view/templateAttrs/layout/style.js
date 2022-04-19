import { makeStyles } from '@material-ui/core/styles';

export const useSearchBarStyles = makeStyles(theme => ({
  searchContainer: {
    background: theme.palette.background.shade[500],
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
  card: {
    height: '100%',
    transition: 'background 0.1s ease-in-out',
    '&:hover': {
      background: theme.palette.action.hover,
    },
  },
  cardIcon: {
    fontSize: '40px',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
}));

export const useOptionsMenuStyles = makeStyles(theme => ({
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
    borderBottom: `1px solid ${theme.palette.background.shade[500]}`,
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
    background: theme.palette.secondary.main,
  },
  massActionsLabel: {
    color: theme.palette.background.default,
  },
  massActionsButton: {
    color: theme.palette.text.primary,
    background: theme.palette.background.shade[500],
  },
  massActionsCloseButton: {
    color: theme.palette.background.default,
  },
}));

export const useDataTableStyles = makeStyles(theme => ({
  tableHead: {
    background: theme.palette.background.shade[500],
  },
}));

export const useAttrManagementModalStyles = makeStyles(theme => ({
  error: {
    color: theme.palette.error.main,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: '0 -8px',
    '& > *': {
      margin: '0 8px',
    },
  },
}));
