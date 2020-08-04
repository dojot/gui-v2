import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import I18NProvider from 'common/components/Utilities/I18NProvider';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import theme from 'Themes';

export default class Root extends React.PureComponent {
  get content() {
    const { Routes, history } = this.props;
    return (
      <Router history={history}>
        <Routes />
      </Router>
    );
  }

  render() {
    const { store } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <I18NProvider>
          <Provider store={store}>{this.content}</Provider>
        </I18NProvider>
      </ThemeProvider>
    );
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  Routes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};
