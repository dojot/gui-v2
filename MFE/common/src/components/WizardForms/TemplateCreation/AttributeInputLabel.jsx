import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyles } from './style';

const AttributeInputLabel = ({ className, value, handleUpdateLabel, placeholder, helperText }) => {
  const classes = useStyles();
  const reAttrLabel = /^[0-9a-zA-Z-_]+$/;

  const [attrLabelError, setAttrLabelError] = useState(false);

  const hanleChangeLabel = newLabel => {
    handleUpdateLabel(newLabel);

    if (reAttrLabel.test(newLabel)) {
      setAttrLabelError(false);
    } else {
      setAttrLabelError(true);
    }
  };

  return (
    <TextField
      className={className}
      size='small'
      value={value}
      variant='outlined'
      placeholder={placeholder}
      onChange={e => hanleChangeLabel(e.target.value)}
      error={attrLabelError}
      helperText={attrLabelError ? helperText : null}
      FormHelperTextProps={{
        classes: {
          error: classes.attrLabelHelperText,
        },
      }}
    />
  );
};

AttributeInputLabel.propTypes = {
  className: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleUpdateLabel: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired,
};

export default AttributeInputLabel;
