import React, { useCallback } from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';
import { actions as dashboardActions } from 'Redux/dashboard';
import { Device as DeviceService } from 'Services';
import { v4 as uuidv4 } from 'uuid';

import { useMap } from '../wizard/hooks';
// import {
//   Attributes,
//   Devices,
//   General,
//   Summary,
//   generalValidates,
//   GeneralFilter as Filter,
// } from '../wizard/Steps';
import Attributes from '../wizard/Steps/Attributes';
import Devices from '../wizard/Steps/Devices';
import { GeneralFilter as Filter } from '../wizard/Steps/Filters';
import General, { generalValidates } from '../wizard/Steps/General';
import Summary from '../wizard/Steps/Summary';

const acceptedTypes = ['GEO'];

const stepsList = [
  { label: 'steps.general', key: uuidv4() },
  { label: 'steps.devices', key: uuidv4() },
  { label: 'steps.attributes', key: uuidv4() },
  { label: 'steps.filters', key: uuidv4() },
  { label: 'steps.overview', key: uuidv4() },
];

const Wizard = ({
  title,
  toDashboard,
  addWidget,
  addWidgetConfig,
  addWidgetSaga,
}) => {
  const generateScheme = useCallback(state => {
    const { isRealTime } = state.filter;
    const dynamicAttrs = _.groupBy(state.attributes.dynamicValues, 'deviceID');
    const staticAttrs = _.groupBy(state.attributes.staticValues, 'deviceID');
    const devices = {};
    Object.keys(dynamicAttrs).forEach(key => {
      devices[key] = {
        deviceID: key,
        staticAttrs: [],
        dynamicAttrs: dynamicAttrs[key].map(val => val.label),
      };
    });
    Object.keys(staticAttrs).forEach(key => {
      if (!devices[key]) {
        devices[key] = {
          deviceID: key,
          staticAttrs: staticAttrs[key].map(val => val.label),
          dynamicAttrs: [],
        };
      } else {
        devices[key].staticAttrs = staticAttrs[key].map(val => val.label);
      }
    });
    return DeviceService.parseHistoryQuery({
      devices: Object.values(devices),
      dateFrom: '',
      dateTo: '',
      operationType: 8,
      lastN: 1,
      isRealTime,
    });
  }, []);

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
      name: 'Teste',
      description: '',
    },
    devices: {},
    attributes: {},
    filters: {
      filterType: '0',
      dateTo: '',
      dateFrom: '',
      lastRegs: '15',
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
        acceptedTypes={acceptedTypes}
      />
      <Filter validate={null} name='filters' />
      <Summary />
    </Wizard>
  );
};

// Wizard.propTypes = {
//   title: PropTypes.string.isRequired,
//   toDashboard: PropTypes.func.isRequired,
// };

const mapDispatchToProps = {
  ...dashboardActions,
};

export default connect(null, mapDispatchToProps)(Wizard);
