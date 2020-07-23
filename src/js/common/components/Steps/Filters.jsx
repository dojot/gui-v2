import React, { useEffect, useCallback, useState } from 'react';

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
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import { WFooter } from 'Components/Footer';
import PropTypes from 'prop-types';
import { formatToISO } from 'Utils';

import { useStyles } from './Filters';

const Filters = props => {
  const { handleNavigate } = props;
  const classes = useStyles();
  const defaultFixedValue = '15';

  const [isFilterValid, setIsFilterValid] = useState(false);
  const [isRealTime, setIsRealTime] = useState(false);
  const [filterType, setFilterType] = useState('0');
  const [operationType, setOperationType] = useState(0);

  const [fixedValue, setFixedValue] = useState(defaultFixedValue);
  const [dynamicType, setDynamicType] = useState('');
  const [dynamicValue, setDynamicValue] = useState('');
  const [dateFilter, setDateFilter] = useState({
    dateFrom: null,
    dateTo: null,
    invalidPeriod: false,
  });

  // TODO alterar os valores passados
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      const values = {
        isRealTime,
        operationType,
        lastN: fixedValue || dynamicValue,
        dateFrom: dateFilter.dateFrom
          ? formatToISO(dateFilter.dateFrom.toDate())
          : '',
        dateTo: dateFilter.dateTo
          ? formatToISO(dateFilter.dateTo.toDate())
          : '',
      };

      handleNavigate({
        type: 'next',
        payload: {
          values,
          key: 'filter',
        },
      });
    },
    [
      handleNavigate,
      dynamicValue,
      fixedValue,
      operationType,
      isRealTime,
      dateFilter.dateFrom,
      dateFilter.dateTo,
    ],
  );

  const handleFilterType = useCallback(event => {
    const { value } = event.target;
    setFilterType(value);
    if (value === '0') {
      setOperationType(value);
    }
    if (value === '2') {
      setOperationType('');
    }
  }, []);

  const handleDateChange = useCallback((value, field) => {
    setDateFilter(state => ({
      ...state,
      [field]: value,
    }));
  }, []);

  const handleChangeDynamicOptions = useCallback(event => {
    const { value } = event.target;
    setDynamicType(value);
    setOperationType(value);
    if (value === 0) {
      setDynamicValue('');
      setFixedValue(defaultFixedValue);
    }
  }, []);

  const checkDatePeriod = useCallback(() => {
    const hasPeriod = !!dateFilter.dateFrom && !!dateFilter.dateTo;
    const isValidPeriod =
      hasPeriod && dateFilter.dateTo.isAfter(dateFilter.dateFrom);
    setIsFilterValid(isValidPeriod);
    if (hasPeriod) {
      setDateFilter(state => ({ ...state, invalidPeriod: !isValidPeriod }));
    }
  }, [dateFilter.dateFrom, dateFilter.dateTo]);

  useEffect(() => {
    setFixedValue(filterType === '0' ? defaultFixedValue : '');
    setDynamicType('');
    setDynamicValue('');
    setDateFilter({ dateFrom: null, dateTo: null });
  }, [filterType]);

  useEffect(() => {
    switch (filterType) {
      case '0':
        setIsFilterValid(!!fixedValue);
        break;
      case '1':
        setIsFilterValid(operationType !== 0 && !!dynamicValue);
        break;
      default:
        checkDatePeriod();
        break;
    }
  }, [filterType, dynamicValue, fixedValue, operationType, checkDatePeriod]);

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
                  checked={isRealTime}
                  onChange={event => setIsRealTime(event.target.checked)}
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
                      checked={filterType === '0'}
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
                        value={fixedValue}
                        onChange={event => setFixedValue(event.target.value)}
                        label="Nº Registros"
                        disabled={filterType !== '0'}
                      />
                    </FormControl>
                  </div>

                  {/* Linha 02 */}
                  <div className="row">
                    <Radio
                      checked={filterType === '1'}
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
                        value={dynamicType}
                        onChange={handleChangeDynamicOptions}
                        label="Age"
                        disabled={filterType !== '1'}
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
                        value={dynamicValue}
                        onChange={event => setDynamicValue(event.target.value)}
                        label="Nº Registros"
                        disabled={filterType !== '1'}
                      />
                    </FormControl>
                  </div>

                  {/* Linha 03 */}
                  <div className="row">
                    <Radio
                      checked={filterType === '2'}
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
                        value={dateFilter.dateFrom}
                        onChange={value => handleDateChange(value, 'dateFrom')}
                        format="DD/MM/YYYY HH:mm"
                        helperText={dateFilter.invalidPeriod ? ' ' : ''}
                        error={dateFilter.invalidPeriod}
                        disabled={filterType !== '2'}
                      />
                      <DateTimePicker
                        id="dateTo"
                        name="dateTo"
                        className="itemInput"
                        label="Data Final"
                        inputVariant="outlined"
                        value={dateFilter.dateTo}
                        onChange={value => handleDateChange(value, 'dateTo')}
                        format="DD/MM/YYYY HH:mm"
                        helperText={
                          dateFilter.invalidPeriod ? 'Período inválido' : ''
                        }
                        error={dateFilter.invalidPeriod}
                        disabled={filterType !== '2'}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          <WFooter {...props} isValid={isFilterValid} />
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
