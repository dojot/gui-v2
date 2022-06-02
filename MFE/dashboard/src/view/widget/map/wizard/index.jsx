import React from 'react';

import { SOURCE, WIDGET } from 'sharedComponents/Constants';
import { connect, useSelector } from 'react-redux';
import { actions as dashboardActions } from 'Redux/dashboard';
import { getWizardContext } from 'Selectors/dashboardSelector';
import { generateScheme } from 'sharedComponents/Utils';
import { v4 as uuidv4 } from 'uuid';

import { TEMPLATE_ATTR_VALUE_TYPES } from 'sharedComponents/Constants';
import { useMap } from '../../wizard/hooks';
import {
  Attributes,
  General,
  Summary,
  RealtimeFilter,
  generalValidates,
  attrValidates,
} from '../../wizard/Steps';
import Selector, { selectorValidates } from '../../wizard/Steps/Selector/OriginSelector/OriginSelector';
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
  addWizardState,
  uuid,
  id,
}) => {
  const { createMapWidget } = useMap(
    addWidget,
    addWidgetConfig,
    addWidgetSaga,
    generateScheme,
    addWizardState,
  );

  const widgetID = uuid ? `${id}/${uuid}` : null;
  const initialStateRecovered = useSelector(state => getWizardContext(state, widgetID));

  const handleSubmit = values => {
    createMapWidget(values, widgetID);
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
      filterType: '3',
      lastRegs: '1',
      isRealTime: true,
    },
    widgetType: WIDGET.MAP,
  };
  return (
    <Wizard
      initialValues={initialStateRecovered || initialState}
      onSubmit={handleSubmit}
      steps={stepsList}
      headerTitle={title}
    >
      <General validate={generalValidates} name='general' />
      <Selector validate={ selectorValidates } />
      <Attributes
        validate={attrValidates}
        name='attributes'
        acceptedTypes={[TEMPLATE_ATTR_VALUE_TYPES.GEO_POINT.value]}
      />
      <RealtimeFilter validate={null} name='filters' />
      <Summary />
    </Wizard>
  );
};

const mapDispatchToProps = {
  ...dashboardActions,
};

export default connect(null, mapDispatchToProps)(MapWizard);
