import React from 'react'
import LazyLoading from 'Components/LazyLoading'

const WizardLC = LazyLoading(() => import('views/dashboard/widget/lineChart/Wizard.jsx'))
const WizardAC = LazyLoading(() => import('views/dashboard/widget/areaChart/Wizard.jsx'))
const WizardBC = LazyLoading(() => import('views/dashboard/widget/barChart/Wizard.jsx'))


const Manager = (props) => {
  const { match: { params }, history } = props;
  const {
    line, area, bar, pizza, donut, bubble,
  } = __CONFIG__;

  const toDashboard = () => {
    history.push('/dashboard')
  }

  switch (params.id) {
    case line: return <WizardLC toDashboard={toDashboard} />
    case area: return <WizardAC toDashboard={toDashboard} />
    case bar: return <WizardBC toDashboard={toDashboard} />
    case pizza: return <WizardLC />
    case donut: return <WizardLC />
    case bubble: return <WizardLC />
    default: return <div />
  }
}

export default Manager;
