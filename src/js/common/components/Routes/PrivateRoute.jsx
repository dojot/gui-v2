import React from 'react';

import { MainLayout } from 'Components/Layouts';
import { Route } from 'react-router-dom';
import { Authentication } from 'Services';
import { isAuthenticated } from 'Utils';

export default ({ component: Component, attrs, ...rest }) => {
  if (!isAuthenticated()) {
    Authentication.getUserData();
  }

  return (
    <Route
      {...rest}
      render={props => (
        <MainLayout {...attrs}>
          <Component {...props} />
        </MainLayout>
      )}
    />
  );
};
