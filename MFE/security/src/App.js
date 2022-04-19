import React from 'react';
import Certificates from './view/Certificates';
import CertificationAuthorities from './view/CertificationAuthorities';
import CreateCertificate from './view/createCertificate';
import CreateCertificationAuthority from './view/createCertificationAuthority';
import configureStore from './redux/configureStore';
import light from './themes';
import { Provider } from 'react-redux';
import { Switch, Route, Router } from 'react-router-dom';
import i18n from './i18n';
import { EventContainer } from 'sharedComponents/Containers';

const store = configureStore({});

export default ({ history }) => {
    return (
        <Provider store={store}>
            <EventContainer i18n={i18n} theme={light}>
                <Router history={history}>
                    <Switch>
                        <Route path="/certification-authorities/new" component={CreateCertificationAuthority}/>
                        <Route path="/certification-authorities" component={CertificationAuthorities}/>
                        <Route path="/certificates/new" component={CreateCertificate}/>
                        <Route path="/certificates" component={Certificates}/>
                    </Switch>
                </Router>
            </EventContainer>
        </Provider>
    );
}
