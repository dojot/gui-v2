import React from 'react';

import { Box, Grid, Typography, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import PropTypes from 'prop-types';

const EmptyPlaceholder = ({ icon, emptyListMessage, handleButtonClick, textButton }) => {
  return (
    <Box style={{ height: '100%' }} padding={2}>
      <Grid
        style={{ height: '100%' }}
        direction='column'
        alignItems='center'
        justifyContent='center'
        container
      >
        {icon && icon}

        <Box paddingY={1}>
          <Typography variant='h6'>{emptyListMessage}</Typography>
        </Box>

        <Button color='primary' variant='contained' endIcon={<Add />} onClick={handleButtonClick}>
          {textButton}
        </Button>
      </Grid>
    </Box>
  );
};

EmptyPlaceholder.defaultProps = {
  icon: null,
  emptyListMessage: null,
  handleButtonClick: null,
  textButton: null,
};

EmptyPlaceholder.propTypes = {
  icon: PropTypes.node,
  emptyListMessage: PropTypes.string,
  handleButtonClick: PropTypes.func,
  textButton: PropTypes.string,
};

export default EmptyPlaceholder;
