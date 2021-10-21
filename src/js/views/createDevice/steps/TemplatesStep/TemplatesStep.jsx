import React, { useState } from 'react';

import { Box, IconButton, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import ActionButtons from '../../layout/ActionButtons';
import { useTemplatesStepStyles } from './style';
import TemplateTable from './TemplateTable';

const TemplatesStep = ({
  selectedTemplates,
  numberOfSelectedTemplates,
  handleGoToNextStep,
  setSelectedTemplates,
  handleCancelDeviceCreation,
}) => {
  const { t } = useTranslation('createDevice');
  const classes = useTemplatesStepStyles();
  const dispatch = useDispatch();

  const templates = [
    { id: 'abc1', label: 'Modelo 1', attrsLength: 1 },
    { id: 'abc2', label: 'Modelo 2', attrsLength: 2 },
    { id: 'abc3', label: 'Modelo 3', attrsLength: 3 },
    { id: 'abc4', label: 'Modelo 4', attrsLength: 4 },
    { id: 'abc5', label: 'Modelo 5', attrsLength: 5 },
    { id: 'abc6', label: 'Modelo 6', attrsLength: 6 },
    { id: 'abc7', label: 'Modelo 7', attrsLength: 7 },
    { id: 'abc8', label: 'Modelo 8', attrsLength: 8 },
    { id: 'abc9', label: 'Modelo 9', attrsLength: 9 },
  ];

  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);

  const handleCreateNewTemplate = () => {
    setIsCreatingTemplate(true);
  };

  const handleSearchForTemplates = search => {
    dispatch({ type: 'SEARCH', payload: search });
  };

  const handleSelectTemplate = template => {
    const isAlreadySelected = !!selectedTemplates[template.id];

    if (isAlreadySelected) {
      setSelectedTemplates(currentSelectedTemplates => {
        const selectedTemplatesClone = { ...currentSelectedTemplates };
        delete selectedTemplatesClone[template.id];
        return selectedTemplatesClone;
      });
    } else {
      setSelectedTemplates(currentSelectedTemplates => {
        const selectedTemplatesClone = { ...currentSelectedTemplates };
        selectedTemplatesClone[template.id] = template;
        return selectedTemplatesClone;
      });
    }
  };

  const handleSelectAllTemplates = event => {
    if (event.target.checked) {
      const newSelectedTemplates = {};
      templates.forEach(template => {
        newSelectedTemplates[template.id] = template;
      });
      setSelectedTemplates(newSelectedTemplates);
    } else {
      setSelectedTemplates({});
    }
  };

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

        <Box className={classes.stepComponent} marginBottom={2}>
          {isCreatingTemplate ? null : (
            <TemplateTable
              templates={templates}
              selectedTemplates={selectedTemplates}
              handleSelectTemplate={handleSelectTemplate}
              numberOfSelectedTemplates={numberOfSelectedTemplates}
              handleSearchForTemplates={handleSearchForTemplates}
              handleSelectAllTemplates={handleSelectAllTemplates}
            />
          )}
        </Box>
      </Box>

      <ActionButtons
        isNextButtonDisabled={numberOfSelectedTemplates === 0}
        handleClickNextButton={handleGoToNextStep}
        handleClickCancelButton={handleCancelDeviceCreation}
      />
    </Box>
  );
};

TemplatesStep.propTypes = {
  selectedTemplates: PropTypes.object.isRequired,
  numberOfSelectedTemplates: PropTypes.number.isRequired,
  handleGoToNextStep: PropTypes.func.isRequired,
  setSelectedTemplates: PropTypes.func.isRequired,
  handleCancelDeviceCreation: PropTypes.func.isRequired,
};

export default TemplatesStep;
