import React from 'react';

import { Box, Button, Grid, Typography } from '@material-ui/core';
import { Add, CertificatesOther } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

const EmptyCertificateList = () => {
  const { t } = useTranslation('certificates');
  const history = useHistory();

  const handleCreateCertificate = () => {
    history.push('/certificates/new');
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
        <CertificatesOther fontSize='large' />

        <Box paddingY={1}>
          <Typography variant='h6'>{t('emptyListMessage')}</Typography>
        </Box>

        <Button
          color='primary'
          variant='contained'
          endIcon={<Add />}
          onClick={handleCreateCertificate}
        >
          {t('createNewCertificate')}
        </Button>
      </Grid>
    </Box>
  );
};

export default EmptyCertificateList;
