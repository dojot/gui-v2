import React from 'react';

import LazyLoading from 'common/components/LazyLoading';
import { PrivateRoute } from 'Components/Routes';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { menuSelector } from 'Selectors/baseSelector';

// This is show case how you can lazy loading component
const GridTest = LazyLoading(() => import('views/gridTest'));
const Dashboard = LazyLoading(() => import('views/dashboard'));
const Home = LazyLoading(() => import('views/home'));
const Widget = LazyLoading(() => import('views/dashboard/widget'));
const WizardManager = LazyLoading(() => import('./common/managers/WizardManager'));
const LogOut = LazyLoading(() => import('views/logout'));
const LogIn = LazyLoading(() => import('views/login'));
const Devices = LazyLoading(() => import('views/devices'));
const DeviceDetails = LazyLoading(() => import('views/deviceDetails'));
const CreateDevice = LazyLoading(() => import('views/createDevice'));
const Templates = LazyLoading(() => import('views/templates'));
const CreateTemplate = LazyLoading(() => import('views/createTemplate'));
const EditTemplate = LazyLoading(() => import('views/editTemplate'));
const TemplateAttrs = LazyLoading(() => import('views/templateAttrs'));
const Certificates = LazyLoading(() => import('views/Certificates'));
const CreateCertificate = LazyLoading(() => import('views/createCertificate'));
const CertificationAuthorities = LazyLoading(() => import('views/CertificationAuthorities'));
const CreateCertificationAuthority = LazyLoading(() =>
  import('views/createCertificationAuthority'),
);
const EditDevice = LazyLoading(() => import('views/editDevice'));
const PageNotFound = LazyLoading(() => import('views/pageNotFound'));
const redirectToHome = () => <Redirect to={{ pathname: '/home' }} />;

const Routes = props => (
  <Switch>
    <Route exact path='/' component={redirectToHome} />
    <Route path='/login' component={LogIn} />
    <Route path='/logout' component={LogOut} />
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
    <PrivateRoute path='/devices/:deviceId' component={DeviceDetails} attrs={props} exact />
    <PrivateRoute path='/templates' component={Templates} attrs={props} exact />
    <PrivateRoute path='/templates/new' component={CreateTemplate} attrs={props} exact />
    <PrivateRoute path='/templates/:templateId' component={TemplateAttrs} attrs={props} exact />
    <PrivateRoute path='/templates/edit/:templateId' component={EditTemplate} attrs={props} exact />
    <PrivateRoute path='/profiles' component={GridTest} attrs={props} />
    <PrivateRoute path='/certificates' component={Certificates} attrs={props} exact />
    <PrivateRoute path='/certificates/new' component={CreateCertificate} attrs={props} exact />
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
    <Route path='*' component={PageNotFound} attrs={props} />
  </Switch>
);

const mapStateToProps = state => ({
  ...menuSelector(state),
});

export default connect(mapStateToProps, null)(Routes);
