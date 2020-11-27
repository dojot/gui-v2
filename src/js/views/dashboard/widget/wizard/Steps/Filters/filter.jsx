import React, { useCallback, useEffect, useState } from 'react';

import MomentUtils from '@date-io/moment';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Radio from '@material-ui/core/Radio';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { WFooter } from 'Components/Footer';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { formatToISO } from 'Utils';

import { useStyles } from './style';

const Filters = props => {
  const { handleNavigate } = props;
  const classes = useStyles();
  const defaultFixedValue = '15';

  const [data, setData] = useState({
    isFilterValid: false,
    isRealTime: false,
    filterType: '0',
    operationType: 0,
    fixedValue: defaultFixedValue,
    dynamicType: '',
    dynamicValue: '',
    dateFrom: null,
    dateTo: null,
    invalidPeriod: false,
  });

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      const {
        isRealTime,
        operationType,
        fixedValue,
        dynamicValue,
        dateFrom,
        dateTo,
      } = data;

      const tempLastN = fixedValue || dynamicValue;
      const lastN = tempLastN ? Number(tempLastN) : 0;

      const values = {
        isRealTime,
        operationType,
        lastN,
        dateFrom: dateFrom ? formatToISO(dateFrom.toDate()) : '',
        dateTo: dateTo ? formatToISO(dateTo.toDate()) : '',
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

  const handleChangeFilterType = useCallback(event => {
    const { value } = event.target;

    setData(state => ({
      ...state,
      filterType: value,
      operationType: value === '0' ? value : -1,
    }));
  }, []);

  const handleDateChange = useCallback((value, field) => {
    setData(state => ({ ...state, [field]: value }));
  }, []);

  const handleChangeDynamicOptions = useCallback(
    event => {
      const { value } = event.target;

      const dynamicValue = value === 0 ? '' : data.dynamicValue;
      const fixedValue = value === 0 ? defaultFixedValue : '';

      setData(state => ({
        ...state,
        dynamicType: value,
        operationType: value,
        dynamicValue,
        fixedValue,
      }));
    },
    [data.dynamicValue],
  );

  const checkDatePeriod = useCallback((dateFrom, dateTo) => {
    const hasPeriod = !!dateFrom && !!dateTo;
    const isValidPeriod = hasPeriod && dateTo.isAfter(dateFrom);

    setData(state => ({
      ...state,
      isFilterValid: isValidPeriod,
      invalidPeriod: hasPeriod ? !isValidPeriod : state.invalidPeriod,
    }));
  }, []);

  const handleChangeRealTime = useCallback(event => {
    const { checked } = event.target;
    setData(state => ({ ...state, isRealTime: checked }));
  }, []);

  const handleChangeFixedValue = useCallback(event => {
    const { value } = event.target;
    setData(state => ({ ...state, fixedValue: value }));
  }, []);

  const handleChangeDynamicValue = useCallback(event => {
    const { value } = event.target;
    setData(state => ({ ...state, dynamicValue: value }));
  }, []);

  useEffect(() => {
    const fixedValue = data.filterType === '0' ? defaultFixedValue : '';

    setData(state => ({
      ...state,
      fixedValue,
      dynamicType: '',
      dynamicValue: '',
      dateFrom: null,
      dateTo: null,
      invalidPeriod: false,
    }));
  }, [data.filterType]);

  useEffect(() => {
    switch (data.filterType) {
      case '0':
        setData(state => ({ ...state, isFilterValid: !!data.fixedValue }));
        break;
      case '1':
        setData(state => ({
          ...state,
          isFilterValid: data.operationType !== 0 && !!data.dynamicValue,
        }));
        break;
      default:
        checkDatePeriod(data.dateFrom, data.dateTo);
        break;
    }
  }, [
    checkDatePeriod,
    data.dynamicValue,
    data.filterType,
    data.fixedValue,
    data.operationType,
    data.dateFrom,
    data.dateTo,
  ]);

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
          <Grid item className='right'>
            <div className='container'>
              <div className='title'>
                <h2>{t('filters.historic')}</h2>
              </div>
              <div className='rows'>
                {/* Linha 01 */}
                <div className='row'>
                  <Radio
                    checked={data.filterType === '0'}
                    onChange={handleChangeFilterType}
                    value='0'
                    name='filterType'
                    inputProps={{ 'aria-label': '0' }}
                    color='primary'
                  />
                  <div className='itemLabel'>{t('filters.last')}</div>
                  <FormControl variant='outlined' className='itemInput'>
                    <InputLabel htmlFor='component-outlined'>
                      {t('filters.records')}
                    </InputLabel>
                    <OutlinedInput
                      id='lastRegs'
                      value={data.fixedValue}
                      type='number'
                      onChange={handleChangeFixedValue}
                      label='Nº Registros'
                      disabled={data.filterType !== '0'}
                    />
                  </FormControl>
                </div>

                {/* Linha 02 */}
                <div className='row'>
                  <Radio
                    checked={data.filterType === '1'}
                    onChange={handleChangeFilterType}
                    value='1'
                    name='filterType'
                    inputProps={{ 'aria-label': '1' }}
                    color='primary'
                  />
                  <FormControl variant='outlined' className='itemSelect'>
                    <InputLabel id='lastDynamicsOptionLabel'>
                      {t('filters.order')}
                    </InputLabel>
                    <Select
                      labelId='lastDynamicsOptionLabel'
                      id='lastDynamicsOption'
                      placeholder={t('filters.select an option')}
                      value={data.dynamicType}
                      onChange={handleChangeDynamicOptions}
                      label='Age'
                      disabled={data.filterType !== '1'}
                    >
                      <MenuItem value={0}>
                        <em>&nbsp;</em>
                      </MenuItem>
                      <MenuItem value={1}>{t('filters.last minutes')}</MenuItem>
                      <MenuItem value={2}>{t('filters.last hours')}</MenuItem>
                      <MenuItem value={3}>{t('filters.last days')}</MenuItem>
                      <MenuItem value={4}>{t('filters.last months')}</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl variant='outlined' className='itemInput'>
                    <InputLabel htmlFor='lastDynamicsValue'>
                      {t('filters.value')}
                    </InputLabel>
                    <OutlinedInput
                      id='lastDynamicsValue'
                      type='number'
                      value={data.dynamicValue}
                      onChange={handleChangeDynamicValue}
                      label='Nº Registros'
                      disabled={data.filterType !== '1'}
                    />
                  </FormControl>
                </div>

                {/* Linha 03 */}
                <div className='row'>
                  <Radio
                    checked={data.filterType === '2'}
                    onChange={handleChangeFilterType}
                    value='2'
                    name='filterType'
                    inputProps={{ 'aria-label': '2' }}
                    color='primary'
                  />
                  <MuiPickersUtilsProvider utils={MomentUtils} locale='pt-br'>
                    <DateTimePicker
                      id='dateFrom'
                      name='dateFrom'
                      className='itemInput'
                      label={t('filters.initial date')}
                      inputVariant='outlined'
                      value={data.dateFrom}
                      onChange={value => handleDateChange(value, 'dateFrom')}
                      format='DD/MM/YYYY HH:mm'
                      helperText={data.invalidPeriod ? ' ' : ''}
                      error={data.invalidPeriod}
                      disabled={data.filterType !== '2'}
                    />
                    <DateTimePicker
                      id='dateTo'
                      name='dateTo'
                      className='itemInput'
                      label={t('filters.final date')}
                      inputVariant='outlined'
                      value={data.dateTo}
                      onChange={value => handleDateChange(value, 'dateTo')}
                      format='DD/MM/YYYY HH:mm'
                      helperText={
                        data.invalidPeriod ? t('filters.invalid interval') : ''
                      }
                      error={data.invalidPeriod}
                      disabled={data.filterType !== '2'}
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </div>
            </div>
          </Grid>
          <WFooter {...props} isValid={data.isFilterValid} />
        </form>
      </Grid>
    </Grid>
  );
};

Filters.defaultProps = {};

Filters.propTypes = {
  handleNavigate: PropTypes.func.isRequired,
  steps: PropTypes.array.isRequired,
  activeStep: PropTypes.number.isRequired,
};

export default Filters;
