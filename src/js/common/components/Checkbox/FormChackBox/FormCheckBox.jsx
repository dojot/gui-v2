import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';

export const FormCheckBox = ({ input: { onChange, checked }, disabled }) => {
  return (
    <Checkbox
      edge='start'
      disabled={disabled}
      checked={checked}
      tabIndex={-1}
      disableRipple
      onChange={onChange}
      inputProps={{ 'aria-labelledby': 'asdf' }}
      color='primary'
    />
  );
};
