import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none',
    },
    text: {
      fontSize: '2rem',
      color: 'rgba(0,0,0,0.70)',
    },
  };
});

export default useStyles;
