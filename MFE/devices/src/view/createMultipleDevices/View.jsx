import React, { useEffect, useMemo, useState } from 'react';

import { Box, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { AlertDialog } from 'sharedComponents/Dialogs';
import { TEMPLATE_ATTR_TYPES } from 'sharedComponents/Constants';
import { useIsLoading } from 'sharedComponents/Hooks';
import { actions, constants } from '../../redux/modules/devices';
import { ViewContainer } from 'sharedComponents/Containers';
import { NUMBER_OF_STEPS } from './constants';
import DeviceWizardStepper from './layout/DeviceWizardStepper';
import { AttrsStep } from './steps/AttrsStep';
import { SummaryStep } from './steps/SummaryStep';
import { TemplatesStep } from './steps/TemplatesStep';
import { ParameterizationStep } from './steps/ParameterizationStep';
import useStyles from './style';

const CreateMultipleDevices = () => {
  const { t } = useTranslation(['createMultipleDevices', 'common']);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const isCreatingDevices = useIsLoading(constants.CREATE_MULTIPLE_DEVICES);

  const [currentStep, setCurrentStep] = useState(0);
  const [isShowingCancelModal, setIsShowingCancelModal] = useState(false);

  const [selectedTemplates, setSelectedTemplates] = useState({});
  const [staticAttrValues, setStaticAttrValues] = useState({});
  const [devicesPrefix, setDevicesPrefix] = useState('');
  const [devicesAmount, setDevicesAmount] = useState('');
  const [initialValueSuffix, setInitialValueSuffix] = useState('1');
  const [createdDevicesWithError, setCreatedDevicesWithError] = useState(false);

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
    setIsShowingCancelModal(true);
  };

  const handleHideCancelModal = () => {
    setIsShowingCancelModal(false);
  };

  const handleGoBack = () => {
    history.push('/devices');
  };

  const createMultipleDevicesSuccessCallback = () => {
    setCreatedDevicesWithError(true);
  };

  const handleCreateMultipleDevices = () => {
    const templateIds = Object.values(selectedTemplates).map(({ id }) => Number(id));

    dispatch(
      actions.createMultipleDevices({
        devicesPrefix: devicesPrefix,
        quantity: parseInt(devicesAmount),
        initialSuffixNumber: parseInt(initialValueSuffix),
        templates: templateIds,
        successCallback: createMultipleDevicesSuccessCallback,
      }),
    );
  };

  // Every time a template is selected this useEffect sets the attr static value as default attr value
  useEffect(() => {
    Object.values(selectedTemplates).forEach(template => {
      template.attrs.forEach(attr => {
        if (attr.type === TEMPLATE_ATTR_TYPES.STATIC.value) {
          setStaticAttrValues(currentAttrValues => {
            const actualValue = currentAttrValues[attr.id];
            const value = actualValue || attr.staticValue || '';
            return { ...currentAttrValues, [attr.id]: value };
          });
        }
      });
    });
  }, [selectedTemplates]);

  return (
    <ViewContainer headerTitle={t('title')}>
      <AlertDialog
        isOpen={isShowingCancelModal}
        cancelButtonText={t('common:no')}
        autoFocusConfirmationButton={false}
        title={t('cancelDeviceCreationTitle')}
        confirmButtonText={t('common:yesImSure')}
        message={t('cancelDeviceCreationMessage')}
        handleConfirm={handleGoBack}
        handleClose={handleHideCancelModal}
      />

      <Box className={classes.container}>
        <Grid className={classes.content} alignItems='stretch' wrap='nowrap' container>
          <Grid item xs='auto' className={classes.stepperWrapper}>
            <DeviceWizardStepper currentStep={currentStep} />
          </Grid>

          <Grid className={classes.step} xs item>
            <Box className={classes.stepContent} padding={2}>
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
                <ParameterizationStep
                  numberOfSelectedTemplates={numberOfSelectedTemplates}
                  handleGoToNextStep={handleGoToNextStep}
                  handleGoToPreviousStep={handleGoToPreviousStep}
                  handleCancelDeviceCreation={handleCancelDeviceCreation}
                  devicesPrefix={devicesPrefix}
                  setDevicesPrefix={setDevicesPrefix}
                  devicesAmount={devicesAmount}
                  setDevicesAmount={setDevicesAmount}
                  initialValueSuffix={initialValueSuffix}
                  setInitialValueSuffix={setInitialValueSuffix}
                  handleCreateMultipleDevices={handleCreateMultipleDevices}
                />
              )}

              {currentStep === 3 && (
                <SummaryStep
                  deviceName={devicesPrefix}
                  isCreatingDevices={isCreatingDevices}
                  selectedTemplates={selectedTemplates}
                  setDeviceName={setDevicesPrefix}
                  handleCreateMultipleDevices={handleCreateMultipleDevices}
                  handleGoToPreviousStep={handleGoToPreviousStep}
                  handleCancelDeviceCreation={handleCancelDeviceCreation}
                  devicesPrefix={devicesPrefix}
                  devicesAmount={devicesAmount}
                  initialValueSuffix={initialValueSuffix}
                  handleGoToDevices={handleGoBack}
                  createdDevicesWithError={createdDevicesWithError}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ViewContainer>
  );
};

export default CreateMultipleDevices;
