import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    card: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      '&:active': {
        boxShadow: theme.shadows[6],
      },
    },
    header: {
      padding: '12px 16px 10px 16px',
    },
    headerTitle: {
      fontSize: '1.125rem',
      lineHeight: '1',
    },
    subHeaderTitle: {
      fontSize: '0.875rem',
      lineHeight: '1',
      paddingTop: 5,
    },
    headerAction: {
      marginTop: -3,
    },
    cardContent: {
      padding: '0 8px',
      minHeight: 30,
      width: '100%',
      position: 'relative',
      flex: 1,
      '&:last-child': {
        paddingBottom: 8,
      },
    },
    iconButtonSmall: {
      padding: 0,
    },
  };
});

export default useStyles;
