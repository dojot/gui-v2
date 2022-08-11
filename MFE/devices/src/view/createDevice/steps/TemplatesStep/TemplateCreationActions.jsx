import React from 'react';

import { Box, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useTemplateCreationActionsStyles } from './style';

const TemplateCreationActions = ({ canSaveNewTemplate, handleDiscardNewTemplate }) => {
  const { t } = useTranslation('createDevice');
  const classes = useTemplateCreationActionsStyles();

  return (
    <Box className={classes.container}>
      <Button size='large' variant='text' onClick={handleDiscardNewTemplate}>
        {t('templatesStep.discardNewTemplate')}
      </Button>

      <Button
        size='large'
        type='submit'
        variant='text'
        color='secondary'
        disabled={!canSaveNewTemplate}
      >
        {t('templatesStep.saveNewTemplate')}
      </Button>
    </Box>
  );
};

TemplateCreationActions.propTypes = {
  canSaveNewTemplate: PropTypes.bool,
  handleDiscardNewTemplate: PropTypes.func,
};

TemplateCreationActions.defaultProps = {
  canSaveNewTemplate: false,
  handleDiscardNewTemplate: null,
};

export default TemplateCreationActions;
