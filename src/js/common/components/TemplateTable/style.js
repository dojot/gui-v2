import { makeStyles } from '@material-ui/core/styles';

export const useTemplateTableStyles = makeStyles(theme => ({
  tableHead: {
    background: theme.palette.background.shade[500],
  },
  searchTextField: {
    marginLeft: theme.spacing(1),
    width: '350px',
  },
  searchInput: {
    borderRadius: '50px',
  },
  tableBodyEmpty: {
    height: '100px',
  },
}));
