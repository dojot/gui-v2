import { makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme => ({
  footer: {
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: theme.palette.background.default,
    zIndex: theme.zIndex.drawer - 1,
  },
  button: {
    margin: "8px 12px",
  },
  expanded: {
    marginLeft: theme.spacing(8) + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  collapsed: {
    marginLeft: 240,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}))
