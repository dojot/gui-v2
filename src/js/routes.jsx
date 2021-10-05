import React from 'react';

import LazyLoading from 'common/components/LazyLoading';
import { PrivateRoute } from 'Components/Routes';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { menuSelector } from 'Selectors/baseSelector';

// This is show case how you can lazy loading component
const ExampleRouteHandler = LazyLoading(() => import('views/example'));
const GridTest = LazyLoading(() => import('views/gridTest'));
const TestRouteHandler = LazyLoading(() => import('views/test'));
const Dashboard = LazyLoading(() => import('views/dashboard'));
const Home = LazyLoading(() => import('views/home'));
const Widget = LazyLoading(() => import('views/dashboard/widget'));
const WizardManager = LazyLoading(() => import('./common/managers/WizardManager'));
const LogOut = LazyLoading(() => import('views/logout'));
const LogIn = LazyLoading(() => import('views/login'));
const redirectToDashboard = () => <Redirect to={{ pathname: '/dashboard' }} />;

const Routes = props => (
  <Switch>
    <Route exact path='/' component={redirectToDashboard} />
    <Route path='/login' component={LogIn} />
    <Route path='/logout' component={LogOut} />
    <Route path='/help' component={ExampleRouteHandler} />
    <PrivateRoute
      path='/dashboard/widget/wizard/:id/:uuid?'
      component={WizardManager}
      attrs={props}
    />
    <PrivateRoute path='/dashboard/widget' component={Widget} attrs={props} />
    <PrivateRoute path='/dashboard' component={Dashboard} attrs={props} />
    <PrivateRoute path='/home' component={Home} attrs={props} />
    <PrivateRoute path='/devices' component={TestRouteHandler} attrs={props} />
    <PrivateRoute path='/templates' component={TestRouteHandler} attrs={props} />
    <PrivateRoute path='/flow' component={TestRouteHandler} attrs={props} />
    <PrivateRoute path='/notification' component={TestRouteHandler} attrs={props} />
    <PrivateRoute path='/users' component={TestRouteHandler} attrs={props} />
    <PrivateRoute path='/profiles' component={GridTest} attrs={props} />
    <Route path='*' component={ExampleRouteHandler} attrs={props} />
  </Switch>
);

const mapStateToProps = state => ({
  ...menuSelector(state),
});

export default connect(mapStateToProps, null)(Routes);
