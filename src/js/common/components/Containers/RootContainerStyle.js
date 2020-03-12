import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    marginTop: 64,
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))
