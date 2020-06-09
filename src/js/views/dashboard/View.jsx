import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import More from '@material-ui/icons/MoreVert';
import {
  LineChart,
  AreaChart,
  BarChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { actions as dashboardActions } from '../../redux/modules/dashboard'


const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
    },
    card: {
      flex: 1,
      minWidth: 450,
      margin: 8,
    },
    content: {
      padding: '10px 16px',
      height: 250,
      position: 'relative',
    },
  }
})

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];


const ExampleView = (props) => {
  const classes = useStyles()

  const handleClick = () => {
    const { history } = props
    history.push('/dashboard/widget')
  }

  return (
    <Grid container justify="flex-start" className={classes.root}>

      <LineChartCard {...props} handleClick={handleClick} />

      <AreaChartCard {...props} handleClick={handleClick} />

      <BarChartCard {...props} handleClick={handleClick} />

    </Grid>
  )
}

const LineChartCard = ({ handleClick, startPolling, stopPolling }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card className={classes.card} variant="outlined">
      <CardHeader
        action={(
          <div>
            <IconButton aria-controls="fade-menu-1" aria-haspopup="true" aria-label="settings" onClick={handleClickMenu}>
              <More />
            </IconButton>
            <Menu
              id="fade-menu-1"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
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
              top: 5, right: 10, left: 10, bottom: 5,
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
      <CardActions>
        <Button size="small" variant="outlined" color="primary" onClick={() => handleClick()}>Wizard</Button>
        <Button size="small" variant="outlined" color="primary" onClick={() => startPolling()}>start</Button>
        <Button size="small" variant="outlined" color="primary" onClick={() => stopPolling()}>stop</Button>
      </CardActions>
    </Card>
  )
}

const AreaChartCard = ({ handleClick, startPolling, stopPolling }) => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card className={classes.card} variant="outlined">
      <CardHeader
        action={(
          <div>
            <IconButton aria-controls="fade-menu-2" aria-haspopup="true" aria-label="settings" onClick={handleClickMenu}>
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
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
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
              top: 5, right: 10, left: 10, bottom: 5,
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
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
          </AreaChart>
        </ResponsiveContainer>

      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" color="primary" onClick={() => handleClick()}>Wizard</Button>
        <Button size="small" variant="outlined" color="primary" onClick={() => startPolling()}>start</Button>
        <Button size="small" variant="outlined" color="primary" onClick={() => stopPolling()}>stop</Button>
      </CardActions>
    </Card>
  )
}

const BarChartCard = ({ handleClick, startPolling, stopPolling }) => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card className={classes.card} variant="outlined">
      <CardHeader
        action={(
          <div>
            <IconButton aria-controls="fade-menu-3" aria-haspopup="true" aria-label="settings" onClick={handleClickMenu}>
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
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        )}
        title="Distancia percorrida por hora"
      />
      <CardContent className={classes.content}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
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
      <CardActions>
        <Button size="small" variant="outlined" color="primary" onClick={() => handleClick()}>Wizard</Button>
        <Button size="small" variant="outlined" color="primary" onClick={() => startPolling()}>start</Button>
        <Button size="small" variant="outlined" color="primary" onClick={() => stopPolling()}>stop</Button>
      </CardActions>
    </Card>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  ...dashboardActions,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExampleView)
