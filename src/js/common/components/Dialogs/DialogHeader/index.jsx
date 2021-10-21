import React from 'react';

import { Box, IconButton, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';

import useStyles from './style';

const DialogHeader = ({ title, handleHideDialog }) => {
  const classes = useStyles();

  return (
    <Box className={classes.header} padding={2}>
      <Typography variant='h6'>{title}</Typography>

      <IconButton onClick={handleHideDialog} size='small'>
        <Close />
      </IconButton>
    </Box>
  );
};

DialogHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleHideDialog: PropTypes.func.isRequired,
};

export default DialogHeader;
