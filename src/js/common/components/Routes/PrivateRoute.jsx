import React, { useEffect } from 'react';

import { MainLayout } from 'Components/Layouts';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { isAuthenticated } from 'Utils';

import { actions } from '../../../redux/modules/users';

export default ({ component: Component, attrs, ...rest }) => {
  // <Redirect to={{ pathname: '/login', state: { from: props.location } }} />

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated()) return;
    dispatch(actions.getUserData());
  }, [dispatch]);

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
