import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import More from '@material-ui/icons/MoreVert';
import { useTranslation } from 'react-i18next';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatDate } from 'Utils';

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
  };
});

export default ({ id, data, config, onDelete, onPin, onEdit }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { t } = useTranslation(['common']);

  const handleClickMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (callback = () => {}) => {
    setAnchorEl(null);
    callback(id);
  };
  return (
    <Card className={classes.card} variant='outlined'>
      <CardHeader
        action={
          <div>
            <IconButton
              aria-controls='fade-menu-1'
              aria-haspopup='true'
              aria-label='settings'
              onClick={handleClickMenu}
            >
              <More />
            </IconButton>
            <Menu
              id='fade-menu-1'
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleClose()}>
                <ListItemText primary={t('common:edit')} />
              </MenuItem>
              <MenuItem onClick={() => handleClose(onPin)}>
                <ListItemText primary={t('common:pin')} />
              </MenuItem>
              <MenuItem onClick={() => handleClose(onDelete)}>
                <ListItemText primary={t('common:delete')} />
              </MenuItem>
            </Menu>
          </div>
        }
        title={config.meta.title}
        subheader={config.meta.subTitle}
      />
      <CardContent className={classes.content}>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <XAxis
              tickFormatter={formatDate}
              dataKey='timestamp'
              domain={['auto', 'auto']}
            />
            <YAxis domain={['auto', 'auto']} />
            <CartesianGrid strokeDasharray='4 4' />
            <Tooltip />
            <Legend />
            {config.line.map(item => (
              <Line
                connectNulls
                isAnimationActive={false}
                key={item.dataKey}
                {...item}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
