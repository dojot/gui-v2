import React from 'react';
import { Authentication } from 'Services';
import { Redirect } from 'react-router-dom';

export default ({ location }) => {
  Authentication.logout();
  return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
};
