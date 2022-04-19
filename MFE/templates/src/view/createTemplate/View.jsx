import React, { useState } from 'react';

import { Box, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { AlertDialog } from 'sharedComponents/Dialogs';
import { ViewContainer } from 'sharedComponents/Containers';
import { TemplateCreation } from 'sharedComponents/WizardForms';
import { useTemplateCreationState } from 'sharedComponents/Hooks';
import { useIsLoading } from 'sharedComponents/Hooks';
import {
  actions as templateActions,
  constants as templateConstants,
} from '../../redux/modules/templates';

import useStyles from './style';

const CreateTemplate = () => {
  const { t } = useTranslation(['createTemplate', 'common']);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const isLoadingCreateTemplate = useIsLoading(templateConstants.CREATE_TEMPLATE);

  const [isShowingCancelModal, setIsShowingCancelModal] = useState(false);

  const {
    attrs,
    templateLabel,
    canSaveTemplate,
    setTemplateLabel,
    handleCreateAttr,
    handleDeleteAttr,
    handleUpdateAttr,
    getAttrsWithoutId,
  } = useTemplateCreationState();

  const handleLeaveTemplateCreation = () => {
    setIsShowingCancelModal(true);
  };

  const handleGoBack = () => {
    if (history.length) history.goBack();
    else history.push('/templates');
  };

  const handleHideCancelModal = () => {
    setIsShowingCancelModal(false);
  };

  const handleSaveTemplate = e => {
    e.preventDefault();
    dispatch(
      templateActions.createTemplate({
        label: templateLabel,
        attrs: getAttrsWithoutId(),
        successCallback: handleGoBack,
      }),
    );
  };

  return (
    <ViewContainer headerTitle={t('title')}>
      <AlertDialog
        isOpen={isShowingCancelModal}
        cancelButtonText={t('common:no')}
        autoFocusConfirmationButton={false}
        title={t('cancelTemplateCreationTitle')}
        confirmButtonText={t('common:yesImSure')}
        message={t('cancelTemplateCreationMessage')}
        handleConfirm={handleGoBack}
        handleClose={handleHideCancelModal}
      />

      <Box className={classes.container} padding={4}>
        <Box className={classes.content} component='form' onSubmit={handleSaveTemplate} noValidate>
          <TemplateCreation
            className={classes.templateCreation}
            attrs={attrs}
            templateLabel={templateLabel}
            setTemplateLabel={setTemplateLabel}
            handleCreateAttr={handleCreateAttr}
            handleDeleteAttr={handleDeleteAttr}
            handleUpdateAttr={handleUpdateAttr}
          />

          <Box className={classes.actions} paddingTop={4}>
            <Button size='large' variant='text' onClick={handleLeaveTemplateCreation}>
              {t('common:cancel')}
            </Button>

            <Button
              size='large'
              type='submit'
              color='primary'
              variant='contained'
              disabled={!canSaveTemplate || isLoadingCreateTemplate}
            >
              {t('common:save')}
            </Button>
          </Box>
        </Box>
      </Box>
    </ViewContainer>
  );
};

export default CreateTemplate;
