import React, { useState } from 'react';

import { Box, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { actions, constants } from '../../redux/modules/devices';
import { useHistory } from 'react-router-dom';

import { useIsLoading } from 'sharedComponents/Hooks';

import { ViewContainer } from 'sharedComponents/Containers';
import { AlertDialog } from 'sharedComponents/Dialogs';
import useStyles from './style';
import ImportStep from './steps/ImportStep';
import SummaryStep from './steps/SummaryStep';

const CreateDevicesCSV = () => {
  const { t } = useTranslation(['createDevicesCSV', 'common']);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const isLoadingCreateDevicesCSV = useIsLoading(constants.CREATE_DEVICES_CSV);

  const [currentStep, setCurrentStep] = useState(0);
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);
  const [createdDevices, setCreatedDevices] = useState(0);
  const [notCreatedDevices, setNotCreatedDevices] = useState([]);
  const [isShowingCancelModal, setIsShowingCancelModal] = useState(false);

  const handleGoToDevicesPage = () => {
    history.push('/devices');
  };

  const handleHideCancelModal = () => {
    setIsShowingCancelModal(false);
  };

  const successCallbackCreation = (devicesSuccess, devicesFail) => {
    setCreatedDevices(devicesSuccess);
    setNotCreatedDevices(devicesFail);
  };

  const handleCreateDevicesCSV = () => {
    dispatch(
      actions.createDevicesCSV({
        csvFile: file,
        successCallback: successCallbackCreation,
      }),
    );
  };

  return (
    <ViewContainer headerTitle={t('title')}>
      <AlertDialog
        isOpen={isShowingCancelModal}
        cancelButtonText={t('common:no')}
        autoFocusConfirmationButton={false}
        title={t('cancelDeviceCreationTitle')}
        confirmButtonText={t('common:yesImSure')}
        message={t('cancelDeviceCreationMessage')}
        handleConfirm={handleGoToDevicesPage}
        handleClose={handleHideCancelModal}
      />

      <Box className={classes.container}>
        <Grid className={classes.content} alignItems='stretch' wrap='nowrap' container>
          <Grid className={classes.step} xs item>
            <Box className={classes.stepContent} padding={2}>
              {currentStep === 0 && (
                <ImportStep
                  file={file}
                  setFile={setFile}
                  fileName={fileName}
                  setFileName={setFileName}
                  setCurrentStep={setCurrentStep}
                  handleGoToDevicesPage={handleGoToDevicesPage}
                  setIsShowingCancelModal={setIsShowingCancelModal}
                  handleCreateDevicesCSV={handleCreateDevicesCSV}
                />
              )}

              {currentStep === 1 && (
                <SummaryStep
                  createdDevices={createdDevices}
                  notCreatedDevices={notCreatedDevices}
                  isLoadingCreateDevicesCSV={isLoadingCreateDevicesCSV}
                  handleGoToDevicesPage={handleGoToDevicesPage}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ViewContainer>
  );
};

export default CreateDevicesCSV;
