import React from 'react';

import { Box, Button, Grid, Typography } from '@material-ui/core';
import { Add, DevicesOther } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

const EmptyDeviceList = () => {
  const { t } = useTranslation('devices');
  const history = useHistory();

  const handleCreateDevice = () => {
    history.push('/devices/new');
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
        <DevicesOther fontSize='large' />

        <Box paddingY={1}>
          <Typography variant='h6'>{t('emptyListMessage')}</Typography>
        </Box>

        <Button color='primary' variant='contained' endIcon={<Add />} onClick={handleCreateDevice}>
          {t('createNewDevice')}
        </Button>
      </Grid>
    </Box>
  );
};

export default EmptyDeviceList;
