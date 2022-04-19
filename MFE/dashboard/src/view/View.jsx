import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import React, { useCallback, useEffect } from 'react';

import { Button } from '@material-ui/core';
import { Dashboard as DashboardIcon, Add, Pause, PlayArrow } from '@material-ui/icons';
import { DevelopmentContainer } from 'sharedComponents/Containers';
import { WIDGET } from 'sharedComponents/Constants';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { actions as dashboardActions } from '../redux/modules/dashboard';
import {
  dashboardConfig,
  dashboardData,
  dashboardLayout,
  dashboardSaga,
} from '../redux/selectors/dashboardSelector';
import { widgetToCSV } from 'sharedComponents/Utils';

import { EmptyPlaceholder } from 'sharedComponents/EmptyPlaceholder';
import { ViewContainer } from 'sharedComponents/Containers';
import { AreaChartWidget } from './widget/areaChart';
import { BarChartWidget } from './widget/barChart';
import { LineChartWidget } from './widget/lineChart';
import { MapWidget } from './widget/map';
import { TableWidget } from './widget/table';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const Dashboard = props => {
  const {
    cols,
    rowHeight,
    className,
    layout,
    data,
    configs,
    sagaConfig,
    stopPolling,
    startPolling,
    history,
    changeLayout,
    updateLayout,
    removeWidget,
    checkData,
  } = props;
  const { BAR, LINE, AREA, TABLE, MAP } = WIDGET;

  const handleClick = useCallback(() => {
    history.push('/dashboard/widget');
  }, [history]);

  useEffect(() => {
    if (!_.isEmpty(sagaConfig)) {
      startPolling(sagaConfig);
    }
    return () => stopPolling();
  }, [sagaConfig, startPolling, stopPolling]);

  useEffect(() => {
    if (_.isEmpty(sagaConfig)) {
      checkData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { t } = useTranslation(['dashboard', 'common']);

  const onLayoutChange = useCallback(
    newLayout => {
      changeLayout(newLayout);
    },
    [changeLayout],
  );

  const handlePin = useCallback(
    i => {
      const newArr = _.map(layout, item => {
        const { static: iStatic, ...otherProps } = item;
        return item.i === i ? { static: !iStatic, ...otherProps } : item;
      });
      updateLayout(newArr);
    },
    [layout, updateLayout],
  );

  const handleRemoveItem = useCallback(
    i => {
      removeWidget(i);
      stopPolling();
    },
    [removeWidget, stopPolling],
  );

  const handleEdit = useCallback(
    widgetId => {
      history.push(`/dashboard/widget/wizard/${widgetId}`);
    },
    [history],
  );

  const handleExport = useCallback(
    widgetID => {
      widgetToCSV(data[widgetID], configs[widgetID], widgetID);
    },
    [data, configs],
  );

  const createElement = useCallback(
    element => {
      const { i, static: isStatic } = element;
      const [type] = i.split('/');
        switch (type) {
        case LINE+'':
          return (
            <div key={i}>
              <LineChartWidget
                id={i}
                onDelete={handleRemoveItem}
                onPin={handlePin}
                onEdit={handleEdit}
                onExport={handleExport}
                data={data[i]}
                config={configs[i]}
                isStatic={isStatic}
              />
            </div>
          );
        case AREA+'':
          return (
            <div key={i}>
              <AreaChartWidget
                id={i}
                onDelete={handleRemoveItem}
                onPin={handlePin}
                onEdit={handleEdit}
                onExport={handleExport}
                data={data[i]}
                config={configs[i]}
                isStatic={isStatic}
              />
            </div>
          );
        case BAR+'':
          return (
            <div key={i}>
              <BarChartWidget
                id={i}
                onDelete={handleRemoveItem}
                onPin={handlePin}
                onEdit={handleEdit}
                onExport={handleExport}
                data={data[i]}
                config={configs[i]}
                isStatic={isStatic}
              />
            </div>
          );
        case TABLE+'':
          return (
            <div key={i}>
              <TableWidget
                id={i}
                onDelete={handleRemoveItem}
                onPin={handlePin}
                onEdit={handleEdit}
                onExport={handleExport}
                data={data[i]}
                config={configs[i]}
                isStatic={isStatic}
              />
            </div>
          );
        case MAP+'':
          return (
            <div key={i}>
              <MapWidget
                id={i}
                onDelete={handleRemoveItem}
                onPin={handlePin}
                onEdit={handleEdit}
                onExport={handleExport}
                data={data[i]}
                config={configs[i]}
                isStatic={isStatic}
              />
            </div>
          );
        default:
          return <div key={i} />;
      }
    },
    [
      AREA,
      BAR,
      configs,
      LINE,
      data,
      handlePin,
      handleRemoveItem,
      TABLE,
      MAP,
      handleEdit,
      handleExport,
    ],
  );

  const getHeaderContent = useCallback(() => {
    return (
      <>
        <DevelopmentContainer>
          <Button
            style={{ marginLeft: 10 }}
            size='small'
            variant='outlined'
            color='inherit'
            startIcon={<PlayArrow />}
            onClick={() => startPolling(sagaConfig)}
          >
            {t('common:start')}
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            size='small'
            variant='outlined'
            color='inherit'
            startIcon={<Pause />}
            onClick={() => stopPolling()}
          >
            {t('common:stop')}
          </Button>
        </DevelopmentContainer>
        <Button
          style={{ marginLeft: 10 }}
          size='small'
          variant='outlined'
          color='inherit'
          startIcon={<Add />}
          onClick={() => handleClick()}
        >
          {t('common:add')}
        </Button>
      </>
    );
  }, [t, startPolling, sagaConfig, stopPolling, handleClick]);

  return (
    <ViewContainer headerTitle={t('dashboard:dashboard')} headerContent={getHeaderContent}>
      <ResponsiveReactGridLayout
        style={{ display: layout?.length ? 'block' : 'none' }}
        cols={cols}
        rowHeight={rowHeight}
        className={className}
        layouts={{ lg: layout }}
        onLayoutChange={onLayoutChange}
        measureBeforeMount={false}
        compactType='vertical'
        verticalCompact
        preventCollision={false}
        draggableHandle='.MuiCardHeader-root'
      >
        {_.map(layout, element => createElement(element))}
      </ResponsiveReactGridLayout>

      {!layout?.length && (
        <EmptyPlaceholder
          textButton={t('addWidget')}
          emptyListMessage={t('emptyMessage')}
          icon={<DashboardIcon fontSize='large' />}
          handleButtonClick={handleClick}
        />
      )}
    </ViewContainer>
  );
};

Dashboard.defaultProps = {
  className: 'layout',
  rowHeight: 30,
  cols: {
    lg: 12,
    md: 12,
    sm: 12,
    xs: 12,
    xxs: 12,
  },
};

Dashboard.propTypes = {
  className: PropTypes.string,
  rowHeight: PropTypes.number,
  cols: PropTypes.any,
};

const mapStateToProps = state => ({
  ...dashboardLayout(state),
  ...dashboardData(state),
  ...dashboardConfig(state),
  ...dashboardSaga(state),
});

const mapDispatchToProps = {
  ...dashboardActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
