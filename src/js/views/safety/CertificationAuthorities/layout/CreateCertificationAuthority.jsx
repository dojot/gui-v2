import React from 'react';

import { Box, TextField, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

import { useCreateCAStyles } from './style';

function CreateCertificationAuthority({ toggleShowRegistration }) {
  const classes = useCreateCAStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        <TextField
          label='Nome da CA'
          variant='outlined'
          fullWidth
          className={classes.inputNameCA}
        />
        <TextField
          placeholder='Insira o texto aqui'
          multiline
          rows={20}
          variant='outlined'
          fullWidth
        />
        <Box className={classes.bottomButtonsWrapper}>
          <Button size='large' onClick={toggleShowRegistration}>
            Cancelar
          </Button>
          <Button size='large' color='primary' variant='contained' className={classes.saveButton}>
            Salvar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

CreateCertificationAuthority.propTypes = {
  toggleShowRegistration: PropTypes.func,
};

CreateCertificationAuthority.defaultProps = {
  toggleShowRegistration: null,
};

export default CreateCertificationAuthority;
