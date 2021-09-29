import React from 'react';

import { Menu, MenuItem } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useDeviceOptionsStyles } from './style';

const DeviceOptionsMenu = ({
  isShowingMenu,
  anchorElement,
  handleEditDevice,
  handleDeleteDevice,
  handleHideOptionsMenu,
}) => {
  const { t } = useTranslation(['devices', 'common']);
  const classes = useDeviceOptionsStyles();

  return (
    <Menu
      id='options-menu'
      open={isShowingMenu}
      anchorEl={anchorElement}
      onClose={handleHideOptionsMenu}
    >
      <MenuItem className={classes.menuItem} onClick={handleEditDevice}>
        <Edit />
        <span className={classes.menuItemText}>{t('common:edit')}</span>
      </MenuItem>

      <MenuItem className={classes.menuItem} onClick={handleDeleteDevice}>
        <Delete />
        <span className={classes.menuItemText}>{t('common:exclude')}</span>
      </MenuItem>
    </Menu>
  );
};

DeviceOptionsMenu.propTypes = {
  isShowingMenu: PropTypes.bool,
  anchorElement: PropTypes.object,
  handleEditDevice: PropTypes.func,
  handleDeleteDevice: PropTypes.func,
  handleHideOptionsMenu: PropTypes.func,
};

DeviceOptionsMenu.defaultProps = {
  isShowingMenu: false,
  anchorElement: null,
  handleEditDevice: null,
  handleDeleteDevice: null,
  handleHideOptionsMenu: null,
};

export default DeviceOptionsMenu;
