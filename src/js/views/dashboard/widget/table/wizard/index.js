import React from 'react';

import { connect } from 'react-redux';
import { actions as dashboardActions } from 'Redux/dashboard';
import { generateScheme } from 'Utils';
import { v4 as uuidv4 } from 'uuid';

import useTable from '../../wizard/hooks/useTable';
import Attributes from '../../wizard/Steps/Attributes';
import Devices from '../../wizard/Steps/Devices';
import Filters from '../../wizard/Steps/Filters';
import General, { generalValidates } from '../../wizard/Steps/General';
import Summary from '../../wizard/Steps/Summary';
import Wizard from '../../wizard/wizard';

const stepsList = [
  { label: 'steps.general', key: uuidv4() },
  { label: 'steps.devices', key: uuidv4() },
  { label: 'steps.attributes', key: uuidv4() },
  { label: 'steps.filters', key: uuidv4() },
  { label: 'steps.overview', key: uuidv4() },
];

const TableWizard = ({
  title,
  toDashboard,
  addWidget,
  addWidgetConfig,
  addWidgetSaga,
}) => {
  const { createTableWidget } = useTable(
    addWidget,
    addWidgetConfig,
    addWidgetSaga,
    generateScheme,
  );

  const handleSubmit = values => {
    createTableWidget(values);
    toDashboard();
  };

  const initialStateTest = {
    general: {
      name: '',
      description: '',
    },
    devices: {},
    attributes: {},
    filters: {
      filterType: '0',
      dateTo: '',
      dateFrom: '',
      lastRegs: '15',
      lastDynamicsOption: undefined,
      lastDynamicsValue: '15',
      isRealTime: true,
    },
  };
  return (
    <Wizard
      initialValues={initialStateTest}
      onSubmit={handleSubmit}
      steps={stepsList}
      headerTitle={title}
    >
      <General validate={generalValidates} name='general' />
      <Devices name='devices' />
      <Attributes name='devices' />
      <Filters validate={null} name='filters' />
      <Summary />
    </Wizard>
  );
};

const mapDispatchToProps = {
  ...dashboardActions,
};

export default connect(null, mapDispatchToProps)(TableWizard);
