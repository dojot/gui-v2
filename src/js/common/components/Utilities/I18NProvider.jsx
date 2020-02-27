import React from 'react'
import PropTypes from 'prop-types'
import { IntlProvider, addLocaleData } from 'react-intl'

// This is react-intl locale data
import en from 'react-intl/locale-data/en'
import pt from 'react-intl/locale-data/pt'

// This is your translation files
// In case you are curious about locale - https://gist.github.com/jacobbubu/1836273
import enUS from 'common/translations/en-US.json'
import ptBR from 'common/translations/pt_BR.json'

// We are adding english here
addLocaleData([...en, ...pt])

// Creating a map of supported messages
// It will be used in IntlProvider below
const messages = {
  'en-US': enUS,
  'pt-BR': ptBR,
}

export default class I18NProvider extends React.PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render() {
    // query the browser for language / locale
    // feel free to modify this logic to fit your need
    const language = navigator.language.split(/[-_]/)[0]
    const locale = navigator.language

    const { children } = this.props

    return (
      <IntlProvider locale={language} messages={messages[locale]}>
        {children}
      </IntlProvider>
    )
  }
}
