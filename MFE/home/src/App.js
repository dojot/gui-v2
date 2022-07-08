import React from 'react';
import Home from './view';
import i18n from './i18n/i18n';
import { Switch, Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { EventContainer } from 'sharedComponents/Containers';

const store = configureStore({});

export default ({ history }) => {
  return (
    <Provider store={store}>
      <EventContainer i18n={i18n}>
        <Router history={history}>
          <Switch>
            <Route path='/home' component={Home} />
          </Switch>
        </Router>
      </EventContainer>
    </Provider>
  );
};
