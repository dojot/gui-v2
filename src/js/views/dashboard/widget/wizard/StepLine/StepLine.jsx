import React from 'react';

import PropTypes from 'prop-types';

import useStyles from './style';

const StepLine = props => {
  const classes = useStyles();
  const { active, completed } = props;

  return (
    <div className={`${classes.StepLine}${completed || active ? ' shorted' : ''}`}>
      <div />
    </div>
  );
};

StepLine.propTypes = {
  active: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default StepLine;
