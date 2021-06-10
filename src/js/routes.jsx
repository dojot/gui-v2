import React from 'react';

import LazyLoading from 'common/components/LazyLoading';
import { PrivateRoute } from 'Components/Routes';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { menuSelector } from 'Selectors/baseSelector';
// This is show case how you can lazy loading component
const ExampleRouteHandler = LazyLoading(() => import('views/example'));
const RedirectToLogin = LazyLoading(() => import('views/login/loginRedirect/loginRedirect'));
const Dashboard = LazyLoading(() => import('views/dashboard'));
const Widget = LazyLoading(() => import('views/dashboard/widget'));
const WizardManager = LazyLoading(() => import('./common/managers/WizardManager'));
const LogOut = LazyLoading(() => import('views/logout'));
const redirectToDashboard = () => <Redirect to={{ pathname: '/dashboard' }} />;

const Routes = props => (
  <Switch>
    <Route exact path='/' component={redirectToDashboard} />
    <Route path='/welcome' component={RedirectToLogin} />
    <Route path='/logout' component={LogOut} />
    <PrivateRoute
      path='/dashboard/widget/wizard/:id/:uuid?'
      component={WizardManager}
      attrs={props}
    />
    <PrivateRoute path='/dashboard/widget' component={Widget} attrs={props} />
    <PrivateRoute path='/dashboard' component={Dashboard} attrs={props} />
    <Route path='*' component={ExampleRouteHandler} attrs={props} />
  </Switch>
);

const mapStateToProps = state => ({
  ...menuSelector(state),
});

export default connect(mapStateToProps, null)(Routes);
