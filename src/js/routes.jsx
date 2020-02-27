import React, { useState } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { RootContainer, ContentContainer } from 'Components/Containers'
import { Drawer } from 'Components/Drawer'
import { AppHeader } from 'Components/Header'
import CssBaseline from '@material-ui/core/CssBaseline';

import LazyLoading from 'common/components/LazyLoading'

// This is show case how you can lazy loading component
const ExampleRouteHandler = LazyLoading(() => import('views/example'))
const TestRouteHandler = LazyLoading(() => import('views/test'))
const Header = LazyLoading(() => import('common/components/Header/Header'))

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

// This show case how you can access routing info in your component
// const HeaderWithRouter = withRouter((props) => <Header {...props} />)
const DrawerWithRouter = (props) => {
  const Ret = withRouter((routes) => <Drawer {...routes} {...props} />)
  return <Ret />
}

const App = () => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <RootContainer>
      <CssBaseline />
      <AppHeader isOpen={isOpen} handleClick={setIsOpen} />
      {/* <DrawerWithRouter isOpen={isOpen} handleClick={setIsOpen} /> */}
      <Drawer isOpen={isOpen} handleClick={setIsOpen} />
      <ContentContainer>
        <Switch>
          <Route exact path="/" component={ExampleRouteHandler} />
          <Route exact path="/test" component={TestRouteHandler} />
          <Route path="/page" component={JustAnotherPage} />
          <Route path="*" component={ExampleRouteHandler} />
        </Switch>
      </ContentContainer>
    </RootContainer>
  )
}

module.exports = (
  <App />
)
