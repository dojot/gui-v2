import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { RootContainer, ContentContainer } from 'Components/Containers'
import { AppHeader } from 'Components/Header'
import { Drawer } from 'Components/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import LazyLoading from 'common/components/LazyLoading'
import { helper, primary } from 'common/menu'
import { connect } from 'react-redux'
import { actions as baseActions } from 'Redux/base'
import { menuSelector, titleSelector } from 'Selectors/baseSelector'

// This is show case how you can lazy loading component
const ExampleRouteHandler = LazyLoading(() => import('views/example'))
const GridTest = LazyLoading(() => import('views/gridTest'))
const TestRouteHandler = LazyLoading(() => import('views/test'))
const Dashboard = LazyLoading(() => import('views/dashboard'))
const Widget = LazyLoading(() => import('views/dashboard/widget'))
const Wizard = LazyLoading(() => import('views/dashboard/widget/lineChart/Wizard.jsx'))
const WizardManager = LazyLoading(() => import('./common/managers/WizardManager'))

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

const App = (props) => {
  const {
    isMenuOpen,
    updateIsMenuOpen,
    headerTitle,
    updateHeaderTitle,
  } = props;

  return (
    <RootContainer>
      <CssBaseline />
      <AppHeader
        isOpen={isMenuOpen}
        handleClick={updateIsMenuOpen}
        title={headerTitle}
      />
      <Drawer
        isOpen={isMenuOpen}
        secondaryItems={helper}
        primaryItems={primary}
        handleChange={updateHeaderTitle}
      />
      <ContentContainer>
        <Switch>
          <Route exact path="/" component={ExampleRouteHandler} />
          <Route path="/dashboard/widget/wizard/:id" component={WizardManager} />
          <Route path="/dashboard/widget" component={Widget} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/devices" component={JustAnotherPage} />
          <Route path="/templates" component={TestRouteHandler} />
          <Route path="/flow" component={TestRouteHandler} />
          <Route path="/notification" component={TestRouteHandler} />
          <Route path="/users" component={TestRouteHandler} />
          <Route path="/profiles" component={GridTest} />
          <Route path="*" component={ExampleRouteHandler} />
        </Switch>
      </ContentContainer>
    </RootContainer>
  )
}

const mapStateToProps = (state) => ({
  ...menuSelector(state),
  ...titleSelector(state),
})

const mapDispatchToProps = {
  ...baseActions,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
