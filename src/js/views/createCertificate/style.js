import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  content: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(4),
  },
  actionButtonsWrapper: {
    width: '50%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  collapsibleCardsWrapper: {
    width: '50%',
  },
  finishButton: {
    marginLeft: theme.spacing(2),
  },
}));
