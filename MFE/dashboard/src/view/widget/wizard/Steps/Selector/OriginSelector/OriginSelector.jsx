import React from 'react';

import { Grid, Box, Tab } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { FormTabs } from 'sharedComponents/Tabs';

import Wizard from '../../../wizard';
import Devices from '../../Devices/DevicesPageOnly';
import Templates from '../../Templates/TemplatePageOnly/templatePageOnly';

export const selectorValidates = values => {
  const errors = {};
  if (values.selector === 0) {
    if (!values.devices) {
      errors.msg = 'requiredDevice';
    } else if (Object.keys(values.devices).length < 1) {
      errors.msg = 'chooseAtLeastOne';
    }
  } else if (!values.templates) {
    errors.msg = 'requiredTemplate';
  } else if (Object.keys(values.templates).length < 1) {
    errors.msg = 'chooseAtLeastOne';
  }
  return errors;
};

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ flex: 1 }}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

TabPanel.defaultProps = {
  children: React.createElement('div'),
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = index => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
};

const Selector = ({ validate, values, form }) => {
  const { t } = useTranslation('dashboard');

  const tabItems = [
    <Tab label={t('devices.devicesTabLabel')} {...a11yProps(0)} key='Devices' />,
    <Tab label={t('devices.templatesTabLabel')} key='Templates' />,
  ];

  return (
    <Wizard.Page validate={validate}>
      <Grid container justifyContent='flex-start'>
        <Field name='selector' component={props => FormTabs(props, tabItems, form)} />
        <TabPanel value={values.selector} index={0}>
          <Devices validate={null} name='devices' form={form} />
        </TabPanel>
        <TabPanel value={values.selector} index={1}>
          <Templates validate={null} name='templates' form={form} />
        </TabPanel>
      </Grid>
    </Wizard.Page>
  );
};

export default Selector;
