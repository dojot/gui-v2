import React from 'react';

import { Box, Button, Grid, Typography } from '@material-ui/core';
import { Add, VerifiedUserOutlined } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

const EmptyCaList = () => {
  const { t } = useTranslation('certificationAuthorities');
  const history = useHistory();

  const handleCreateCertificationAuthority = () => {
    history.push('/certification-authorities/new');
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
        <VerifiedUserOutlined fontSize='large' />

        <Box paddingY={1}>
          <Typography variant='h6'>{t('emptyListMessage')}</Typography>
        </Box>

        <Button
          color='primary'
          variant='contained'
          endIcon={<Add />}
          onClick={handleCreateCertificationAuthority}
        >
          {t('createCa')}
        </Button>
      </Grid>
    </Box>
  );
};

export default EmptyCaList;
