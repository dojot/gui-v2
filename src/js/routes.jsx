import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { RootContainer, ContentContainer } from 'Components/Containers'
import { AppHeader } from 'Components/Header'
import { Drawer } from 'Components/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import LazyLoading from 'common/components/LazyLoading'
import { helper, primary } from 'common/menu'

// This is show case how you can lazy loading component
const ExampleRouteHandler = LazyLoading(() => import('views/example'))
const TestRouteHandler = LazyLoading(() => import('views/test'))

// Please remove that, it is an example
const JustAnotherPage = () => (
  <div>
    <h2>This is Just Another Page</h2>
    <p>
      Please remove this from your route, it is just to show case basic setup
      for router.
    </p>
  </div>
)

const App = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <RootContainer>
      <CssBaseline />
      <AppHeader isOpen={isOpen} handleClick={setIsOpen} />
      <Drawer isOpen={isOpen} secondaryItems={helper} primaryItems={primary} />
      <ContentContainer>
        <Switch>
          <Route exact path="/" component={ExampleRouteHandler} />
          <Route exact path="/dashboard" component={TestRouteHandler} />
          <Route path="/devices" component={JustAnotherPage} />
          <Route path="*" component={ExampleRouteHandler} />
        </Switch>
      </ContentContainer>
    </RootContainer>
  )
}

module.exports = (
  <App />
)
