import React from 'react';

import { Box, Button, Grid, Typography } from '@material-ui/core';
import { Add, FilterNone } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

const EmptyList = () => {
  const { t } = useTranslation('templates');
  const history = useHistory();

  const handleCreateTemplate = () => {
    history.push('/templates/new');
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
        <FilterNone fontSize='large' />

        <Box paddingY={1}>
          <Typography variant='h6'>{t('emptyListMessage')}</Typography>
        </Box>

        <Button
          color='primary'
          variant='contained'
          endIcon={<Add />}
          onClick={handleCreateTemplate}
        >
          {t('createNewTemplate')}
        </Button>
      </Grid>
    </Box>
  );
};

export default EmptyList;
