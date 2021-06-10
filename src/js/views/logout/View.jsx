import React, { useEffect } from 'react';

import { URL } from 'Constants';
import { connect } from 'react-redux';
import { actions as dashboardActions } from 'Redux/dashboard';

const Logout = ({ location, clearData }) => {
  useEffect(() => {
    clearData();
    window.location.href = `${URL.LOGOUT}?return=/v2/#/welcome`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div />;
};

const mapDispatchToProps = {
  ...dashboardActions,
};

export default connect(null, mapDispatchToProps)(Logout);
