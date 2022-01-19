import React from 'react';

import { SOURCE, WIDGET } from 'Constants';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';
import { actions as dashboardActions } from 'Redux/dashboard';
import { getWizardContext } from 'Selectors/dashboardSelector';
import { generateScheme } from 'Utils';
import { v4 as uuidv4 } from 'uuid';

import { TEMPLATE_ATTR_VALUE_TYPES } from '../../../../../common/constants';
import useLine from '../../wizard/hooks/useLine';
import {
  Attributes,
  Devices,
  General,
  Summary,
  Filters,
  Security,
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

const LineWizard = ({
  title,
  toDashboard,
  addWidget,
  addWidgetConfig,
  addWidgetSaga,
  addWizardState,
  uuid,
  id,
}) => {
  const { t } = useTranslation('common');

  const { createLineWidget } = useLine(
    addWidget,
    addWidgetConfig,
    addWidgetSaga,
    generateScheme,
    addWizardState,
  );

  const widgetID = uuid ? `${id}/${uuid}` : null;
  const initialStateRecovered = useSelector(state => getWizardContext(state, widgetID));

  const handleSubmit = values => {
    createLineWidget(values, widgetID);
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
      operationType: 8,
      filterType: '0',
      dateTo: '',
      dateFrom: '',
      lastRegs: '15',
      lastDynamicsOption: undefined,
      lastDynamicsValue: '15',
      isRealTime: true,
    },
    widgetType: WIDGET.LINE,
  };
  return (
    <>
      <Helmet title={`${title} • ${t('dojotPageTitle')}`} />
      <Wizard
        initialValues={initialStateRecovered || initialState}
        onSubmit={handleSubmit}
        steps={stepsList}
        headerTitle={title}
      >
        <General validate={generalValidates} name='general' />
        <Security validate={null} name='security' />
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
    </>
  );
};

const mapDispatchToProps = {
  ...dashboardActions,
};

export default connect(null, mapDispatchToProps)(LineWizard);
