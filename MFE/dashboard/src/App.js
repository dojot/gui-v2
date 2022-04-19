import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import Dashboard from './view';
import Widget from './view/widget';
import WizardManager from './managers/WizardManager';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import i18n from './i18n';
import { EventContainer } from 'sharedComponents/Containers';
import light from './themes';

const store = configureStore({});

export default ({ history }) => {
    return (
        <Provider store={store}>
            <EventContainer i18n={i18n} theme={light}>
                <Router history={history}>
                    <Switch>
                        <Route path="/dashboard/widget/wizard/:id/:uuid?" component={WizardManager}/>
                        <Route path="/dashboard/widget" component={Widget}/>
                        <Route path="/dashboard" component={Dashboard}/>
                    </Switch>
                </Router>
            </EventContainer>
        </Provider>
    );
}
