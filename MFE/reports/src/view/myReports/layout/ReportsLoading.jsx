import React from 'react';

import { Grid, CircularProgress } from '@material-ui/core';

const ReportsLoading = () => {
  return (
    <Grid style={{ height: '100%' }} container alignItems='center' justifyContent='center'>
      <CircularProgress />
    </Grid>
  );
};

export default ReportsLoading;
