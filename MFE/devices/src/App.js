import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import EditDevice from './view/editDevice';
import Devices from './view/devices';
import CreateDevice from './view/createDevice';
import createMultipleDevices from './view/createMultipleDevices';
import DeviceDetails from './view/deviceDetails';
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
            <Route path='/devices/edit/:deviceId' component={EditDevice} />
            <Route path='/devices/new/multiple' component={createMultipleDevices} />
            <Route path='/devices/new' component={CreateDevice} />
            <Route path='/devices/:deviceId' component={DeviceDetails} exact />
            <Route path='/devices' component={Devices} exact />
          </Switch>
        </Router>
      </EventContainer>
    </Provider>
  );
};
