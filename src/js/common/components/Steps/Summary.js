import { makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme => ({
  item: {
    maxWidth: 700,
    width: "100%",
  },
  root: {
    alignItems: "center",
    marginBottom: 52,
  },
  footer: {
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(243, 243, 241, 0.92)",
  },
  button: {
    margin: "8px 12px",
  },
  expanded: {
    marginLeft: 64,
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
  containerText: {
    marginBottom: 24,
    float: "left",
    width: "100%",
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 6,
    marginLeft: 6,
  },
  attrItem: {
    fontSize: 14,
    marginTop: 3,
    marginBottom: 5,
    float: "left",
  },
  colorArea: {
    height: 15,
    width: 15,
    borderRadius: 4,
    marginRight: 5,
    backgroundColor: "black",
    float: "left",
    margin: 4,
  },
  colorContainer: {
    float: "left",
    width: "100%",
    marginBottom: 3,
  },
}))
