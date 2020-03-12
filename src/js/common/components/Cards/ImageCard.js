import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
    rootCard: {
      maxWidth: 240,

    },
    actions: {
      height: 273,
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      justifyContent: 'normal',
      flexDirection: 'column',
    },
    media: {
      height: 140,
      width: '100%',
    },
  }
})

export default useStyles
