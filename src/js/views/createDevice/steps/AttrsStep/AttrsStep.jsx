import React from 'react';

import { Box } from '@material-ui/core';

import ActionButtons from '../../layout/ActionButtons';
import useStyles from './style';

const AttrsStep = ({ handleGoToNextStep, handleGoToPreviousStep, handleCancelDeviceCreation }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>Content</Box>

      <ActionButtons
        isNextButtonDisabled={false}
        handleClickNextButton={handleGoToNextStep}
        handleClickBackButton={handleGoToPreviousStep}
        handleClickCancelButton={handleCancelDeviceCreation}
        withBackButton
      />
    </Box>
  );
};

export default AttrsStep;
