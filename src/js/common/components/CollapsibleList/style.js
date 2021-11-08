import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  container: {
    border: `1px solid ${theme.palette.grey[300]}`,
    background: theme.palette.grey[100],
    minHeight: '4rem',
    marginBottom: '1rem',
    paddingBottom: 0,
    userSelect: 'none',
  },
  header: {
    cursor: 'pointer',
  },
  title: {
    padding: theme.spacing(0, 2),
  },
  icon: {
    transition: 'transform .2s ease-in-out',
    transform: ({ isContentVisible }) => {
      return isContentVisible ? 'rotate(-90deg)' : 'rotate(0deg)';
    },
  },
}));