import React from 'react';

import { Box, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useTemplateCreationActionsStyles } from './style';

const TemplateCreationActions = ({
  canSaveNewTemplate,
  handleSaveNewTemplate,
  handleDiscardNewTemplate,
}) => {
  const { t } = useTranslation('createDevice');
  const classes = useTemplateCreationActionsStyles();

  return (
    <Box className={classes.container}>
      <Button size='large' variant='text' onClick={handleDiscardNewTemplate}>
        {t('templatesStep.discardNewTemplate')}
      </Button>

      <Button
        size='large'
        color='primary'
        variant='text'
        onClick={handleSaveNewTemplate}
        disabled={!canSaveNewTemplate}
      >
        {t('templatesStep.saveNewTemplate')}
      </Button>
    </Box>
  );
};

TemplateCreationActions.propTypes = {
  canSaveNewTemplate: PropTypes.bool,
  handleSaveNewTemplate: PropTypes.func,
  handleDiscardNewTemplate: PropTypes.func,
};

TemplateCreationActions.defaultProps = {
  canSaveNewTemplate: false,
  handleSaveNewTemplate: null,
  handleDiscardNewTemplate: null,
};

export default TemplateCreationActions;
