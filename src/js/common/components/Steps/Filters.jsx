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
import { formatToISO } from 'Utils';

import { useStyles } from './Filters';

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

      const values = {
        isRealTime,
        operationType,
        lastN: fixedValue || dynamicValue,
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

  const handleFilterType = useCallback(event => {
    const { value } = event.target;

    setData(state => ({
      ...state,
      filterType: value,
      operationType: value === '0' ? value : '',
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

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item className="top">
        <h2>Recuperar registros por:</h2>
        <Divider />
      </Grid>

      <Grid item className="bottom">
        <form onSubmit={e => handleSubmit(e)}>
          <Grid container direction="row">
            <Grid item className="left">
              <div className="realTimeSwitch">
                <h2>Tempo Real</h2>
                <Switch
                  checked={data.isRealTime}
                  onChange={handleChangeRealTime}
                  color="primary"
                />
              </div>
            </Grid>
            <Grid item className="right">
              <div className="container">
                <div className="title">
                  <h2>Histórico</h2>
                </div>
                <div className="rows">
                  {/* Linha 01 */}
                  <div className="row">
                    <Radio
                      checked={data.filterType === '0'}
                      onChange={handleFilterType}
                      value="0"
                      name="filterType"
                      inputProps={{ 'aria-label': '0' }}
                      color="primary"
                    />
                    <div className="itemLabel">Últimos</div>
                    <FormControl variant="outlined" className="itemInput">
                      <InputLabel htmlFor="component-outlined">
                        Nº Registros
                      </InputLabel>
                      <OutlinedInput
                        id="lastRegs"
                        value={data.fixedValue}
                        onChange={handleChangeFixedValue}
                        label="Nº Registros"
                        disabled={data.filterType !== '0'}
                      />
                    </FormControl>
                  </div>

                  {/* Linha 02 */}
                  <div className="row">
                    <Radio
                      checked={data.filterType === '1'}
                      onChange={handleFilterType}
                      value="1"
                      name="filterType"
                      inputProps={{ 'aria-label': '1' }}
                      color="primary"
                    />
                    <FormControl variant="outlined" className="itemSelect">
                      <InputLabel id="lastDynamicsOptionLabel">
                        Ordem
                      </InputLabel>
                      <Select
                        labelId="lastDynamicsOptionLabel"
                        id="lastDynamicsOption"
                        placeholder="Selecione uma opção"
                        value={data.dynamicType}
                        onChange={handleChangeDynamicOptions}
                        label="Age"
                        disabled={data.filterType !== '1'}
                      >
                        <MenuItem value={0}>
                          <em>&nbsp;</em>
                        </MenuItem>
                        <MenuItem value={1}>Últimos minutos</MenuItem>
                        <MenuItem value={2}>Últimos horas</MenuItem>
                        <MenuItem value={3}>Últimos dias</MenuItem>
                        <MenuItem value={4}>Últimos meses</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl variant="outlined" className="itemInput">
                      <InputLabel htmlFor="lastDynamicsValue">Valor</InputLabel>
                      <OutlinedInput
                        id="lastDynamicsValue"
                        value={data.dynamicValue}
                        onChange={handleChangeDynamicValue}
                        label="Nº Registros"
                        disabled={data.filterType !== '1'}
                      />
                    </FormControl>
                  </div>

                  {/* Linha 03 */}
                  <div className="row">
                    <Radio
                      checked={data.filterType === '2'}
                      onChange={handleFilterType}
                      value="2"
                      name="filterType"
                      inputProps={{ 'aria-label': '2' }}
                      color="primary"
                    />
                    <MuiPickersUtilsProvider utils={MomentUtils} locale="pt-br">
                      <DateTimePicker
                        id="dateFrom"
                        name="dateFrom"
                        className="itemInput"
                        label="Data Inicial"
                        inputVariant="outlined"
                        value={data.dateFrom}
                        onChange={value => handleDateChange(value, 'dateFrom')}
                        format="DD/MM/YYYY HH:mm"
                        helperText={data.invalidPeriod ? ' ' : ''}
                        error={data.invalidPeriod}
                        disabled={data.filterType !== '2'}
                      />
                      <DateTimePicker
                        id="dateTo"
                        name="dateTo"
                        className="itemInput"
                        label="Data Final"
                        inputVariant="outlined"
                        value={data.dateTo}
                        onChange={value => handleDateChange(value, 'dateTo')}
                        format="DD/MM/YYYY HH:mm"
                        helperText={
                          data.invalidPeriod ? 'Período inválido' : ''
                        }
                        error={data.invalidPeriod}
                        disabled={data.filterType !== '2'}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                </div>
              </div>
            </Grid>
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
