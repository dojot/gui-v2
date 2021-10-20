import React, { useState } from 'react';

import { Box, IconButton, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import TemplateTable from '../../../../common/components/TemplateTable/TemplateTable';
import ActionButtons from '../../layout/ActionButtons';
import useStyles from './style';

const TemplatesStep = ({ handleGoToNextStep, handleCancelDeviceCreation }) => {
  const { t } = useTranslation('createDevice');
  const classes = useStyles();

  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);

  const handleCreateNewTemplate = () => {
    setIsCreatingTemplate(true);
  };

  const handleFilterTemplates = () => {};

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        <Box className={classes.header} marginBottom={2}>
          <Typography>{t('templatesStep.hint')}</Typography>

          <IconButton
            className={classes.headerButton}
            onClick={handleCreateNewTemplate}
            disabled={isCreatingTemplate}
          >
            <Add />
          </IconButton>
        </Box>

        <Box className={classes.stepComponent}>
          {isCreatingTemplate ? null : (
            <TemplateTable templates={[]} handleFilterTemplates={handleFilterTemplates} />
          )}
        </Box>
      </Box>

      <ActionButtons
        handleClickNextButton={handleGoToNextStep}
        handleClickCancelButton={handleCancelDeviceCreation}
      />
    </Box>
  );
};

TemplatesStep.propTypes = {
  handleGoToNextStep: PropTypes.func.isRequired,
  handleCancelDeviceCreation: PropTypes.func.isRequired,
};

export default TemplatesStep;
