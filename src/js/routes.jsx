import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LazyLoading from 'common/components/LazyLoading';
import { connect } from 'react-redux';
import { actions as baseActions } from 'Redux/base';
import { menuSelector } from 'Selectors/baseSelector';
import { PrivateRoute } from 'Components/Routes';

// This is show case how you can lazy loading component
const ExampleRouteHandler = LazyLoading(() => import('views/example'));
const GridTest = LazyLoading(() => import('views/gridTest'));
const TestRouteHandler = LazyLoading(() => import('views/test'));
const Dashboard = LazyLoading(() => import('views/dashboard'));
const Widget = LazyLoading(() => import('views/dashboard/widget'));
const WizardManager = LazyLoading(() =>
  import('./common/managers/WizardManager'),
);
const LogOut = LazyLoading(() => import('views/logout'));
const LogIn = LazyLoading(() => import('views/login'));

const Routes = props => (
  <Switch>
    <Route exact path="/" component={ExampleRouteHandler} />
    <Route path="/login" component={LogIn} />
    <Route path="/logout" component={LogOut} />
    <Route path="/help" component={ExampleRouteHandler} />
    <PrivateRoute
      path="/dashboard/widget/wizard/:id"
      component={WizardManager}
      attrs={props}
    />
    <PrivateRoute path="/dashboard/widget" component={Widget} attrs={props} />
    <PrivateRoute path="/dashboard" component={Dashboard} attrs={props} />
    <PrivateRoute path="/devices" component={TestRouteHandler} attrs={props} />
    <PrivateRoute
      path="/templates"
      component={TestRouteHandler}
      attrs={props}
    />
    <PrivateRoute path="/flow" component={TestRouteHandler} attrs={props} />
    <PrivateRoute
      path="/notification"
      component={TestRouteHandler}
      attrs={props}
    />
    <PrivateRoute path="/users" component={TestRouteHandler} attrs={props} />
    <PrivateRoute path="/profiles" component={GridTest} attrs={props} />
    <Route path="*" component={ExampleRouteHandler} attrs={props} />
  </Switch>
);

const mapStateToProps = state => ({
  ...menuSelector(state),
});

const mapDispatchToProps = {
  ...baseActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
