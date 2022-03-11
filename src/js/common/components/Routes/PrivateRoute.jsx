import React, { useEffect } from 'react';

import { MainLayout } from 'Components/Layouts';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { isAuthenticated } from 'Utils';

import { actions, constants } from '../../../redux/modules/users';
import { useIsLoading } from '../../hooks';

export default ({ component: Component, attrs, ...rest }) => {
  const dispatch = useDispatch();

  const isFetchingUserData = useIsLoading(constants.GET_USER_DATA);

  useEffect(() => {
    if (isAuthenticated()) return;
    dispatch(actions.getUserData());
  }, [dispatch]);

  if (isFetchingUserData) return null;

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
