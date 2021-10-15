import React from 'react';

import { Box, Button, Grid, Typography } from '@material-ui/core';
import { Add, LocalOffer } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

const EmptyList = () => {
  const { t } = useTranslation('templateAttrs');
  const history = useHistory();

  const handleCreateAttr = () => {
    history.push('/templates/attr/new');
  };

  return (
    <Box style={{ height: '100%' }} padding={2}>
      <Grid
        style={{ height: '100%' }}
        direction='column'
        alignItems='center'
        justify='center'
        container
      >
        <LocalOffer fontSize='large' />

        <Box paddingY={1}>
          <Typography variant='h6'>{t('emptyListMessage')}</Typography>
        </Box>

        <Button color='primary' variant='contained' endIcon={<Add />} onClick={handleCreateAttr}>
          {t('createNewAttr')}
        </Button>
      </Grid>
    </Box>
  );
};

export default EmptyList;
