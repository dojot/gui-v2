import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  content: {
    flex: 1,
  },
  actions: {
    textAlign: 'right',
  },
  deleteAction: {
    margin: '0 0 1rem 0',
  },
  editAction: {
    margin: '0 0 1rem 1rem',
  },
  containerCentered: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  noDataText: {
    fontStyle: 'italic',
    color: theme.palette.text.secondary,
  },
  dataGroup: {
    background: theme.palette.background.shade[500],
    border: `1px solid ${theme.palette.divider}`,
    borderBottom: 'none',
    marginBottom: '1rem',
  },
  dataGroupWithBottomBorder: {
    background: theme.palette.background.shade[500],
    border: `1px solid ${theme.palette.divider}`,
    marginBottom: '1rem',
  },
  dataGroupTitleIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  dataGroupItemTextRight: {
    textAlign: 'right',
  },
  tableRow: {
    '&:last-child td, &:last-child th': {
      border: 'none',
    },
  },
  tableCellBold: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
}));
