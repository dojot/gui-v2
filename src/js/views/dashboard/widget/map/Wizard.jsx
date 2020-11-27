import React, { useCallback, useEffect, useReducer, useState } from 'react';

import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { usePaginator } from 'Components/Paginator';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { actions as dashboardActions } from 'Redux/dashboard';
import { menuSelector } from 'Selectors/baseSelector';
import { Device as DeviceService } from 'Services';

import { ViewContainer } from '../../../stateComponents';
import { useMap } from '../wizard/hooks';
import {
  Attributes,
  Devices,
  MapFilter,
  General,
  InitialStateGeneral as general,
  Summary,
} from '../wizard/Steps';
import useStyles from '../wizard/style';

const acceptedTypes = ['GEO'];

const Wizard = ({
  title,
  toDashboard,
  addWidget,
  addWidgetConfig,
  addWidgetSaga,
  isMenuOpen,
}) => {
  const classes = useStyles();
  const steps = [
    'steps.general',
    'steps.devices',
    'steps.attributes',
    'steps.filters',
    'steps.overview',
  ];

  const initialState = {
    general,
    devices: [],
    attributes: [],
    filter: {},
    activeStep: 0,
  };

  const [searchDeviceTerm, setSearchDeviceTerm] = useState('');
  const {
    paginatorData,
    setPaginatorData,
    setCurrentPage,
    setPageSize,
    setDisablePaginator,
  } = usePaginator();

  useEffect(() => {
    setDisablePaginator(true);
    DeviceService.getDevicesList(
      { number: paginatorData.currentPage, size: paginatorData.pageSize },
      { label: searchDeviceTerm },
    )
      .then(response => {
        const { devices, currentPage, totalPages } = response.getDevices;
        setPaginatorData({ data: devices, currentPage, totalPages });
      })
      .catch(error => {
        console.error(error); // TODO tratamento de erro da api
        setDisablePaginator(false);
      });
  }, [
    setDisablePaginator,
    setPaginatorData,
    paginatorData.currentPage,
    paginatorData.pageSize,
    searchDeviceTerm,
  ]);

  const handleSearchChange = useCallback(
    searchTerm => {
      setSearchDeviceTerm(searchTerm);
      setCurrentPage(1);
    },
    [setCurrentPage],
  );

  const parseGeo = value => {
    const [lat, long] = value.split(',');
    return [parseFloat(lat), parseFloat(long)];
  };

  const generateScheme = useCallback(state => {
    const { isRealTime } = state.filter;
    const staticAttributes = {};
    state.attributes.staticValues.forEach(item => {
      staticAttributes[item.attributeID] = {
        value: item.staticValue ? parseGeo(item.staticValue) : [0, 0],
        timestamp: 0,
      };
    });
    return DeviceService.parseHistoryQuery({
      devices: _.values(
        _.mapValues(
          _.groupBy(state.attributes.dynamicValues, 'deviceID'),
          (value, key) => {
            return {
              deviceID: key,
              attrs: value.map(val => val.label),
            };
          },
        ),
      ),
      staticAttributes,
      dateFrom: '',
      dateTo: '',
      operationType: 5,
      lastN: 1,
      isRealTime,
    });
  }, []);

  const { createMapWidget } = useMap(
    addWidget,
    addWidgetConfig,
    addWidgetSaga,
    generateScheme,
  );

  const createNewWidget = useCallback(
    data => {
      createMapWidget(data);
    },
    [createMapWidget],
  );

  const memoizedReducer = useCallback(
    (state, { type, payload = {} }) => {
      switch (type) {
        case 'next':
          return {
            ...state,
            [payload.key]: payload.values,
            activeStep: state.activeStep + 1,
          };
        case 'back':
          return {
            ...state,
            activeStep: state.activeStep - 1,
          };
        case 'finish':
          createNewWidget(state);
          toDashboard();
          return {};
        default:
          return {};
      }
    },
    [createNewWidget, toDashboard],
  );

  const [state, dispatch] = useReducer(memoizedReducer, initialState);
  const { activeStep } = state;

  const getStepContent = useCallback(
    stepIndex => {
      switch (stepIndex) {
        case 0:
          return (
            <General
              initialState={state.general}
              handleClick={dispatch}
              steps={steps}
              activeStep={stepIndex}
              isOpen={isMenuOpen}
            />
          );
        case 1:
          return (
            <Devices
              initialState={paginatorData.pageData}
              selectedValues={state.devices}
              handleClick={dispatch}
              steps={steps}
              activeStep={stepIndex}
              isOpen={isMenuOpen}
              onFilter={handleSearchChange}
              usePagination
              currentPage={paginatorData.currentPage}
              pageSize={paginatorData.pageSize}
              totalPages={paginatorData.totalPages}
              onPageSizeChange={pageSize => setPageSize(pageSize)}
              onPageChange={(event, page) => setCurrentPage(page)}
              isLoading={paginatorData.disabled}
            />
          );
        case 2:
          return (
            <Attributes
              initialState={state.devices}
              selectedValues={state.attributes}
              handleClick={dispatch}
              steps={steps}
              activeStep={stepIndex}
              isOpen={isMenuOpen}
              acceptedTypes={acceptedTypes}
            />
          );
        case 3:
          return (
            <MapFilter
              handleNavigate={dispatch}
              steps={steps}
              activeStep={stepIndex}
            />
          );
        case 4:
          return (
            <Summary
              initialState={{
                general: state.general,
                values: state.attributes,
              }}
              handleClick={dispatch}
              steps={steps}
              activeStep={stepIndex}
              isOpen={isMenuOpen}
            />
          );
        default:
          return 'Unknown stepIndex';
      }
    },
    [
      handleSearchChange,
      isMenuOpen,
      paginatorData.currentPage,
      paginatorData.disabled,
      paginatorData.pageData,
      paginatorData.pageSize,
      paginatorData.totalPages,
      setCurrentPage,
      setPageSize,
      state.attributes,
      state.devices,
      state.general,
      steps,
    ],
  );

  const { t } = useTranslation(['dashboard']);

  return (
    <ViewContainer headerTitle={title}>
      <div className={classes.root}>
        <Stepper
          classes={{ root: classes.paper }}
          alternativeLabel
          activeStep={activeStep}
        >
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{t([label, 'undefined'])}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {getStepContent(activeStep)}
      </div>
    </ViewContainer>
  );
};

Wizard.propTypes = {
  title: PropTypes.string.isRequired,
  toDashboard: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...menuSelector(state),
});

const mapDispatchToProps = {
  ...dashboardActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wizard);
