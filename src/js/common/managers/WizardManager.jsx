import React from 'react'
import LazyLoading from 'Components/LazyLoading'

const WizardLC = LazyLoading(() => import('views/dashboard/widget/lineChart/Wizard.jsx'))


const Manager = (props) => {
  const { match: { params } } = props;

  console.log(params)

  switch (params.id) {
    case '1': return <WizardLC />
    case '2': return <WizardLC />
    case '3': return <WizardLC />
    case '4': return <WizardLC />
    case '5': return <WizardLC />
    default: return <WizardLC />
  }
}

export default Manager;
