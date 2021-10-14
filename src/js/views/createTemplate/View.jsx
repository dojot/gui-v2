import React, { useState, useMemo } from 'react';

import { Box, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { TemplateCreation } from '../../common/components/WizardForms';
import { ViewContainer } from '../stateComponents';
import useStyles from './style';

const CreateTemplate = () => {
  const { t } = useTranslation(['createTemplate', 'common']);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [templateName, setTemplateName] = useState('');
  const [attrs, setAttrs] = useState([]);

  const canSaveTemplate = useMemo(() => {
    const haveALlRequiredData = attrs.every(attr => {
      const { name, type, valueType } = attr;
      return !!name.trim() && !!type && !!valueType;
    });

    return !!templateName.trim() && haveALlRequiredData;
  }, [attrs, templateName]);

  const handleCreateAttr = () => {
    const id = Date.now();
    setAttrs(currentAttrs => [
      ...currentAttrs,
      { id, name: '', type: '', valueType: '', value: '' },
    ]);
  };

  const handleDeleteAttr = index => {
    setAttrs(currentAttrs => {
      const attrsClone = [...currentAttrs];
      attrsClone.splice(index, 1);
      return attrsClone;
    });
  };

  const handleUpdateAttr = (index, attrKey, attrValue) => {
    setAttrs(currentAttrs => {
      const attrsClone = [...currentAttrs];
      attrsClone[index][attrKey] = attrValue;
      return attrsClone;
    });
  };

  const handleCancelTemplateCreation = () => {
    if (history.length) history.goBack();
    else history.push('/templates');
  };

  const handleSaveTemplate = () => {
    const attrsWithoutId = attrs.map(attr => {
      const attrClone = { ...attr };
      delete attrClone.id;
      return attrClone;
    });

    dispatch({ type: 'SAVE', payload: attrsWithoutId });
  };

  return (
    <ViewContainer headerTitle={t('title')}>
      <Box className={classes.container} padding={2}>
        <Box className={classes.content}>
          <TemplateCreation
            className={classes.templateCreation}
            attrs={attrs}
            templateName={templateName}
            setTemplateName={setTemplateName}
            handleCreateAttr={handleCreateAttr}
            handleDeleteAttr={handleDeleteAttr}
            handleUpdateAttr={handleUpdateAttr}
          />

          <Box className={classes.actions} paddingY={2}>
            <Button size='large' variant='text' onClick={handleCancelTemplateCreation}>
              {t('common:cancel')}
            </Button>

            <Button
              size='large'
              color='primary'
              variant='contained'
              disabled={!canSaveTemplate}
              onClick={handleSaveTemplate}
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
