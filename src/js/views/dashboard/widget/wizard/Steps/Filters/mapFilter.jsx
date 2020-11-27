import React, { useCallback, useState } from 'react';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { WFooter } from 'Components/Footer';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useStyles } from './style';

const MapFilters = props => {
  const { handleNavigate } = props;
  const classes = useStyles();

  const [data, setData] = useState({
    isRealTime: false,
  });

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      const { isRealTime } = data;

      const values = {
        isRealTime,
        operationType: 5,
        lastN: 1,
      };

      handleNavigate({
        type: 'next',
        payload: {
          values,
          key: 'filter',
        },
      });
    },
    [handleNavigate, data],
  );

  const handleChangeRealTime = useCallback(event => {
    const { checked } = event.target;
    setData(state => ({ ...state, isRealTime: checked }));
  }, []);

  const { t } = useTranslation(['dashboard']);

  return (
    <Grid container direction='column' className={classes.root}>
      <Grid item>
        <h2>{t('filters.recover')}</h2>
        <Divider />
      </Grid>

      <Grid item>
        <form onSubmit={e => handleSubmit(e)}>
          <Grid item className='left'>
            <div className='realTimeSwitch'>
              <h2>{t('filters.real time')}</h2>
              <Switch
                checked={data.isRealTime}
                onChange={handleChangeRealTime}
                color='primary'
              />
            </div>
          </Grid>
          <WFooter {...props} isValid={data.isFilterValid} />
        </form>
      </Grid>
    </Grid>
  );
};

MapFilters.defaultProps = {};

MapFilters.propTypes = {
  handleNavigate: PropTypes.func.isRequired,
  steps: PropTypes.array.isRequired,
  activeStep: PropTypes.number.isRequired,
};

export default MapFilters;
