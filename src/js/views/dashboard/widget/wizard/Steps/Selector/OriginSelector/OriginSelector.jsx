import React from 'react';

import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import { FormTabs } from 'Components/Tabs';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';

import Wizard from '../../../wizard';
import Devices from '../../Devices/DevicesPageOnly';
import Templates from '../../Templates/TemplatePageOnly/templatePageOnly';

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
  const tabItems = [
    <Tab label='Devices' {...a11yProps(0)} key='Devices' />,
    <Tab label='Templates' {...a11yProps(1)} key='Templates' />,
  ];

  return (
    <Wizard.Page validate={validate}>
      <Grid container justify='flex-start'>
        <Field name='selector' component={props => FormTabs(props, tabItems, form)} />
        <TabPanel value={values.selector} index={0}>
          <Devices validate={null} name='devices' />
        </TabPanel>
        <TabPanel value={values.selector} index={1}>
          <Templates validate={null} name='templates' />
        </TabPanel>
      </Grid>
    </Wizard.Page>
  );
};

export default Selector;
