import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  container: {
    background: theme.palette.background.shade[500],
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
    background: theme.palette.background.default,
  },
  tableHead: {
    textTransform: 'uppercase',
    background: theme.palette.background.shade[500],
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
    background: theme.palette.background.default,
  },
}));
