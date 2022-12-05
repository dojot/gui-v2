import React from 'react';

import { Grid, Box, Typography, Button, IconButton } from '@material-ui/core';
import { Close, Delete } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useMassActionsStyles } from './style';

const MassActions = ({
  handleHideMassActions,
  // handleAssociateCertificatesInBatch,
  handleDeleteMultipleDevices,
}) => {
  const { t } = useTranslation(['devices', 'common']);
  const classes = useMassActionsStyles();

  return (
    <Box className={classes.massActionsContainer} paddingX={2} paddingY={1}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs='auto'>
          <Typography className={classes.massActionsLabel}>{t('massActions')}</Typography>
        </Grid>

        {/* <Grid item xs='auto'>
          <Button
            className={classes.massActionsButton}
            onClick={handleAssociateCertificatesInBatch}
            startIcon={<VerifiedUser />}
            variant='contained'
          >
            {t('associateCertificatesInBatch')}
          </Button>
        </Grid> */}

        <Grid item xs='auto'>
          <Button
            className={classes.massActionsButton}
            onClick={handleDeleteMultipleDevices}
            startIcon={<Delete />}
            variant='contained'
          >
            {t('common:exclude')}
          </Button>
        </Grid>

        <Grid item container xs justifyContent='flex-end'>
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
  // handleAssociateCertificatesInBatch: PropTypes.func,
  handleDeleteMultipleDevices: PropTypes.func,
};

MassActions.defaultProps = {
  handleHideMassActions: null,
  // handleAssociateCertificatesInBatch: null,
  handleDeleteMultipleDevices: null,
};

export default MassActions;
