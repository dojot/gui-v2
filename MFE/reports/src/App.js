import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import CreateReport from './view/createReport/View';
import MyReports from './view/myReports/View';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import i18n from './i18n';
import { EventContainer } from 'sharedComponents/Containers';

const store = configureStore({});

export default ({ history }) => {
  return (
    <Provider store={store}>
      <EventContainer i18n={i18n}>
        <Router history={history}>
          <Switch>
            <Route path='/create-report' component={CreateReport} exact />
            <Route path='/reports' component={MyReports} exact />
          </Switch>
        </Router>
      </EventContainer>
    </Provider>
  );
};
