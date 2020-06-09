import React, { Component, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { makeStyles } from '@material-ui/core/styles'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import More from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import Fade from '@material-ui/core/Fade'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText';
import CardContent from '@material-ui/core/CardContent'
import { v4 as uuidv4 } from 'uuid';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend, Line, LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Button from '@material-ui/core/Button'

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

const staticLayout = [
  {
    x: 0,
    y: 0,
    w: 6,
    h: 10,
    i: `0/${uuidv4()}`,
    minW: 3,
    minH: 6,
    maxH: Infinity,
    maxW: Infinity,
    static: false,
    moved: false,
    isDraggable: true,
    isResizable: true,
  },
  {
    x: 6,
    y: 0,
    w: 6,
    h: 10,
    i: `2/${uuidv4()}`,
    minW: 3,
    minH: 6,
    maxH: Infinity,
    maxW: Infinity,
    static: false,
    moved: false,
    isDraggable: true,
    isResizable: true,
  },
  {
    x: 0,
    y: 10,
    w: 6,
    h: 7,
    i: `0/${uuidv4()}`,
    minW: 3,
    minH: 6,
    maxH: Infinity,
    maxW: Infinity,
    static: false,
    moved: false,
    isDraggable: true,
    isResizable: true,
  },
  {
    x: 6,
    y: 10,
    w: 6,
    h: 7,
    i: `1/${uuidv4()}`,
    minW: 3,
    minH: 6,
    maxH: Infinity,
    maxW: Infinity,
    static: false,
    moved: false,
    isDraggable: true,
    isResizable: true,
  },
]

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const useStyles = makeStyles(() => {
  return {
    content: {
      padding: '10px 16px',
      height: 'calc(100% - 72px)',
      position: 'relative',
    },
    card: {
      height: '100%',
      width: '100%',
    },
  }
})

const Dashboard = (props) => {
  const {
    cols, rowHeight, className, initialLayout,
  } = props;

  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')
  const [compactType, setCompactType] = useState('vertical')
  const [layout, setLayout] = useState(initialLayout)

  const onBreakpointChange = (breakpoint) => {
    setCurrentBreakpoint(breakpoint)
  }

  const onCompactTypeChange = () => {
    const newCompactType = compactType === 'horizontal'
      ? 'vertical' : compactType === 'vertical'
        ? null : 'horizontal'
    setCompactType(newCompactType)
  }

  const onUpdateLayout = (updatedLayout) => {
    setLayout(updatedLayout);
  }

  const onLayoutChange = (newLayout) => {
  }

  const createElement = (element, index, onDelete, onPin) => {
    const { i } = element
    const infos = i.split('/')
    switch (infos[0]) {
      case '0':
        return (
          <div key={i}>
            <LineChartCard id={i} index={index} onDelete={onDelete} onPin={onPin} />
          </div>
        )
      case '1':
        return (
          <div key={i}>
            <AreaChartCard id={i} index={index} onDelete={onDelete} onPin={onPin} />
          </div>
        )
      case '2':
        return (
          <div key={i}>
            <BarChartCard id={i} index={index} onDelete={onDelete} onPin={onPin} />
          </div>
        )
      default:
        return (
          <div key={i}>
            <AreaChartCard id={i} index={index} onDelete={onDelete} onPin={onPin} />
          </div>
        )
    }
  }

  const createNewWidget = () => {
    const newLayout = _.concat(layout, {
      i: `1/${uuidv4()}`,
      x: (layout.length % 2) * 6,
      y: Infinity,
      w: 6,
      h: 10,
      minW: 3,
      minH: 6,
      maxH: Infinity,
      maxW: Infinity,
      static: false,
      moved: false,
      isDraggable: true,
      isResizable: true,
    });
    setLayout(newLayout)
  }

  const onRemoveItem = (i) => {
    const newLayout = _.reject(layout, { i });
    setLayout(newLayout);
  }

  const onPin = (i) => {
    const newArr = _.map(layout, (item) => {
      const {
        static: iStatic, isDraggable, isResizable, ...otherProps
      } = item;
      return item.i === i ? {
        static: !iStatic,
        isDraggable: !isDraggable,
        isResizable: !isResizable,
        ...otherProps,
      } : item;
    });
    setLayout(newArr);
  }

  return (
    <div>
      <Button size="small" variant="outlined" color="primary" onClick={() => createNewWidget()}>adicionar</Button>
      <ResponsiveReactGridLayout
        cols={cols}
        rowHeight={rowHeight}
        className={className}
        layouts={{ lg: layout }}
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={onLayoutChange}
        onResizeStop={onUpdateLayout}
        onDragStop={onUpdateLayout}
        measureBeforeMount={false}
        compactType={compactType}
        verticalCompact
        preventCollision={!compactType}
      >
        {_.map(layout, (element, index) => createElement(
          element,
          index,
          onRemoveItem,
          onPin
        ))}
      </ResponsiveReactGridLayout>
    </div>
  )
}

const BarChartCard = ({
  id, index, onDelete, onPin,
}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Card className={classes.card} variant="outlined">
      <CardHeader
        action={(
          <div>
            <IconButton
              aria-controls="fade-menu-3"
              aria-haspopup="true"
              aria-label="settings"
              onClick={handleClickMenu}
            >
              <More />
            </IconButton>
            <Menu
              id="fade-menu-3"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleClose}>
                <ListItemText primary="Editar" />
              </MenuItem>
              <MenuItem onClick={() => onPin(id)}>
                <ListItemText primary="Fixar" />
              </MenuItem>
              <MenuItem onClick={() => onDelete(id)}>
                <ListItemText primary="Excluir" />
              </MenuItem>
            </Menu>
          </div>
        )}
        title="Distancia percorrida por hora"
      />
      <CardContent className={classes.content}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 0,
              left: 10,
              bottom: 15,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

const LineChartCard = ({
  id, index, onDelete, onPin,
}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Card className={classes.card} variant="outlined">
      <CardHeader
        action={(
          <div>
            <IconButton
              aria-controls="fade-menu-1"
              aria-haspopup="true"
              aria-label="settings"
              onClick={handleClickMenu}
            >
              <More />
            </IconButton>
            <Menu
              id="fade-menu-1"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <ListItemText primary="Editar" />
              </MenuItem>
              <MenuItem onClick={() => onPin(id)}>
                <ListItemText primary="Fixar" />
              </MenuItem>
              <MenuItem onClick={() => onDelete(id)}>
                <ListItemText primary="Excluir" />
              </MenuItem>
            </Menu>
          </div>
        )}
        title="Chuva nas últimas 24h"
      />
      <CardContent className={classes.content}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

const AreaChartCard = ({
  id, index, onDelete, onPin,
}) => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Card className={classes.card} variant="outlined">
      <CardHeader
        action={(
          <div>
            <IconButton
              aria-controls="fade-menu-2"
              aria-haspopup="true"
              aria-label="settings"
              onClick={handleClickMenu}
            >
              <More />
            </IconButton>
            <Menu
              id="fade-menu-2"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleClose}>
                <ListItemText primary="Editar" />
              </MenuItem>
              <MenuItem onClick={() => onPin(id)}>
                <ListItemText primary="Fixar" />
              </MenuItem>
              <MenuItem onClick={() => onDelete(id)}>
                <ListItemText primary="Excluir" />
              </MenuItem>
            </Menu>
          </div>
        )}
        title="Velocidade do vento"
      />
      <CardContent className={classes.content}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="pv"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
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
  initialLayout: staticLayout,

}

Dashboard.propTypes = {
  className: PropTypes.string,
  rowHeight: PropTypes.number,
  cols: PropTypes.any,
  initialLayout: PropTypes.array,
}

export default (Dashboard)
