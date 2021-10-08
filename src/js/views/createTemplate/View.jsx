import React from 'react';

import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { ViewContainer } from '../stateComponents';
import useStyles from './style';

const CreateTemplate = () => {
  const { t } = useTranslation('createTemplate');
  const classes = useStyles();

  return (
    <ViewContainer headerTitle={t('title')}>
      <Box className={classes.container} padding={2}>
        New template
      </Box>
    </ViewContainer>
  );
};

export default CreateTemplate;
