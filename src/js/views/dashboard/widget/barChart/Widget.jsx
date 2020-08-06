import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import More from '@material-ui/icons/MoreVert';
import { useTranslation } from 'react-i18next';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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

export default ({ id, data, onDelete, onPin, config }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
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
        )}
        title={config.meta.title}
        subheader={config.meta.subTitle}
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
            <XAxis tickFormatter={formatDate} dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            {config.bar.map(item => (
              <Bar isAnimationActive={false} {...item} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
