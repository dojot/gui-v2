import React from 'react';

import { Box, TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { ViewContainer } from '../stateComponents';
import useStyles from './style';

function CreateCertificationAuthority() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <ViewContainer>
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
            <Button size='large' onClick={() => history.push('/certification-authorities')}>
              Cancelar
            </Button>
            <Button size='large' color='primary' variant='contained' className={classes.saveButton}>
              Salvar
            </Button>
          </Box>
        </Box>
      </Box>
    </ViewContainer>
  );
}

export default CreateCertificationAuthority;
