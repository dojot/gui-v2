import React, { useCallback } from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';
import { actions as dashboardActions } from 'Redux/dashboard';
import { Device as DeviceService } from 'Services/index';
import { object2Array } from 'Utils';
import { v4 as uuidv4 } from 'uuid';

import useArea from '../../wizard/hooks/useArea';
import Attributes from '../../wizard/Steps/Attributes';
import Devices from '../../wizard/Steps/Devices';
import Filters from '../../wizard/Steps/Filters';
import General from '../../wizard/Steps/General';
import Summary from '../../wizard/Steps/Summary';
import Wizard from '../../wizard/wizard';

const generalValidates = values => {
  const errors = { general: {} };
  if (!values.general || !values.general.name) {
    errors.general.name = 'Required';
  } else if (values.general.name.length < 5) {
    errors.general.name = 'Minimo de 5 caracteres';
  }
  return errors;
};

// const devicesValidates = values => {
//   const errors = {};
//   return errors;
// };

const stepsList = [
  { label: 'steps.general', key: uuidv4() },
  { label: 'steps.devices', key: uuidv4() },
  { label: 'steps.attributes', key: uuidv4() },
  { label: 'steps.filters', key: uuidv4() },
  { label: 'steps.overview', key: uuidv4() },
];

const WizardPage = ({
  title,
  toDashboard,
  addWidget,
  addWidgetConfig,
  addWidgetSaga,
}) => {
  const generateScheme = useCallback(state => {
    const {
      filterType,
      lastRegs,
      lastDynamicsValue,
      operationType,
      dateFrom,
      dateTo,
      isRealTime,
    } = state.filters;
    const lastN =
      filterType === 0
        ? parseInt(lastRegs, 10)
        : parseInt(lastDynamicsValue, 10);

    return DeviceService.parseHistoryQuery({
      devices: _.values(
        _.mapValues(
          _.groupBy(object2Array(state.attributes), 'deviceID'),
          (value, key) => ({
            deviceID: key,
            attrs: value.map(val => val.label),
          }),
        ),
      ),
      dateFrom,
      dateTo,
      operationType,
      lastN,
      isRealTime,
    });
  }, []);

  const { createAreaWidget } = useArea(
    addWidget,
    addWidgetConfig,
    addWidgetSaga,
    generateScheme,
  );

  const handleSubmit = values => {
    createAreaWidget(values);
    toDashboard();
  };

  const initialState = {
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
      initialValues={initialState}
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

export default connect(null, mapDispatchToProps)(WizardPage);
