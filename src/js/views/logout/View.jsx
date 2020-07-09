import React from 'react'
import { logout } from 'Utils'
import { Redirect } from 'react-router-dom'

export default ({ location }) => {
  logout()
  return (
    <Redirect to={{ pathname: '/login', state: { from: location } }} />
  )
}
