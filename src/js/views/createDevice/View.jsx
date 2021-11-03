import React, { useMemo, useState } from 'react';

import { Box, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import { TEMPLATE_ATTR_TYPES } from '../../common/constants';
import { ViewContainer } from '../stateComponents';
import { NUMBER_OF_STEPS } from './constants';
import DeviceWizardStepper from './layout/DeviceWizardStepper';
import { AttrsStep } from './steps/AttrsStep';
import { SecurityStep } from './steps/SecurityStep';
import { SummaryStep } from './steps/SummaryStep';
import { TemplatesStep } from './steps/TemplatesStep';
import useStyles from './style';

const CreateDevice = () => {
  const { t } = useTranslation(['createDevice', 'common']);
  const history = useHistory();
  const classes = useStyles();

  const [currentStep, setCurrentStep] = useState(0);

  const [selectedTemplates, setSelectedTemplates] = useState({});
  const [staticAttrValues, setStaticAttrValues] = useState({});
  const [deviceName, setDeviceName] = useState('');

  const { staticAttrs, dynamicAttrs, actuatorAttrs } = useMemo(() => {
    const staticAttrsArray = [];
    const dynamicAttrsArray = [];
    const actuatorAttrsArray = [];

    Object.values(selectedTemplates).forEach(template => {
      template.attrs.forEach(attr => {
        const attrClone = { ...attr };
        attrClone.templateLabel = template.label;

        if (attrClone.type === TEMPLATE_ATTR_TYPES.STATIC.value) {
          staticAttrsArray.push(attrClone);
        } else if (attrClone.type === TEMPLATE_ATTR_TYPES.DYNAMIC.value) {
          dynamicAttrsArray.push(attrClone);
        } else if (attrClone.type === TEMPLATE_ATTR_TYPES.ACTUATOR.value) {
          actuatorAttrsArray.push(attrClone);
        }
      });
    });

    return {
      staticAttrs: staticAttrsArray,
      dynamicAttrs: dynamicAttrsArray,
      actuatorAttrs: actuatorAttrsArray,
    };
  }, [selectedTemplates]);

  const numberOfSelectedTemplates = useMemo(() => {
    return Object.keys(selectedTemplates).length;
  }, [selectedTemplates]);

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
        <Grid className={classes.content} alignItems='stretch' wrap='nowrap' container>
          <Grid item xs='auto'>
            <DeviceWizardStepper currentStep={currentStep} />
          </Grid>

          <Grid className={classes.step} xs item>
            <Box className={classes.stepContent} paddingY={2}>
              {currentStep === 0 && (
                <TemplatesStep
                  selectedTemplates={selectedTemplates}
                  numberOfSelectedTemplates={numberOfSelectedTemplates}
                  handleGoToNextStep={handleGoToNextStep}
                  setSelectedTemplates={setSelectedTemplates}
                  handleCancelDeviceCreation={handleCancelDeviceCreation}
                />
              )}

              {currentStep === 1 && (
                <AttrsStep
                  staticAttrs={staticAttrs}
                  dynamicAttrs={dynamicAttrs}
                  actuatorAttrs={actuatorAttrs}
                  staticAttrValues={staticAttrValues}
                  handleGoToNextStep={handleGoToNextStep}
                  setStaticAttrValues={setStaticAttrValues}
                  handleGoToPreviousStep={handleGoToPreviousStep}
                  handleCancelDeviceCreation={handleCancelDeviceCreation}
                />
              )}

              {currentStep === 2 && (
                <SecurityStep
                  handleGoToNextStep={handleGoToNextStep}
                  handleGoToPreviousStep={handleGoToPreviousStep}
                  handleCancelDeviceCreation={handleCancelDeviceCreation}
                />
              )}

              {currentStep === 3 && (
                <SummaryStep
                  deviceName={deviceName}
                  selectedTemplates={selectedTemplates}
                  setDeviceName={setDeviceName}
                  handleGoToNextStep={handleGoToNextStep}
                  handleGoToPreviousStep={handleGoToPreviousStep}
                  handleCancelDeviceCreation={handleCancelDeviceCreation}
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
