import React from 'react';

import { Box, Button, Grid, Typography } from '@material-ui/core';
import { Add, LocalOffer } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const EmptyList = ({ handleCreateAttr }) => {
  const { t } = useTranslation('templateAttrs');

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

EmptyList.propTypes = {
  handleCreateAttr: PropTypes.func.isRequired,
};

export default EmptyList;
