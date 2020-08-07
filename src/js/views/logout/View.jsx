import React from 'react';

import { Redirect } from 'react-router-dom';
import { Authentication } from 'Services';

export default ({ location }) => {
  Authentication.logout();
  return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
};
