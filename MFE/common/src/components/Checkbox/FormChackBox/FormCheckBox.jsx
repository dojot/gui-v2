import React, { useEffect } from 'react';

import { Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';

export const FormCheckBox = ({
  input: { onChange, checked },
  disabled,
  callback,
  checkCallback,
}) => {
  useEffect(() => {
    if (!checked) {
      callback();
    }
    checkCallback(!checked);
  }, [checked]);

  return (
    <Checkbox
      edge='start'
      disabled={disabled}
      checked={checked}
      tabIndex={-1}
      disableRipple
      onChange={e => onChange(e)}
      inputProps={{ 'aria-labelledby': 'checkbox' }}
      color='secondary'
    />
  );
};

FormCheckBox.defaultProps = {
  callback: () => {},
  checkCallback: () => {},
  disabled: false,
};

FormCheckBox.propTypes = {
  input: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  callback: PropTypes.func,
  checkCallback: PropTypes.func,
};
