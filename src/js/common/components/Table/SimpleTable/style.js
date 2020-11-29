import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    root: {
      borderRadius: 5,
      height: '100%',
    },
    lines: {
      padding: '14px 0px',
    },
    head: {
      fontWeight: 'normal',
      fontSize: '0.8rem',
      lineHeight: '24px',
      textTransform: 'none',
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.table.head,
      userSelect: 'none',
    },
  };
});

export default useStyles;
