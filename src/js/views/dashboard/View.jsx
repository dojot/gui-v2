import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import React, { useCallback, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import PauseIcon from '@material-ui/icons/Pause';
import PlayIcon from '@material-ui/icons/PlayArrow';
import { DevelopmentContainer } from 'Components/Containers';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { actions as dashboardActions } from 'Redux/dashboard';
import {
  dashboardConfig,
  dashboardData,
  dashboardLayout,
  dashboardSaga,
} from 'Selectors/dashboardSelector';

import { ViewContainer } from '../stateComponents';
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
  const { bar, line, area, table, map } = __CONFIG__;

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

  const onPin = useCallback(
    i => {
      const newArr = _.map(layout, item => {
        const { static: iStatic, ...otherProps } = item;
        return item.i === i ? { static: !iStatic, ...otherProps } : item;
      });
      updateLayout(newArr);
    },
    [layout, updateLayout],
  );

  const onRemoveItem = useCallback(
    i => {
      removeWidget(i);
      stopPolling();
    },
    [removeWidget, stopPolling],
  );

  const onEdit = useCallback(widgetId => {
    history.push(`/dashboard/widget/wizard/${widgetId}`);
  }, []);

  const createElement = useCallback(
    element => {
      const { i } = element;
      const [type] = i.split('/');
      switch (type) {
        case line:
          return (
            <div key={i}>
              <LineChartWidget
                id={i}
                onDelete={onRemoveItem}
                onPin={onPin}
                onEdit={onEdit}
                data={data[i]}
                config={configs[i]}
              />
            </div>
          );
        case area:
          return (
            <div key={i}>
              <AreaChartWidget
                id={i}
                onDelete={onRemoveItem}
                onPin={onPin}
                onEdit={onEdit}
                data={data[i]}
                config={configs[i]}
              />
            </div>
          );
        case bar:
          return (
            <div key={i}>
              <BarChartWidget
                id={i}
                onDelete={onRemoveItem}
                onPin={onPin}
                onEdit={onEdit}
                data={data[i]}
                config={configs[i]}
              />
            </div>
          );
        case table:
          return (
            <div key={i}>
              <TableWidget
                id={i}
                onDelete={onRemoveItem}
                onPin={onPin}
                onEdit={onEdit}
                data={data[i]}
                config={configs[i]}
              />
            </div>
          );
        case map:
          return (
            <div key={i}>
              <MapWidget
                id={i}
                onDelete={onRemoveItem}
                onPin={onPin}
                onEdit={onEdit}
                data={data[i]}
                config={configs[i]}
              />
            </div>
          );
        default:
          return <div key={i} />;
      }
    },
    [area, bar, configs, line, data, onPin, onRemoveItem, table, map],
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
            startIcon={<PlayIcon />}
            onClick={() => startPolling(sagaConfig)}
          >
            {t('common:start')}
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            size='small'
            variant='outlined'
            color='inherit'
            startIcon={<PauseIcon />}
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
          startIcon={<AddIcon />}
          onClick={() => handleClick()}
        >
          {t('common:add')}
        </Button>
      </>
    );
  }, [handleClick, startPolling, stopPolling, sagaConfig]);

  return (
    <ViewContainer headerTitle={t('dashboard:dashboard')} headerContent={getHeaderContent}>
      <ResponsiveReactGridLayout
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
    </ViewContainer>
  );
};

Dashboard.defaultProps = {
  className: 'layout',
  rowHeight: 30,
  cols: {
    lg: 12,
    md: 10,
    sm: 6,
    xs: 4,
    xxs: 2,
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
