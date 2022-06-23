import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  grid: {
    margin: 50,
    padding: 16,
    height: 'fit-content',
  },

  margin: {
    marginTop: 16,
    marginBottom: 8,
  },

  root: {
    flex: 1,
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: theme.palette.background.login,
  },
}));
