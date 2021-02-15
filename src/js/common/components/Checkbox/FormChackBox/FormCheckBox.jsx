import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';

export const FormCheckBox = ({ input: { onChange, checked } }) => {
  return (
    <Checkbox
      edge='start'
      checked={checked}
      tabIndex={-1}
      disableRipple
      onChange={onChange}
      inputProps={{ 'aria-labelledby': 'asdf' }}
      color='primary'
    />
  );
};
