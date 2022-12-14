import React from 'react';

import { Provider } from 'react-redux';
import { Switch, Route, Router } from 'react-router-dom';
import { EventContainer } from 'sharedComponents/Containers';

import i18n from './i18n';
import WizardManager from './managers/WizardManager';
import configureStore from './redux/configureStore';
import Dashboard from './view';
import Widget from './view/widget';

const store = configureStore({});

export default ({ history }) => {
  return (
    <Provider store={store}>
      <EventContainer i18n={i18n}>
        <Router history={history}>
          <Switch>
            <Route path='/dashboard/widget/wizard/:id/:uuid?' component={WizardManager} />
            <Route path='/dashboard/widget' component={Widget} />
            <Route path='/dashboard' component={Dashboard} />
          </Switch>
        </Router>
      </EventContainer>
    </Provider>
  );
};
