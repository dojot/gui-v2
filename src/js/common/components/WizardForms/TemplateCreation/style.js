import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  container: {
    background: theme.palette.grey[100],
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontWeight: 'bold',
  },
  createAttButton: {
    background: theme.palette.background.paper,
  },
  tableWrapper: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.grey[200],
  },
  tableHead: {
    textTransform: 'uppercase',
    background: theme.palette.grey[100],
  },
  input: {
    width: '100%',
    background: theme.palette.background.paper,
  },
  select: {
    height: '40px',
    width: '100%',
    background: theme.palette.background.paper,
  },
  noAttr: {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
