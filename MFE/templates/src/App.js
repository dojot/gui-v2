import React from 'react';
import CreateTemplate from './view/createTemplate';
import EditTemplate from './view/editTemplate';
import TemplateAttrs from './view/templateAttrs';
import Templates from './view/templates';
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
                        <Route path="/templates/edit/:templateId" component={EditTemplate}/>
                        <Route path="/templates/new" component={CreateTemplate}/>
                        <Route path="/templates/:templateId" component={TemplateAttrs}/>
                        <Route path="/templates" component={Templates}/>
                    </Switch>
                </Router>
            </EventContainer>
        </Provider>
    );
}
