import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
  },
  containerCentered: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  noDataText: {
    fontStyle: 'italic',
    color: theme.palette.text.secondary,
  },
  content: {
    flex: '1',
    width: '100%',
    maxWidth: '1268px',
    display: 'flex',
    flexDirection: 'column',
  },
  templateCreation: {
    flex: '1',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    margin: '0 -8px',
    '& > *': {
      margin: '0 8px',
    },
  },
}));
