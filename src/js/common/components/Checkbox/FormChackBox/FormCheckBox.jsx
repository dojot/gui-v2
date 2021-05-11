import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

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
      inputProps={{ 'aria-labelledby': 'checkbox' }}
      color='primary'
    />
  );
};

FormCheckBox.defaultProps = {
  optionalFunction: () => {},
  disabled: false,
};

FormCheckBox.propTypes = {
  input: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  optionalFunction: PropTypes.func,
};
