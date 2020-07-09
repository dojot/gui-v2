import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { v4 as uuidv4 } from 'uuid';
import Button from '@material-ui/core/Button'
import { actions as dashboardActions } from 'Redux/dashboard'
import { actions as layoutActions } from 'Redux/base'
import {
  dashboardLayout, dashboardData, dashboardConfig, dashboardSaga,
} from 'Selectors/dashboardSelector'
import { menuSelector } from 'Selectors/baseSelector'
import { connect } from 'react-redux'
import { DevelopmentContainer } from 'Components/Containers'
import { AppHeader } from 'Components/Header'
import { LineChartWidget } from './widget/lineChart'
import { AreaChartWidget } from './widget/areaChart'
import { BarChartWidget } from './widget/barChart'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const Dashboard = (props) => {
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
    updateIsMenuOpen,
    isMenuOpen,
  } = props;

  const { bar, line, area } = __CONFIG__;

  const handleClick = () => {
    const { history } = props
    history.push('/dashboard/widget')
  }

  useEffect(() => {
    if (!_.isEmpty(sagaConfig)) {
      startPolling(sagaConfig)
    }
    return () => stopPolling()
  }, [sagaConfig])

  const onLayoutChange = (newLayout) => {
    props.updateLayout(newLayout);
  }

  const generateWidgetConfig = (type) => {
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
              id: 'colorUv', x1: '0', y1: '0', x2: '0', y2: '1', color: '#2c55e7',
            },
            {
              id: 'colorPv', x1: '0', y1: '0', x2: '0', y2: '1', color: '#6d96f3',
            },
            {
              id: 'colorAmt', x1: '0', y1: '0', x2: '0', y2: '1', color: '#adc4f8',
            },
          ],
        }
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
        }
      default:
        return []
    }
  }

  const createNewWidget = (type) => {
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
    }
    props.addWidget(newWidget);
    props.addWidgetConfig({ [widgetId]: generateWidgetConfig(type) });
  }

  const onRemoveItem = (i) => {
    props.removeWidget(i);
    props.removeWidgetConfig(i);
    props.removeWidgetSaga(i);
    stopPolling()
  }

  const onPin = (i) => {
    const newArr = _.map(layout, (item) => {
      const {
        static: iStatic, ...otherProps
      } = item;
      return item.i === i ? {
        static: !iStatic,
        ...otherProps,
      } : item;
    });
    props.updateLayout(newArr);
  }

  const createElement = (element) => {
    const { i } = element
    const [type] = i.split('/')
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
        )
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
        )
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
        )
      default:
        return (
          <div key={i}>
            <AreaChartWidget id={i} onDelete={onRemoveItem} onPin={onPin} />
          </div>
        )
    }
  }

  return (
    <Fragment>
      <AppHeader
        isOpen={isMenuOpen}
        handleClick={updateIsMenuOpen}
        title="Dashboard"
      >
        <DevelopmentContainer>
          <Button style={{ marginLeft: 5 }} size="small" variant="outlined" color="inherit" onClick={() => startPolling('hello')}>start</Button>
          <Button style={{ marginLeft: 5 }} size="small" variant="outlined" color="inherit" onClick={() => stopPolling()}>stop</Button>
          <Button style={{ marginLeft: 5 }} size="small" variant="outlined" color="inherit" onClick={() => createNewWidget(line)}>linha</Button>
          <Button style={{ marginLeft: 5 }} size="small" variant="outlined" color="inherit" onClick={() => createNewWidget(area)}>area</Button>
          <Button style={{ marginLeft: 5 }} size="small" variant="outlined" color="inherit" onClick={() => createNewWidget(bar)}>barra</Button>
          <Button style={{ marginLeft: 5 }} size="small" variant="outlined" color="inherit" onClick={() => handleClick()}>Adicionar</Button>
        </DevelopmentContainer>
      </AppHeader>

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
        {_.map(layout, (element) => createElement(element))}
      </ResponsiveReactGridLayout>
    </Fragment>
  )
}

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
}

Dashboard.propTypes = {
  className: PropTypes.string,
  rowHeight: PropTypes.number,
  cols: PropTypes.any,
}

const mapStateToProps = (state) => ({
  ...dashboardLayout(state),
  ...dashboardData(state),
  ...dashboardConfig(state),
  ...dashboardSaga(state),
  ...menuSelector(state),
})

const mapDispatchToProps = {
  ...dashboardActions,
  ...layoutActions,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)
