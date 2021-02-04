import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import './common/i18n/i18n';
import theme from 'Themes';
import 'fontsource-roboto';

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
        <Provider store={store}>{this.content}</Provider>
      </ThemeProvider>
    );
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  Routes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};
