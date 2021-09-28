import React from 'react';

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

export default StepLine;
