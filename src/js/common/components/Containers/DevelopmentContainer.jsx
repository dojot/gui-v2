import React, { Fragment } from 'react'

export default ({ children }) => {
  if (process.env.NODE_ENV === 'development') {
    return (
      <Fragment>
        {children}
      </Fragment>
    )
  }
  return null;
}
