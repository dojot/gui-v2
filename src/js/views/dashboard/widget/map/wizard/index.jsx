import React, { useCallback } from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';
import { actions as dashboardActions } from 'Redux/dashboard';
import { Device as DeviceService } from 'Services/index';
import { generateScheme } from 'Utils';
import { v4 as uuidv4 } from 'uuid';

import { useMap } from '../../wizard/hooks';
import {
  Attributes,
  Devices,
  General,
  Summary,
  GeneralFilter as Filters,
  generalValidates,
} from '../../wizard/Steps';
import Wizard from '../../wizard/wizard';

const stepsList = [
  { label: 'steps.general', key: uuidv4() },
  { label: 'steps.devices', key: uuidv4() },
  { label: 'steps.attributes', key: uuidv4() },
  { label: 'steps.filters', key: uuidv4() },
  { label: 'steps.overview', key: uuidv4() },
];

const MapWizard = ({
  title,
  toDashboard,
  addWidget,
  addWidgetConfig,
  addWidgetSaga,
}) => {
  const { createMapWidget } = useMap(
    addWidget,
    addWidgetConfig,
    addWidgetSaga,
    generateScheme,
  );

  const handleSubmit = values => {
    createMapWidget(values);
    toDashboard();
  };

  const initialStateTest = {
    general: {
      name: 'Mapa Teste',
      description: 'Um teste com o widget de mapa',
    },
    devices: {},
    attributes: {},
    filters: {
      filterType: '3',
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
      <Devices validate={null} name='devices' />
      <Attributes
        validate={null}
        name='attributes'
        acceptedTypes={['GEO']}
        staticSupported
      />
      <Filters validate={null} name='filters' />
      <Summary />
    </Wizard>
  );
};

const mapDispatchToProps = {
  ...dashboardActions,
};

export default connect(null, mapDispatchToProps)(MapWizard);
