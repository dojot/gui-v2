import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actions as dashboardActions } from 'Redux/dashboard';
import { Authentication } from 'Services';

const Logout = ({ location, clearData }) => {
  useEffect(() => {
    clearData();
  }, []);

  Authentication.logout();

  return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
};

const mapDispatchToProps = {
  ...dashboardActions,
};

export default connect(null, mapDispatchToProps)(Logout);
