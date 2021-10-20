import React, { useState } from 'react';

import { Box, Grid, Step, StepLabel, Stepper } from '@material-ui/core';
import { StepIcon } from 'Components/StepIcon';
import { StepLine } from 'Components/StepLine';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import { ViewContainer } from '../stateComponents';
import AttrsStep from './steps/AttrsStep';
import SecurityStep from './steps/SecurityStep';
import SummaryStep from './steps/SummaryStep';
import TemplatesStep from './steps/TemplatesStep';
import useStyles from './style';

const STEPS = [
  { key: 'templates', translation: 'stepper.templates' },
  { key: 'attrs', translation: 'stepper.attrs' },
  { key: 'certificates', translation: 'stepper.certificates' },
  { key: 'summary', translation: 'stepper.summary' },
];

const NUMBER_OF_STEPS = STEPS.length;

const CreateDevice = () => {
  const { t } = useTranslation(['createDevice', 'common']);
  const history = useHistory();
  const classes = useStyles();

  const [currentStep, setCurrentStep] = useState(0);

  const handleGoToNextStep = () => {
    setCurrentStep(step => Math.min(step + 1, NUMBER_OF_STEPS));
  };

  const handleGoToPreviousStep = () => {
    setCurrentStep(step => Math.max(step - 1, 0));
  };

  const handleCancelDeviceCreation = () => {
    if (history.length) history.goBack();
    else history.push('/devices');
  };

  return (
    <ViewContainer headerTitle={t('title')}>
      <Box className={classes.container}>
        <Grid className={classes.content} alignItems='stretch' container>
          <Grid item sm='auto'>
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
          </Grid>

          <Grid className={classes.step} sm={10} item>
            <Box className={classes.stepContent} paddingY={2}>
              {currentStep === 0 && (
                <TemplatesStep
                  handleGoToNextStep={handleGoToNextStep}
                  handleCancelDeviceCreation={handleCancelDeviceCreation}
                />
              )}

              {currentStep === 1 && (
                <AttrsStep
                  handleGoToNextStep={handleGoToNextStep}
                  handleGoToPreviousStep={handleGoToPreviousStep}
                />
              )}

              {currentStep === 2 && (
                <SecurityStep
                  handleGoToNextStep={handleGoToNextStep}
                  handleGoToPreviousStep={handleGoToPreviousStep}
                />
              )}

              {currentStep === 3 && (
                <SummaryStep
                  handleGoToNextStep={handleGoToNextStep}
                  handleGoToPreviousStep={handleGoToPreviousStep}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ViewContainer>
  );
};

export default CreateDevice;
