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
    background: theme.palette.background.default,
    '&:disabled': {
      background: 'rgba(255,255,255,0.7)',
      color: theme.palette.text.primary,
    },
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
  },
  massActionsCloseButton: {
    color: theme.palette.background.default,
  },
  periodWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  periodInput: {
    background: theme.palette.background.default,
    margin: 0,
  },
  popover: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    gap: '32px',
  },
  popoverBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  popoverFooter: {
    textAlign: 'center',
  },
  reportGenerateButtonsWrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radioButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
}));

export const useDataTableStyles = makeStyles(theme => ({
  tableHead: {
    background: theme.palette.background.shade[500],
  },
  clickableCell: {
    cursor: 'pointer',
  },
  dataTableRow: {
    '& > *': {
      borderBottom: `solid 1px ${theme.palette.divider}`,
    },
  },
  dataTableRowCollapsed: {
    background: theme.palette.background.shade[500],
  },
  unableToSelect: {
    opacity: 0.5,
  },
}));
