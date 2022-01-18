import { makeStyles } from '@material-ui/core/styles';

export const useAssociateDeviceModalStyles = makeStyles(theme => ({
  tableContainer: {
    background: theme.palette.background.shade[500],
    border: `1px solid ${theme.palette.divider}`,
    borderBottom: 'none',
  },
  tableHeadCell: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  selectableTableRow: {
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover': {
      background: theme.palette.background.shade[500],
    },
  },
}));

export const usePaginationStyles = makeStyles(() => ({
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
  },
}));
