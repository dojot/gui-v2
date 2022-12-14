import React, { useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createBrowserHistory } from 'history';
import { Switch, Router, Route } from 'react-router-dom';
import { EVENT } from 'sharedComponents/Constants';
import { EventContainer } from 'sharedComponents/Containers';
import { PrivateRoute } from 'sharedComponents/PrivateRoute';

import { getMenuState, setMenuState } from './adapters/localStorage/config.localStorage';
import GlobalToast from './components/GlobalToast';
import RouterHandler from './components/RouterHandler';
import useWindowEventListener from './hooks/useWindowEvent';
import i18n from './i18n';
import TenantForm from './view/tenantForm';

const Devices = React.lazy(() =>
  import('./bridges/Devices').catch(err => {
    console.error(err);
    return import('./view/pageNotFound');
  }),
);
const Home = React.lazy(() =>
  import('./bridges/Home').catch(err => {
    console.error(err);
    return import('./view/pageNotFound');
  }),
);
const Security = React.lazy(() =>
  import('./bridges/Security').catch(err => {
    console.error(err);
    return import('./view/pageNotFound');
  }),
);
const Templates = React.lazy(() =>
  import('./bridges/Templates').catch(err => {
    console.error(err);
    return import('./view/pageNotFound');
  }),
);
const Dashboard = React.lazy(() =>
  import('./bridges/Dashboard').catch(err => {
    console.error(err);
    return import('./view/pageNotFound');
  }),
);

const Reports = React.lazy(() =>
  import('./bridges/Reports').catch(err => {
    console.error(err);
    return import('./view/pageNotFound');
  }),
);

const history = createBrowserHistory({ basename: '/v2/#/' });
export default () => {
  const [isMenuOpen, setMenuOpen] = useState(getMenuState());
  const handleMenu = e => {
    setMenuState(!e.detail);
    setMenuOpen(!e.detail);
  };
  const handleRoute = e => {
    history.push(e.detail);
  };
  useWindowEventListener(EVENT.CHANGE_MENU, handleMenu);
  useWindowEventListener(EVENT.CHANGE_ROUTE, handleRoute);
  return (
    <EventContainer i18n={i18n}>
      <CssBaseline />
      <GlobalToast />
      <Router history={history}>
        <Switch>
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
          <PrivateRoute path='/create-report' component={Reports} attrs={{ isMenuOpen }} />
          <PrivateRoute path='/reports' component={Reports} attrs={{ isMenuOpen }} />
          <RouterHandler />
        </Switch>
      </Router>
    </EventContainer>
  );
};
