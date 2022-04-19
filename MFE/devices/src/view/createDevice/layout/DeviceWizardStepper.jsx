import React from 'react';

import { Step, StepLabel, Stepper } from '@material-ui/core';
import { StepIcon } from 'sharedComponents/StepIcon';
import { StepLine } from 'sharedComponents/StepLine';
import { useTranslation } from 'react-i18next';

import { STEPS } from '../constants';
import { useDeviceWizardStepperStyles } from './style';

const DeviceWizardStepper = ({ currentStep }) => {
  const { t } = useTranslation('createDevice');
  const classes = useDeviceWizardStepperStyles();

  return (
    <Stepper
      className={classes.stepper}
      activeStep={currentStep}
      orientation='vertical'
      connector={<StepLine />}
    >
      {STEPS.map(step => {
        return (
          <Step key={step.key}>
            <StepLabel StepIconComponent={StepIcon}>{t(step.translation)}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default DeviceWizardStepper;
