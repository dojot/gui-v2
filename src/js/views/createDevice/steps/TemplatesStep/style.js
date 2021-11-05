import { makeStyles } from '@material-ui/core/styles';

export const useTemplatesStepStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.main,
    '&:hover': {
      background: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
    },
    '&:disabled': {
      opacity: 0.4,
      background: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
    },
  },
  stepComponent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  templateCreation: {
    flex: 1,
  },
}));

export const useTemplatesTableStyles = makeStyles(() => ({
  loadingContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

export const useTemplateCreationActionsStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: '0 -1rem',
    '& > *': {
      margin: '1rem 1rem 0 1rem',
    },
  },
}));
