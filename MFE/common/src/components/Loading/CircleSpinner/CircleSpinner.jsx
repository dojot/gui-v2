import React from 'react';

import { CircularProgress } from '@material-ui/core';

import { useStyles } from './style';

const CircularIndeterminate = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

export default CircularIndeterminate;
