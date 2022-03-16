import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { actions } from 'Redux/dashboard';
import { clearUserInformation, redirectToLogout } from 'Utils';

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.clearData());
    clearUserInformation();
    redirectToLogout('/v2/#/login');
  }, [dispatch]);

  return null;
};

export default Logout;
