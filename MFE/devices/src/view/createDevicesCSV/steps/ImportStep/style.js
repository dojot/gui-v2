import { makeStyles } from '@material-ui/core/styles';

export const useImportStepStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  content: {
    flex: 1,
  },
  importationWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  csvInputFileName: {
    width: 300,
  },
  csvFileInput: {
    display: 'none',
  },
  boilerplateButton: {
    color: theme.palette.primary.light,
  },
  csvFormatHint: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    wordBreak: 'keep-all',
  },
}));
