import React, { useEffect, useState } from 'react';

import { Box, IconButton, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { TemplateCreation } from '../../../../common/components/WizardForms';
import { useTemplateCreationState } from '../../../../common/hooks';
import { actions as templateActions } from '../../../../redux/modules/templates';
import ActionButtons from '../../layout/ActionButtons';
import {
  templatesSelector,
  loadingTemplatesSelector,
  paginationControlSelector,
} from '../../redux/selectors/templatesSelector';
import { useTemplatesStepStyles } from './style';
import TemplateCreationActions from './TemplateCreationActions';
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

  const templates = useSelector(templatesSelector);
  const isLoadingTemplates = useSelector(loadingTemplatesSelector);
  const { totalPages } = useSelector(paginationControlSelector);

  const [page] = useState(0);
  const [rowsPerPage] = useState(10);

  // TODO: Create pagination and show loading
  console.log(isLoadingTemplates, totalPages);

  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);

  const {
    attrs,
    templateName,
    canSaveTemplate,
    setTemplateName,
    handleCreateAttr,
    handleDeleteAttr,
    handleUpdateAttr,
    handleClearState,
    getAttrsWithoutId,
  } = useTemplateCreationState();

  const handleCreateNewTemplate = () => {
    setIsCreatingTemplate(true);
  };

  const handleSearchForTemplates = search => {
    dispatch(templateActions.getTemplates({ filter: { label: search } }));
  };

  const handleDiscardNewTemplate = () => {
    setIsCreatingTemplate(false);
    handleClearState();
  };

  const handleSaveNewTemplate = () => {
    setIsCreatingTemplate(false);
    handleClearState();

    dispatch(
      templateActions.createTemplate({
        name: templateName,
        attrs: getAttrsWithoutId(),
      }),
    );
  };

  useEffect(() => {
    dispatch(
      templateActions.getTemplates({
        page: {
          number: page,
          size: rowsPerPage,
        },
      }),
    );
  }, [dispatch, page, rowsPerPage]);

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
          {isCreatingTemplate ? (
            <TemplateCreation
              className={classes.templateCreation}
              attrs={attrs}
              templateName={templateName}
              setTemplateName={setTemplateName}
              handleCreateAttr={handleCreateAttr}
              handleDeleteAttr={handleDeleteAttr}
              handleUpdateAttr={handleUpdateAttr}
              endExtraComponent={
                <TemplateCreationActions
                  canSaveNewTemplate={canSaveTemplate}
                  handleSaveNewTemplate={handleSaveNewTemplate}
                  handleDiscardNewTemplate={handleDiscardNewTemplate}
                />
              }
            />
          ) : (
            <TemplateTable
              templates={templates}
              selectedTemplates={selectedTemplates}
              numberOfSelectedTemplates={numberOfSelectedTemplates}
              setSelectedTemplates={setSelectedTemplates}
              handleSearchForTemplates={handleSearchForTemplates}
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
