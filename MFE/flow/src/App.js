import React from 'react';

import { Provider } from 'react-redux';
import { Switch, Route, Router } from 'react-router-dom';
import { EventContainer } from 'sharedComponents/Containers';

import i18n from './i18n/i18n';
import configureStore from './redux/configureStore';
import { Flows, Editor } from './view';

const store = configureStore({});

export default ({ history }) => {
  return (
    <Provider store={store}>
      <EventContainer i18n={i18n}>
        <Router history={history}>
          <Switch>
            <Route path='/flows/edit/:flowid' component={Editor} />
            <Route path='/flows/new' component={Editor} />
            <Route path='/flows' component={Flows} />
          </Switch>
        </Router>
      </EventContainer>
    </Provider>
  );
};
