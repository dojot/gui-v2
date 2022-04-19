import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    root: {
      borderRadius: 5,
      height: '100%',
      overflowY: 'hidden',
      '&:hover': {
        overflowY: 'auto',
      },
    },
    lines: {
      padding: '14px 5px',
    },
    head: {
      fontWeight: 'normal',
      fontSize: '0.8rem',
      lineHeight: '24px',
      textTransform: 'none',
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.background.paper,
      userSelect: 'none',
    },
  };
});

export default useStyles;
