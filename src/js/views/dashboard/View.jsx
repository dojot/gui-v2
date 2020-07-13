import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import Button from '@material-ui/core/Button';
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
import { v4 as uuidv4 } from 'uuid';

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
    addWidget,
    addWidgetConfig,
    updateLayout,
    removeWidget,
    removeWidgetConfig,
    removeWidgetSaga,
  } = props;

  const { bar, line, area } = __CONFIG__;

  const handleClick = useCallback(() => {
    history.push('/dashboard/widget');
  }, [history]);

  useEffect(() => {
    if (!_.isEmpty(sagaConfig)) {
      startPolling(sagaConfig);
    }
    return () => stopPolling();
  }, [sagaConfig, startPolling, stopPolling]);

  const onLayoutChange = useCallback(
    newLayout => {
      updateLayout(newLayout);
    },
    [updateLayout],
  );

  const generateWidgetConfig = useCallback(
    type => {
      switch (type) {
        case line:
          return {
            meta: {
              title: 'Chuva acumulada por hora',
              subTitle: 'Estações da zona norte de campinas',
            },
            line: [
              {
                type: 'monotone',
                dataKey: 'uv',
                stroke: '#bd49ff',
                name: 'Volume',
              },
              {
                type: 'monotone',
                dataKey: 'amt',
                stroke: '#614fca',
                name: 'Pressão',
              },
              {
                type: 'monotone',
                dataKey: 'pv',
                stroke: '#57c64d',
                name: 'Temperatura',
              },
            ],
          };
        case area:
          return {
            meta: {
              title: 'Nível de radiação por hora',
              subTitle: '',
            },
            areaProps: [
              {
                type: 'monotone',
                dataKey: 'uv',
                stroke: '#2c55e7',
                fillOpacity: 1,
                fill: 'url(#colorUv)',
                name: 'Ultra Violeta - A',
                stackId: '1',
              },
              {
                type: 'monotone',
                dataKey: 'pv',
                stroke: '#6d96f3',
                fillOpacity: 1,
                fill: 'url(#colorPv)',
                name: 'Ultra Violeta - B',
                stackId: '1',
              },
              {
                type: 'monotone',
                dataKey: 'amt',
                stroke: '#adc4f8',
                fillOpacity: 1,
                fill: 'url(#colorAmt)',
                name: 'Ultra Violeta - C',
                stackId: '1',
              },
            ],
            defsProps: [
              {
                id: 'colorUv',
                x1: '0',
                y1: '0',
                x2: '0',
                y2: '1',
                color: '#2c55e7',
              },
              {
                id: 'colorPv',
                x1: '0',
                y1: '0',
                x2: '0',
                y2: '1',
                color: '#6d96f3',
              },
              {
                id: 'colorAmt',
                x1: '0',
                y1: '0',
                x2: '0',
                y2: '1',
                color: '#adc4f8',
              },
            ],
          };
        case bar:
          return {
            meta: {
              title: 'Incidencia de radiação',
              subTitle: 'Poderia ser de chocolate',
            },
            bar: [
              {
                dataKey: 'pv',
                fill: '#b285f1',
                name: 'Ultra Violeta',
              },
              {
                dataKey: 'uv',
                fill: '#ff6c6c',
                name: 'Infra vermelho',
              },
            ],
          };
        default:
          return [];
      }
    },
    [area, bar, line],
  );

  const createNewWidget = useCallback(
    type => {
      const widgetId = `${type}/${uuidv4()}`;
      const newWidget = {
        i: widgetId,
        x: (layout.length % 2) * 6,
        y: Infinity,
        w: 6,
        h: 10,
        minW: 3,
        minH: 6,
        static: false,
        moved: false,
      };
      addWidget(newWidget);
      addWidgetConfig({ [widgetId]: generateWidgetConfig(type) });
    },
    [addWidget, addWidgetConfig, generateWidgetConfig, layout.length],
  );

  const onRemoveItem = useCallback(
    i => {
      removeWidget(i);
      removeWidgetConfig(i);
      removeWidgetSaga(i);
      stopPolling();
    },
    [removeWidget, removeWidgetConfig, removeWidgetSaga, stopPolling],
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
                data={data}
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
          style={{ marginLeft: 5 }}
          size="small"
          variant="outlined"
          color="inherit"
          onClick={() => startPolling('hello')}
        >
          start
        </Button>
        <Button
          style={{ marginLeft: 5 }}
          size="small"
          variant="outlined"
          color="inherit"
          onClick={() => stopPolling()}
        >
          stop
        </Button>
        <Button
          style={{ marginLeft: 5 }}
          size="small"
          variant="outlined"
          color="inherit"
          onClick={() => createNewWidget(line)}
        >
          linha
        </Button>
        <Button
          style={{ marginLeft: 5 }}
          size="small"
          variant="outlined"
          color="inherit"
          onClick={() => createNewWidget(area)}
        >
          area
        </Button>
        <Button
          style={{ marginLeft: 5 }}
          size="small"
          variant="outlined"
          color="inherit"
          onClick={() => createNewWidget(bar)}
        >
          barra
        </Button>
        <Button
          style={{ marginLeft: 5 }}
          size="small"
          variant="outlined"
          color="inherit"
          onClick={() => handleClick()}
        >
          Adicionar
        </Button>
      </DevelopmentContainer>
    );
  }, [
    area,
    bar,
    line,
    createNewWidget,
    handleClick,
    startPolling,
    stopPolling,
  ]);

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
