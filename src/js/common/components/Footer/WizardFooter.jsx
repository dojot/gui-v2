import React from 'react';

import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { useStyles } from './WizardFooter';

const WFooter = props => {
  const classes = useStyles();
  const { isOpen, activeStep, steps, isValid } = props;

  return (
    <div
      className={clsx(classes.footer, {
        [classes.expanded]: !isOpen,
        [classes.collapsed]: isOpen,
      })}
    >
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="submit"
        disabled={!isValid}
        disableElevation
      >
        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
      </Button>
    </div>
  );
};

WFooter.defaultProps = {
  isOpen: false,
  isValid: true,
};

WFooter.propTypes = {
  isOpen: PropTypes.bool,
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
  isValid: PropTypes.bool,
};

export default WFooter;
