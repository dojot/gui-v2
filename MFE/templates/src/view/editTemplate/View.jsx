import React, { useEffect } from 'react';

import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { Check, FilterNone } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { TemplateCreation } from 'sharedComponents/WizardForms';
import { TEMPLATE_ATTR_TYPES } from 'sharedComponents/Constants';
import { useIsLoading, useTemplateCreationState } from 'sharedComponents/Hooks';
import {
  actions as templateActions,
  constants as templateConstants,
} from '../../redux/modules/templates';
import { templateDataSelector } from '../../redux/selectors/templatesSelector';
import { ViewContainer } from 'sharedComponents/Containers';
import useStyles from './style';

const EditTemplate = () => {
  const { t } = useTranslation(['editTemplate', 'common']);
  const { templateId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const templateData = useSelector(templateDataSelector);

  const isEditingTemplate = useIsLoading(templateConstants.EDIT_TEMPLATE);
  const isLoadingTemplate = useIsLoading(templateConstants.GET_TEMPLATE_BY_ID);

  const {
    attrs,
    templateLabel,
    canSaveTemplate,
    setAttrs,
    setTemplateLabel,
    handleCreateAttr,
    handleDeleteAttr,
    handleUpdateAttr,
  } = useTemplateCreationState();

  const handleLeaveTemplateEdition = () => {
    if (history.length) history.goBack();
    else history.push('/templates');
  };

  const handleEditTemplate = e => {
    e.preventDefault();

    const formattedAttrs = attrs.map(attr => {
      const attrClone = { ...attr };
      delete attrClone.id;
      delete attrClone.isDynamic;
      delete attrClone.templateId;
      if (attrClone.type !== TEMPLATE_ATTR_TYPES.STATIC.value) {
        delete attrClone.staticValue;
      }
      return attrClone;
    });

    dispatch(
      templateActions.editTemplate({
        id: templateId,
        label: templateLabel,
        attrs: formattedAttrs,
        successCallback: handleLeaveTemplateEdition,
      }),
    );
  };

  useEffect(() => {
    dispatch(templateActions.getTemplateById({ templateId }));
    return () => dispatch(templateActions.updateTemplates({ templateData: null }));
  }, [dispatch, templateId]);

  useEffect(() => {
    if (templateData) {
      setTemplateLabel(templateData.label);
      setAttrs(templateData.attrs);
    }
  }, [setAttrs, setTemplateLabel, templateData]);

  if (isLoadingTemplate) {
    return (
      <ViewContainer headerTitle={t('titleWithoutLabel')}>
        <Box className={classes.containerCentered} padding={3}>
          <CircularProgress />
        </Box>
      </ViewContainer>
    );
  }

  if (!templateData) {
    return (
      <ViewContainer headerTitle={t('titleWithoutLabel')}>
        <Box className={classes.containerCentered} padding={3}>
          <Box marginBottom={2}>
            <FilterNone size='large' />
          </Box>
          <Typography className={classes.noDataText}>{t('noTemplateData')}</Typography>
        </Box>
      </ViewContainer>
    );
  }

  return (
    <ViewContainer headerTitle={t('title', { label: templateData.label })}>
      <Box className={classes.container} padding={4}>
        <Box className={classes.content} component='form' onSubmit={handleEditTemplate} noValidate>
          <TemplateCreation
            className={classes.templateCreation}
            attrs={attrs}
            title={t('formTitle')}
            subtitle={t('formSubtitle')}
            templateLabel={templateLabel}
            setTemplateLabel={setTemplateLabel}
            handleCreateAttr={handleCreateAttr}
            handleDeleteAttr={handleDeleteAttr}
            handleUpdateAttr={handleUpdateAttr}
          />

          <Box className={classes.actions} paddingTop={4}>
            <Button size='large' variant='text' onClick={handleLeaveTemplateEdition}>
              {t('common:cancel')}
            </Button>

            <Button
              size='large'
              type='submit'
              color='primary'
              variant='contained'
              disabled={!canSaveTemplate || isEditingTemplate}
              endIcon={
                isEditingTemplate ? <CircularProgress color='inherit' size={14} /> : <Check />
              }
            >
              {t('common:save')}
            </Button>
          </Box>
        </Box>
      </Box>
    </ViewContainer>
  );
};

export default EditTemplate;
