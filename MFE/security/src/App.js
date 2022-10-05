import React from 'react';
import Certificates from './view/Certificates';
import CertificationAuthorities from './view/CertificationAuthorities';
import CreateCertificate from './view/createCertificate';
import ImportCertificates from './view/importCertificates/View';
import CreateCertificationAuthority from './view/createCertificationAuthority';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';
import { Switch, Route, Router } from 'react-router-dom';
import i18n from './i18n';
import { EventContainer } from 'sharedComponents/Containers';

const store = configureStore({});

export default ({ history }) => {
  return (
    <Provider store={store}>
      <EventContainer i18n={i18n}>
        <Router history={history}>
          <Switch>
            <Route
              path='/certification-authorities/new'
              component={CreateCertificationAuthority}
              exact
            />
            <Route path='/certification-authorities' component={CertificationAuthorities} exact />
            <Route path='/certificates/new' component={CreateCertificate} exact />
            <Route path='/certificates/new/import' component={ImportCertificates} exact />
            <Route path='/certificates' component={Certificates} exact />
          </Switch>
        </Router>
      </EventContainer>
    </Provider>
  );
};
