import React from 'react';

import { Redirect, Route } from 'react-router-dom';
import { PrivateRoute } from 'sharedComponents/PrivateRoute';

import PageNotFound from '../../view/pageNotFound';
import TenantForm from '../../view/tenantForm';

const RouterHandler = () => {
  return (
    <Route
      path='/'
      render={({ location }) => {
        if (location.pathname.includes('/v2/')) {
          if (location.search.includes('error')) {
            return <TenantForm />;
          }
          return <Redirect to={{ pathname: '/home' }} />;
        }
        if (location.pathname.replace('/', '') !== '') {
          return <PrivateRoute path='/*' component={PageNotFound} />;
        }
        return <Redirect to={{ pathname: '/home' }} />;
      }}
    />
  );
};
export default RouterHandler;
