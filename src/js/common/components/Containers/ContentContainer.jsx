import React from 'react'
import { useStyles } from './RootContainerStyle'

const ContentContainer = (props) => {
  const classes = useStyles();
  const { children } = props;
  return (
    <div className={classes.content}>
      {children}
    </div>
  )
}

export default ContentContainer
