import React, { useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Router, Route, Redirect } from 'react-router-dom';
import { EVENT } from 'sharedComponents/Constants';
import { EventContainer } from 'sharedComponents/Containers';
import { PrivateRoute } from 'sharedComponents/PrivateRoute';
import GlobalToast from './stateComponents/GlobalToast';

import { getMenuState, setMenuState } from './adapters/localStorage/config.localStorage';
import { history } from './history';
import useWindowEventListener from './hooks/useWindowEvent';
import i18n from './i18n';
import TenantForm from './view/tenantForm';
import PageNotFound from './view/pageNotFound';

const redirectToHome = () => <Redirect to={{ pathname: '/home' }} />;

const Devices = React.lazy(() =>
  import('./components/Devices').catch(err => {
    console.error(err);
    return import('./view/pageNotFound');
  }),
);
const Home = React.lazy(() =>
  import('./components/Home').catch(err => {
    console.error(err);
    return import('./view/pageNotFound');
  }),
);
const Security = React.lazy(() =>
  import('./components/Security').catch(err => {
    console.error(err);
    return import('./view/pageNotFound');
  }),
);
const Templates = React.lazy(() =>
  import('./components/Templates').catch(err => {
    console.error(err);
    return import('./view/pageNotFound');
  }),
);
const Dashboard = React.lazy(() =>
  import('./components/Dashboard').catch(err => {
    console.error(err);
    return import('./view/pageNotFound');
  }),
);

export default () => {
  const [isMenuOpen, setMenuOpen] = useState(getMenuState());
  const handleMenu = e => {
    setMenuState(!e.detail);
    setMenuOpen(!e.detail);
  };
  useWindowEventListener(EVENT.CHANGE_MENU, handleMenu);
  return (
    <EventContainer i18n={i18n}>
      <CssBaseline />
      <GlobalToast />
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={redirectToHome} />
          <Route path='/login' component={TenantForm} />
          <PrivateRoute path='/home' component={Home} attrs={{ isMenuOpen }} />
          <PrivateRoute path='/dashboard' component={Dashboard} attrs={{ isMenuOpen }} />
          <PrivateRoute path='/devices' component={Devices} attrs={{ isMenuOpen }} />
          <PrivateRoute path='/certificates' component={Security} attrs={{ isMenuOpen }} />
          <PrivateRoute
            path='/certification-authorities'
            component={Security}
            attrs={{ isMenuOpen }}
          />
          <PrivateRoute path='/templates' component={Templates} attrs={{ isMenuOpen }} />
          <PrivateRoute path='/*' component={PageNotFound} />
        </Switch>
      </Router>
    </EventContainer>
  );
};
