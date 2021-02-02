import React, { useCallback, useEffect, useState } from 'react';

import MomentUtils from '@date-io/moment';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField, Switches, Radios, Select, DateTimePicker } from 'mui-rff';
import { useTranslation } from 'react-i18next';

import Wizard from '../../wizard';
import { useStyles } from './style';

const preventNegativeNumber = event => {
  if (event.key === '-') {
    event.preventDefault();
  }
};

const Filters = ({ validate, name, ...otherProps }) => {
  const { dateTo, dateFrom } = otherProps.values[name];
  const classes = useStyles();
  const { t } = useTranslation(['dashboard']);

  const [data, setData] = useState({
    isFilterValid: false,
    invalidPeriod: false,
  });

  const checkDatePeriod = useCallback((from, to) => {
    const hasPeriod = !!from && !!to;
    const isValidPeriod = hasPeriod && to.isAfter(from);

    setData(state => ({
      isFilterValid: isValidPeriod,
      invalidPeriod: hasPeriod ? !isValidPeriod : state.invalidPeriod,
    }));
  }, []);

  useEffect(() => {
    checkDatePeriod(dateFrom, dateTo);
  }, [dateTo, dateFrom, checkDatePeriod]);

  return (
    <Wizard.Page validate={validate}>
      <Grid container direction='column' className={classes.root}>
        <Grid item>
          <h2>{t('filters.recover')}</h2>
          <Divider />
        </Grid>

        <Grid item className='items'>
          <Grid item className='left'>
            <div className='realTimeSwitch'>
              <h2>{t('filters.real time')}</h2>
              <Switches
                name={`${name}.isRealTime`}
                color='primary'
                data={{ value: false }}
              />
            </div>
          </Grid>
          <Grid item className='right'>
            <div className='container'>
              <div className='title'>
                <h2>{t('filters.historic')}</h2>
              </div>
              <div className='rows'>
                {/* Linha 01 */}
                <div className='row'>
                  <Radios
                    name={`${name}.filterType`}
                    required
                    color='primary'
                    data={[{ value: '0' }]}
                  />
                  <div className='itemLabel'>{t('filters.last')}</div>
                  <div className='itemInput'>
                    <TextField
                      label={t('filters.records')}
                      name={`${name}.lastRegs`}
                      variant='outlined'
                      margin='none'
                      type='number'
                      onKeyPress={preventNegativeNumber}
                      disabled={otherProps.values[name].filterType !== '0'}
                      inputProps={{ min: 1, max: 9999, step: 1 }}
                    />
                  </div>
                </div>

                {/* Linha 02 */}
                <div className='row'>
                  <Radios
                    name={`${name}.filterType`}
                    required
                    color='primary'
                    data={[{ value: '1' }]}
                  />
                  <div className='itemInput'>
                    <Select
                      name={`${name}.lastDynamicsOption`}
                      label={t('filters.order')}
                      variant='outlined'
                      disabled={otherProps.values[name].filterType !== '1'}
                    >
                      <MenuItem value={0}>
                        <em>&nbsp;</em>
                      </MenuItem>
                      <MenuItem value={1}>{t('filters.last minutes')}</MenuItem>
                      <MenuItem value={2}>{t('filters.last hours')}</MenuItem>
                      <MenuItem value={3}>{t('filters.last days')}</MenuItem>
                      <MenuItem value={4}>{t('filters.last months')}</MenuItem>
                    </Select>
                  </div>
                  <div className='itemInput'>
                    <TextField
                      label='Nº Registros'
                      name={`${name}.lastDynamicsValue`}
                      variant='outlined'
                      margin='none'
                      type='number'
                      disabled={otherProps.values[name].filterType !== '1'}
                      inputProps={{ min: 1, max: 9999, step: 1 }}
                      onKeyPress={preventNegativeNumber}
                    />
                  </div>
                </div>

                {/* /!* Linha 03 *!/ */}
                <div className='row'>
                  <Radios
                    name={`${name}.filterType`}
                    required
                    color='primary'
                    data={[{ value: '2' }]}
                  />
                  <div className='itemInput'>
                    <DateTimePicker
                      label={t('filters.initial date')}
                      name={`${name}.dateFrom`}
                      inputVariant='outlined'
                      format='DD/MM/YYYY HH:mm'
                      helperText={data.invalidPeriod ? ' ' : ''}
                      error={data.invalidPeriod}
                      dateFunsUtils={MomentUtils}
                      disabled={otherProps.values[name].filterType !== '2'}
                    />
                  </div>
                  <div className='itemInput'>
                    <DateTimePicker
                      label={t('filters.final date')}
                      name={`${name}.dateTo`}
                      inputVariant='outlined'
                      format='DD/MM/YYYY HH:mm'
                      minDate={otherProps.values[name].dateFrom}
                      minDateMessage='teste, 123, testando'
                      helperText={
                        data.invalidPeriod ? t('filters.invalid interval') : ''
                      }
                      error={data.invalidPeriod}
                      dateFunsUtils={MomentUtils}
                      disabled={otherProps.values[name].filterType !== '2'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Wizard.Page>
  );
};

export default Filters;
