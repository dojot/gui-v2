import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
  },
  content: {
    flex: '1',
    width: '100%',
    maxWidth: '1268px',
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
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
  input: {
    width: '100%',
  },
  emptyList: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListText: {
    fontStyle: 'italic',
  },
}));
