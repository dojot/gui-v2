import { makeStyles } from '@material-ui/core/styles';

export const useSecurityStepStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.main,
    '&:hover': {
      background: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
    },
    '&:disabled': {
      opacity: 0.4,
      background: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
    },
  },
  stepComponent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  templateCreation: {
    flex: 1,
  },
}));

export const useSecurityTableStyles = makeStyles(theme => ({
  tableHead: {
    background: theme.palette.background.shade[500],
  },
  searchTextField: {
    marginLeft: theme.spacing(1),
    width: '100%',
  },
  searchInput: {
    borderRadius: '50px',
    background: theme.palette.background.paper,
  },
  clickableCell: {
    cursor: 'pointer',
  },
  emptyList: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListText: {
    fontStyle: 'italic',
  },
  loadingContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const usePaginationStyles = makeStyles(() => ({
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
