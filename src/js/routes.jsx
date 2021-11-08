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
const Devices = LazyLoading(() => import('views/devices'));
const CreateDevice = LazyLoading(() => import('views/createDevice'));
const Templates = LazyLoading(() => import('views/templates'));
const CreateTemplate = LazyLoading(() => import('views/createTemplate'));
const TemplateAttrs = LazyLoading(() => import('views/templateAttrs'));
<<<<<<< HEAD
const CertificationAuthorities = LazyLoading(() => import('views/CertificationAuthorities'));
const CreateCertificationAuthority = LazyLoading(() =>
  import('views/createCertificationAuthority'),
);
=======
const EditDevice = LazyLoading(() => import('views/editDevice'));
>>>>>>> 41790aebadd045c466e8f3857b99ce2b7d84115d
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
    <PrivateRoute path='/devices/edit/:deviceId' component={EditDevice} attrs={props} />
    <PrivateRoute path='/devices' component={Devices} attrs={props} exact />
    <PrivateRoute path='/devices/new' component={CreateDevice} attrs={props} exact />
    <PrivateRoute path='/templates' component={Templates} attrs={props} exact />
    <PrivateRoute path='/templates/new' component={CreateTemplate} attrs={props} exact />
    <PrivateRoute path='/templates/:templateId' component={TemplateAttrs} attrs={props} exact />
    <PrivateRoute path='/flow' component={TestRouteHandler} attrs={props} />
    <PrivateRoute path='/notification' component={TestRouteHandler} attrs={props} />
    <PrivateRoute path='/users' component={TestRouteHandler} attrs={props} />
    <PrivateRoute path='/profiles' component={GridTest} attrs={props} />
    <PrivateRoute
      path='/certification-authorities'
      component={CertificationAuthorities}
      attrs={props}
      exact
    />
    <PrivateRoute
      path='/certification-authorities/new'
      component={CreateCertificationAuthority}
      attrs={props}
      exact
    />
    <Route path='*' component={ExampleRouteHandler} attrs={props} />
  </Switch>
);

const mapStateToProps = state => ({
  ...menuSelector(state),
});

export default connect(mapStateToProps, null)(Routes);
