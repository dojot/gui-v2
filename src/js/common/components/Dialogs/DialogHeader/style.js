import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  header: {
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));