import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import More from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import CardContent from '@material-ui/core/CardContent'
import {
  CartesianGrid,
  Legend, Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { makeStyles } from '@material-ui/core/styles'

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

export default ({
  id, data, config, title, onDelete, onPin, onEdit,
}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (callback = () => {}) => {
    setAnchorEl(null)
    callback(id);
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
              <MenuItem onClick={() => handleClose()}>
                <ListItemText primary="Editar" />
              </MenuItem>
              <MenuItem onClick={() => handleClose(onPin)}>
                <ListItemText primary="Fixar" />
              </MenuItem>
              <MenuItem onClick={() => handleClose(onDelete)}>
                <ListItemText primary="Excluir" />
              </MenuItem>
            </Menu>
          </div>
        )}
        title={config.meta.title}
        subheader={config.meta.subTitle}
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
            {config.line.map((item) => (
              <Line isAnimationActive={false} key={item.dataKey} {...item} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
