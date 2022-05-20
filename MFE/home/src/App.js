import React from 'react';
import Home from './view';
import i18n from './i18n/i18n';
import { Switch, Route, Router } from 'react-router-dom';
import { EventContainer } from 'sharedComponents/Containers';
import light from './themes'

export default ({ history }) => {
    return (
        <EventContainer i18n={i18n}>
            <Router history={history}>
                <Switch>
                    <Route path="/home" component={Home}/>
                </Switch>
            </Router>
        </EventContainer>
    );
}
