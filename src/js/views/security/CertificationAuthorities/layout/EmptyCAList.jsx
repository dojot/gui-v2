import React from 'react';

import { Box, Button, Grid, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

const EmptyCAList = ({ toggleShowRegistration }) => {
  const { t } = useTranslation('devices');
  const history = useHistory();

  const handleCreateCertificationAuthority = () => {
    history.push('/create-ca');
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
        {/* <DevicesOther fontSize='large' /> */}

        <Box paddingY={1}>
          <Typography variant='h6'>Nenhuma CA encontrada</Typography>
        </Box>

        <Button
          color='primary'
          variant='contained'
          endIcon={<Add />}
          onClick={toggleShowRegistration}
        >
          Criar CA
        </Button>
      </Grid>
    </Box>
  );
};

EmptyCAList.propTypes = {
  toggleShowRegistration: PropTypes.func,
};

EmptyCAList.defaultProps = {
  toggleShowRegistration: null,
};

export default EmptyCAList;
