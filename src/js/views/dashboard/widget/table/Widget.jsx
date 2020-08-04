import React, { useState, useCallback } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import More from '@material-ui/icons/MoreVert';

import CustomizedTables from '../../../../common/components/Table/SimpleTable/SimpleTable';

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

const TableWidget = ({ id, data, config, onDelete, onPin, onEdit }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { table } = config;

  const handleClickMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (callback = () => {}) => {
    setAnchorEl(null);
    callback(id);
  };

  const renderTable = useCallback(() => {
    if (data && data.length) {
      const columns = table.map(col => ({
        dataKey: col.dataKey,
        label: col.name || col.dataKey,
      }));

      return <CustomizedTables columns={columns} rows={data} />;
    }
    return null;
  }, [data, table]);

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
      <CardContent className={classes.content}>{renderTable()}</CardContent>
    </Card>
  );
};

export default TableWidget;
