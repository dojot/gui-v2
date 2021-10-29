import React, { useEffect, useState } from 'react';

import { Box, IconButton, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { TemplateCreation } from '../../../../common/components/WizardForms';
import { useTemplateCreationState } from '../../../../common/hooks';
import { actions as templateActions } from '../../../../redux/modules/templates';
import {
  templatesSelector,
  loadingTemplatesSelector,
  paginationControlSelector,
} from '../../../../redux/selectors/templatesSelector';
import ActionButtons from '../../layout/ActionButtons';
import { useTemplatesStepStyles } from './style';
import TemplateCreationActions from './TemplateCreationActions';
import TemplatesTable from './TemplatesTable';

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
  const { totalPages = 0 } = useSelector(paginationControlSelector);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
            <TemplatesTable
              page={page}
              templates={templates}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              selectedTemplates={selectedTemplates}
              isLoadingTemplates={isLoadingTemplates}
              numberOfSelectedTemplates={numberOfSelectedTemplates}
              handleChangePage={handleChangePage}
              setSelectedTemplates={setSelectedTemplates}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
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