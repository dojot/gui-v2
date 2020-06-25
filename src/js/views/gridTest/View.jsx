import React, { Component, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { v4 as uuidv4 } from 'uuid';
import Button from '@material-ui/core/Button'
import { actions as dashboardActions } from 'Redux/dashboard'
import { dashboardLayout, dashboardData } from 'Selectors/dashboardSelector'
import { connect } from 'react-redux'
import { LineChartWidget } from '../dashboard/widget/lineChart'
import { AreaChartWidget } from '../dashboard/widget/areaChart'
import { BarChartWidget } from '../dashboard/widget/barChart'

// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ]

const staticLayout = [
  {
    x: 0,
    y: 0,
    w: 6,
    h: 10,
    i: `0/${uuidv4()}`,
    minW: 3,
    minH: 6,
    static: false,
  },
  {
    x: 6,
    y: 0,
    w: 6,
    h: 10,
    i: `2/${uuidv4()}`,
    minW: 3,
    minH: 6,
    static: false,
  },
  {
    x: 0,
    y: 10,
    w: 6,
    h: 7,
    i: `0/${uuidv4()}`,
    minW: 3,
    minH: 6,
    static: false,
  },
  {
    x: 6,
    y: 10,
    w: 6,
    h: 7,
    i: `1/${uuidv4()}`,
    minW: 3,
    minH: 6,
    static: false,
  },
]

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const Dashboard = (props) => {
  const {
    cols, rowHeight, className, layout, data,
  } = props;

  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')
  const [compactType, setCompactType] = useState('vertical')

  useEffect(() => {
    // props.initLayout(staticLayout);
  }, [])

  const onBreakpointChange = (breakpoint) => {
    setCurrentBreakpoint(breakpoint)
  }

  const onCompactTypeChange = () => {
    const newCompactType = compactType === 'horizontal'
      ? 'vertical' : compactType === 'vertical'
        ? null : 'horizontal'
    setCompactType(newCompactType)
  }

  const onLayoutChange = (newLayout) => {
    props.updateLayout(newLayout);
  }

  const createNewWidget = (type) => {
    const newLayout = _.concat(layout, {
      i: `${type}/${uuidv4()}`,
      x: (layout.length % 2) * 6,
      y: Infinity,
      w: 6,
      h: 10,
      minW: 3,
      minH: 6,
      static: false,
      moved: false,
    });
    props.updateLayout(newLayout);
    props.addWidget();
  }

  const onRemoveItem = (i) => {
    const newLayout = _.reject(layout, { i });
    props.updateLayout(newLayout);
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
    const infos = i.split('/')
    switch (infos[0]) {
      case '0':
        return (
          <div key={i}>
            <LineChartWidget id={i} onDelete={onRemoveItem} onPin={onPin} data={data} title="Chuva acumulada por dia" config={{}} />
          </div>
        )
      case '1':
        return (
          <div key={i}>
            <AreaChartWidget id={i} onDelete={onRemoveItem} onPin={onPin} data={data} />
          </div>
        )
      case '2':
        return (
          <div key={i}>
            <BarChartWidget id={i} onDelete={onRemoveItem} onPin={onPin} data={data} />
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
    <div>
      <Button size="small" variant="outlined" color="primary" onClick={() => props.startPolling()}>start</Button>
      <Button size="small" variant="outlined" color="primary" onClick={() => props.stopPolling()}>stop</Button>
      <Button size="small" variant="outlined" color="primary" onClick={() => createNewWidget(0)}>linha</Button>
      <Button size="small" variant="outlined" color="primary" onClick={() => createNewWidget(1)}>area</Button>
      <Button size="small" variant="outlined" color="primary" onClick={() => createNewWidget(2)}>barra</Button>
      <ResponsiveReactGridLayout
        cols={cols}
        rowHeight={rowHeight}
        className={className}
        layouts={{ lg: layout }}
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={onLayoutChange}
        measureBeforeMount={false}
        compactType={compactType}
        verticalCompact
        preventCollision={!compactType}
      >
        {_.map(layout, (element) => createElement(element))}
      </ResponsiveReactGridLayout>
    </div>
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
})

const mapDispatchToProps = {
  ...dashboardActions,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)
