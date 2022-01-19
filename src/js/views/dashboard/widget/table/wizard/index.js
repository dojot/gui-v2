import React from 'react';

import { SOURCE, WIDGET } from 'Constants';
import { makeValidate } from 'mui-rff';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';
import { actions as dashboardActions } from 'Redux/dashboard';
import { menuSelector } from 'Selectors/baseSelector';
import { getWizardContext } from 'Selectors/dashboardSelector';
import { generateScheme } from 'Utils';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

import { TEMPLATE_ATTR_VALUE_TYPES } from '../../../../../common/constants';
import useTable from '../../wizard/hooks/useTable';
import { Attributes, General, Summary, RealtimeFilter, generalValidates } from '../../wizard/Steps';
import Selector from '../../wizard/Steps/Selector/OriginSelector/OriginSelector';
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
  const { t } = useTranslation('common');

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
    <>
      <Helmet title={`${title} • ${t('dojotPageTitle')}`} />
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
          validate={null}
          name='attributes'
          staticSupported={false}
          acceptedTypes={Object.values(TEMPLATE_ATTR_VALUE_TYPES).map(({ value }) => value)}
        />
        <RealtimeFilter validate={null} name='filters' />
        <Summary />
      </Wizard>
    </>
  );
};

const mapDispatchToProps = {
  ...dashboardActions,
};

const mapStateToProps = state => ({
  ...menuSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableWizard);
