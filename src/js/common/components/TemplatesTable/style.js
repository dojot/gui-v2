import { makeStyles } from '@material-ui/core/styles';

export const useTemplatesTableStyles = makeStyles(theme => ({
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
}));

export const usePaginationStyles = makeStyles(() => ({
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
