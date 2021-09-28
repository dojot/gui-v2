import React from 'react';

import Check from '@material-ui/icons/Check';
import PropTypes from 'prop-types';

import useStyles from './style';

const StepIcon = props => {
  const { completed, active, icon } = props;
  const classes = useStyles();

  return (
    <div>
      {completed ? (
        <Check className={`${classes.CustomStepIcon} completed ${active ? 'active' : ''}`} />
      ) : (
        <div className={`${classes.CustomStepIcon} ${active ? 'active' : ''}`}>{icon}</div>
      )}
    </div>
  );
};

StepIcon.propTypes = {
  active: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
  icon: PropTypes.number.isRequired,
};

export default StepIcon;
