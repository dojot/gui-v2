import React from 'react';

import { MainLayout } from 'Components/Layouts';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from 'Utils/module/auth';

export default ({ component: Component, attrs, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <MainLayout {...attrs}>
            <Component {...props} />
          </MainLayout>
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};
