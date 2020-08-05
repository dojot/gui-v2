import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    root: {
      borderRadius: 5,
      height: '100%',
    },
    head: {
      backgroundColor: theme.palette.table.head,
      color: theme.palette.common.white,
      fontSize: '1rem',
      fontWeight: 600,
      userSelect: 'none',
    },
  };
});

export default useStyles;
