import React from "react"
import { useStyles } from "./RootContainerStyle"

export default props => {
  const classes = useStyles()
  const { children } = props
  return <div className={classes.root}>{children}</div>
}
