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
  tooltip: {
    fontSize: '1rem',
  },
}));

export const useCardsStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    cursor: 'pointer',
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
  cardFooter: {
    '& > *:not(:first-child)': {
      marginLeft: 4,
    },
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

export const useDataTableStyles = makeStyles(theme => ({
  tableHead: {
    background: theme.palette.background.shade[500],
  },
  clickableCell: {
    cursor: 'pointer',
  },
  dataTableRowCollapsed: {
    background: theme.palette.background.shade[500],
  },
  dataTableRowHide: {
    display: 'none',
  },
  unableToSelect: {
    opacity: 0.5,
  },
  selectedFilters: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  period: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  availableButton: {
    color: theme.palette.secondary.main,
  },
  errorButton: {
    color: theme.palette.error.main,
  },
}));

export const useReportErrorAlert = makeStyles(theme => ({
  dialogTitle: {
    borderTop: `solid 4px ${theme.palette.error.dark}`,
    textAlign: 'center',
  },
  icon: {
    color: theme.palette.error.dark,
    fontSize: '72px !important',
  },
  dialogContent: {
    textAlign: 'center',
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
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    textTransform: 'uppercase',
  },
}));
