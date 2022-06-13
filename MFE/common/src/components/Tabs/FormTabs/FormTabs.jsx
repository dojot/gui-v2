import React from 'react';

import { Tabs } from '@material-ui/core';
import { SOURCE } from 'Constants';

import { useStyles } from './style';

export const FormTabs = (props, children, form) => {
  const {
    input: { onChange, value },
  } = props;

  const classes = useStyles();

  const handleChange = newValue => {
    // eslint-disable-next-line default-case
    switch (value) {
      case SOURCE.DEVICE:
        form.mutators.clearField('devices', {});
        break;
      case SOURCE.TEMPLATE:
        form.mutators.clearField('templates', {});
        break;
    }
    form.mutators.clearField('attributes', {});
    onChange(newValue);
  };
  return (
    <Tabs
      orientation='vertical'
      variant='scrollable'
      value={value}
      aria-label='Vertical tabs example'
      className={classes.tabs}
      onChange={(event, newValue) => handleChange(newValue)}
    >
      {children}
    </Tabs>
  );
};
