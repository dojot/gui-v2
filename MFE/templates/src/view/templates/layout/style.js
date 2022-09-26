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
  clickableCell: {
    cursor: 'pointer',
  },
}));

export const useDeleteMultipleTemplatesErrorAlert = makeStyles(theme => ({
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
