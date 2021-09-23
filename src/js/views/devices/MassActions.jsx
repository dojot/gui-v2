import React from 'react';

import { Grid, Box, Typography, Button, IconButton } from '@material-ui/core';
import { VerifiedUser, Close, Delete } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import useStyles from './style';

const MassActions = ({
  handleHideMassActions,
  handleDeleteAllDevices,
  handleCreateCertificates,
}) => {
  const { t } = useTranslation('devices');
  const classes = useStyles();

  return (
    <Box className={classes.massActionsContainer} paddingX={2} paddingY={1}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs='auto'>
          <Typography className={classes.massActionsLabel}>{t('massActions')}</Typography>
        </Grid>

        <Grid item xs='auto'>
          <Button
            className={classes.massActionsButton}
            onClick={handleCreateCertificates}
            startIcon={<VerifiedUser />}
            variant='contained'
          >
            {t('createCertificates')}
          </Button>
        </Grid>

        <Grid item xs='auto'>
          <Button
            className={classes.massActionsButton}
            onClick={handleDeleteAllDevices}
            startIcon={<Delete />}
            variant='contained'
          >
            {t('delete')}
          </Button>
        </Grid>

        <Grid item container xs justify='flex-end'>
          <IconButton
            className={classes.massActionsCloseButton}
            size='small'
            onClick={handleHideMassActions}
          >
            <Close />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

MassActions.propTypes = {
  handleHideMassActions: PropTypes.func,
  handleDeleteAllDevices: PropTypes.func,
  handleCreateCertificates: PropTypes.func,
};

MassActions.defaultProps = {
  handleHideMassActions: null,
  handleDeleteAllDevices: null,
  handleCreateCertificates: null,
};

export default MassActions;
