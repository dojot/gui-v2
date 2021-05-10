import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';

export const FormCheckBox = ({ input: { onChange, checked }, disabled, optionalFunction }) => {
  const onChangeInternal = e => {
    onChange(e);
    if (checked) {
      optionalFunction();
    }
  };

  return (
    <Checkbox
      edge='start'
      disabled={disabled}
      checked={checked}
      tabIndex={-1}
      disableRipple
      onChange={onChangeInternal}
      inputProps={{ 'aria-labelledby': 'asdf' }}
      color='primary'
    />
  );
};
