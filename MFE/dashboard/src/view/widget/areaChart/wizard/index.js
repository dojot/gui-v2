import React from 'react';

import { SOURCE, WIDGET, TEMPLATE_ATTR_VALUE_TYPES } from 'sharedComponents/Constants';
import { connect, useSelector } from 'react-redux';
import { actions as dashboardActions } from 'Redux/dashboard';
import { getWizardContext } from 'Selectors/dashboardSelector';
import { generateScheme } from 'sharedComponents/Utils';
import { v4 as uuidv4 } from 'uuid';

import useArea from '../../wizard/hooks/useArea';
import {
  Attributes,
  Devices,
  General,
  Summary,
  Filters,
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

const WizardPage = ({
  title,
  toDashboard,
  addWidget,
  addWidgetConfig,
  addWidgetSaga,
  addWizardState,
  uuid,
  id,
}) => {
  const { createAreaWidget } = useArea(
    addWidget,
    addWidgetConfig,
    addWidgetSaga,
    generateScheme,
    addWizardState,
  );

  const widgetID = uuid ? `${id}/${uuid}` : null;
  const initialStateRecovered = useSelector(state => getWizardContext(state, widgetID));

  const handleSubmit = values => {
    createAreaWidget(values, widgetID);
    toDashboard();
  };

  const initialState = {
    general: {
      name: '',
      description: '',
    },
    selector: SOURCE.DEVICE,
    devices: {},
    templates: {},
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
    widgetType: WIDGET.AREA,
  };
  return (
    <Wizard
      initialValues={initialStateRecovered || initialState}
      onSubmit={handleSubmit}
      steps={stepsList}
      headerTitle={title}
    >
      <General validate={generalValidates} name='general' />
      <Devices validate={null} name='devices' />
      <Attributes
        validate={null}
        name='attributes'
        staticSupported={false}
        acceptedTypes={[
          TEMPLATE_ATTR_VALUE_TYPES.INTEGER.value,
          TEMPLATE_ATTR_VALUE_TYPES.FLOAT.value,
        ]}
      />
      <Filters validate={null} name='filters' />
      <Summary />
    </Wizard>
  );
};

const mapDispatchToProps = {
  ...dashboardActions,
};

export default connect(null, mapDispatchToProps)(WizardPage);
