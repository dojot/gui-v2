import React from 'react';

import { SOURCE, WIDGET } from 'sharedComponents/Constants';
import { connect, useSelector } from "react-redux";
import { getWizardContext } from 'Selectors/dashboardSelector';
import { actions as dashboardActions } from 'Redux/dashboard';
import { generateScheme } from 'sharedComponents/Utils';
import { v4 as uuidv4 } from 'uuid';

import { TEMPLATE_ATTR_VALUE_TYPES } from 'sharedComponents/Constants';
import useTable from '../../wizard/hooks/useTable';
import {
  Attributes,
  General,
  Summary,
  RealtimeFilter,
  generalValidates,
  attrValidates,
} from '../../wizard/Steps';
import Selector, { selectorValidates } from "../../wizard/Steps/Selector/OriginSelector/OriginSelector";
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
  addWizardState,
  uuid,
  id,
  isMenuOpen,
}) => {
  const { createTableWidget } = useTable(
    addWidget,
    addWidgetConfig,
    addWidgetSaga,
    generateScheme,
    addWizardState,
  );

  const widgetID = uuid ? `${id}/${uuid}` : null;
  const initialStateRecovered = useSelector(state => getWizardContext(state, widgetID));

  const handleSubmit = values => {
    createTableWidget(values, widgetID);
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
    widgetType: WIDGET.TABLE,
  };
  return (
    <Wizard
      initialValues={initialStateRecovered || initialState}
      onSubmit={handleSubmit}
      steps={stepsList}
      headerTitle={title}
      menuState={isMenuOpen}
    >
      <General validate={generalValidates} name='general' />
      <Selector validate={selectorValidates} />
      <Attributes
        validate={attrValidates}
        name='attributes'
        staticSupported={false}
        acceptedTypes={Object.values(TEMPLATE_ATTR_VALUE_TYPES).map(({ value }) => value)}
      />
      <RealtimeFilter validate={null} name='filters' />
      <Summary />
    </Wizard>
  );
};

const mapDispatchToProps = {
  ...dashboardActions,
};

export default connect(null, mapDispatchToProps)(TableWizard);
