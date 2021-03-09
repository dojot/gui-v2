import React from 'react';

import Tabs from '@material-ui/core/Tabs';
import { origin } from 'Constants';

import { useStyles } from './style';

export const FormTabs = (props, children, form) => {
  const {
    input: { onChange, value },
  } = props;

  const classes = useStyles();

  const handleChange = newValue => {
    // eslint-disable-next-line default-case
    switch (value) {
      case origin.DEVICE:
        form.mutators.clearField('devices', undefined);
        break;
      case origin.TEMPLATE:
        form.mutators.clearField('templates', undefined);
        break;
    }
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
