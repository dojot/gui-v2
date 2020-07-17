import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { DevelopmentContainer } from 'Components/Containers';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { connect } from 'react-redux';
import { actions as dashboardActions } from 'Redux/dashboard';
import {
  dashboardConfig,
  dashboardData,
  dashboardLayout,
  dashboardSaga,
} from 'Selectors/dashboardSelector';

import ViewContainer from '../ViewContainer';
import { AreaChartWidget } from './widget/areaChart';
import { BarChartWidget } from './widget/barChart';
import { LineChartWidget } from './widget/lineChart';

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
    removeWidget,
    removeWidgetConfig,
    removeWidgetSaga,
    removeWidgetData,
    checkData,
  } = props;

  const { bar, line, area } = __CONFIG__;

  const handleClick = useCallback(() => {
    history.push('/dashboard/widget');
  }, [history]);

  useEffect(() => {
    if (!_.isEmpty(sagaConfig)) {
      startPolling(sagaConfig);
    } else {
      checkData();
    }
    return () => stopPolling();
  }, [sagaConfig, startPolling, stopPolling, checkData]);

  const onLayoutChange = useCallback(
    newLayout => {
      changeLayout(newLayout, configs, sagaConfig);
    },
    [changeLayout, configs, sagaConfig],
  );

  const onRemoveItem = useCallback(
    i => {
      removeWidget(i);
      removeWidgetConfig(i);
      removeWidgetSaga(i);
      removeWidgetData(i);
      stopPolling();
    },
    [
      removeWidget,
      removeWidgetConfig,
      removeWidgetSaga,
      removeWidgetData,
      stopPolling,
    ],
  );

  const onPin = useCallback(
    i => {
      const newArr = _.map(layout, item => {
        const { static: iStatic, ...otherProps } = item;
        return item.i === i ? { static: !iStatic, ...otherProps } : item;
      });
      changeLayout(newArr, configs, sagaConfig);
    },
    [layout, changeLayout],
  );

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
                data={data}
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
                data={data}
                config={configs[i]}
              />
            </div>
          );
        default:
          return (
            <div key={i}>
              <AreaChartWidget id={i} onDelete={onRemoveItem} onPin={onPin} />
            </div>
          );
      }
    },
    [area, bar, configs, line, data, onPin, onRemoveItem],
  );

  const getHeaderContent = useCallback(() => {
    return (
      <DevelopmentContainer>
        <Button
          style={{ marginLeft: 10 }}
          size="small"
          variant="outlined"
          color="inherit"
          startIcon={<PlayIcon />}
          onClick={() => startPolling(sagaConfig)}
        >
          Iniciar
        </Button>
        <Button
          style={{ marginLeft: 10 }}
          size="small"
          variant="outlined"
          color="inherit"
          startIcon={<PauseIcon />}
          onClick={() => stopPolling()}
        >
          Parar
        </Button>
        <Button
          style={{ marginLeft: 10 }}
          size="small"
          variant="outlined"
          color="inherit"
          startIcon={<AddIcon />}
          onClick={() => handleClick()}
        >
          Adicionar
        </Button>
      </DevelopmentContainer>
    );
  }, [handleClick, startPolling, stopPolling]);

  return (
    <ViewContainer headerTitle="Dashboard" headerContent={getHeaderContent}>
      <ResponsiveReactGridLayout
        cols={cols}
        rowHeight={rowHeight}
        className={className}
        layouts={{ lg: layout }}
        onLayoutChange={onLayoutChange}
        measureBeforeMount={false}
        compactType="vertical"
        verticalCompact
        preventCollision={false}
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
