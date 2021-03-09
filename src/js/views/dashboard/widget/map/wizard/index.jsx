import React from 'react';

import { origin } from 'Constants';
import { makeValidate } from 'mui-rff';
import { connect, useSelector } from 'react-redux';
import { actions as dashboardActions } from 'Redux/dashboard';
import { getWizardContext } from 'Selectors/dashboardSelector';
import { generateScheme } from 'Utils';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

import { useMap } from '../../wizard/hooks';
import { Attributes, General, Summary, MapFilters, generalValidates } from '../../wizard/Steps';
import Selector from '../../wizard/Steps/Selector/OriginSelector/OriginSelector';
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

  // TODO: Put the schema in a better place
  const schema = Yup.object().shape({
    devices: Yup.object().when('selector', {
      is: value => value === 0,
      then: Yup.object().required(),
      otherwise: Yup.object().default(null).nullable(),
    }),
    templates: Yup.object().when('selector', {
      is: value => value === 1,
      then: Yup.object().required(),
      otherwise: Yup.object().default(null).nullable(),
    }),
  });

  const selectorValidates = makeValidate(schema, error => {
    return error.message;
  });

  const initialState = {
    general: {
      name: '',
      description: '',
    },
    selector: origin.DEVICE,
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
      initialValues={initialStateRecovered || initialState}
      onSubmit={handleSubmit}
      steps={stepsList}
      headerTitle={title}
    >
      <General validate={generalValidates} name='general' />
      <Selector validate={selectorValidates} />
      <Attributes validate={null} name='attributes' acceptedTypes={['GEO']} />
      <MapFilters validate={null} name='filters' />
      <Summary />
    </Wizard>
  );
};

const mapDispatchToProps = {
  ...dashboardActions,
};

export default connect(null, mapDispatchToProps)(MapWizard);
