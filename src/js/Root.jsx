import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
// You could use BrowserRoute or HashRoute
// But passing in history directly to Route will
// give your app more flexibility on deeper integration of `history`
import { Router } from 'react-router-dom'

import I18NProvider from 'common/components/Utilities/I18NProvider'
import { ThemeProvider } from '@material-ui/styles';
import theme from 'Themes/theme'

export default class Root extends React.PureComponent {
  get content() {
    const { Routes, history } = this.props

    return <Router history={history}><Routes /></Router>
  }

  render() {
    const { store } = this.props

    return (
      <ThemeProvider theme={theme}>
        <I18NProvider>
          <Provider store={store}>{this.content}</Provider>
        </I18NProvider>
      </ThemeProvider>
    )
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  Routes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
}
