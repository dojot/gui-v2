import React, { useEffect, useState } from 'react';

import { Grid, Box, Typography, Button, TextField } from '@material-ui/core';
import { Description } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import GenerateReportPopover from './GenerateReportPopover';
import { useMassActionsStyles } from './style';

const MassActions = ({ numberOfSelectedDevices, selectedDevices }) => {
  const { t } = useTranslation(['createReport', 'common']);
  const classes = useMassActionsStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [reportPeriod, setReportPeriod] = useState({
    initialPeriod: '',
    finalPeriod: '',
  });

  useEffect(() => {
    const finalPeriod = new Date();
    finalPeriod.setMinutes(finalPeriod.getMinutes() - finalPeriod.getTimezoneOffset());

    const initialPeriod = new Date();
    initialPeriod.setMinutes(initialPeriod.getMinutes() - initialPeriod.getTimezoneOffset());
    initialPeriod.setDate(initialPeriod.getDate() - 30);

    setReportPeriod({
      initialPeriod: initialPeriod.toISOString().slice(0, 16),
      finalPeriod: finalPeriod.toISOString().slice(0, 16),
    });
  }, []);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePeriod = e => {
    setReportPeriod(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  return (
    <Box className={classes.massActionsContainer} paddingX={2} paddingY={1}>
      <Grid container spacing={2} alignItems='center' justifyContent='space-between'>
        <Grid item xs='auto'>
          {!!numberOfSelectedDevices && (
            <Typography className={classes.massActionsLabel}>
              {t('massActions.numberOfSelectedDevices', { count: numberOfSelectedDevices })}
            </Typography>
          )}
        </Grid>

        <Grid item xs='auto' className={classes.periodWrapper}>
          <Typography className={classes.massActionsLabel}>{t('massActions.setPeriod')}</Typography>

          <TextField
            size='small'
            label={t('massActions.initialPeriod')}
            name='initialPeriod'
            className={classes.periodInput}
            variant='filled'
            type='datetime-local'
            defaultValue={reportPeriod.initialPeriod}
            value={reportPeriod.initialPeriod}
            onChange={handleChangePeriod}
            color='secondary'
          />

          <TextField
            size='small'
            label={t('massActions.finalPeriod')}
            name='finalPeriod'
            className={classes.periodInput}
            onChange={handleChangePeriod}
            color='secondary'
            variant='filled'
            type='datetime-local'
            defaultValue={reportPeriod.finalPeriod}
            inputProps={{
              min: reportPeriod.initialPeriod,
            }}
            value={reportPeriod.finalPeriod}
          />
        </Grid>

        <Grid item xs='auto'>
          <Button
            className={classes.massActionsButton}
            startIcon={<Description />}
            variant='contained'
            onClick={handleClick}
          >
            {t('massActions.generateReport')}
          </Button>

          <GenerateReportPopover
            anchorEl={anchorEl}
            handleClose={handleClose}
            numberOfSelectedDevices={numberOfSelectedDevices}
            reportPeriod={reportPeriod}
            selectedDevices={selectedDevices}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

MassActions.propTypes = {
  numberOfSelectedDevices: PropTypes.number,
  selectedDevices: PropTypes.object.isRequired,
};

MassActions.defaultProps = {
  numberOfSelectedDevices: 0,
  selectedDevices: {},
};

export default MassActions;
