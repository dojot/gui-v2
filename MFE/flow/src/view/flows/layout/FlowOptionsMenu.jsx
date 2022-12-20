import React from 'react';

import { Menu, MenuItem } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useDeviceOptionsStyles } from './style';

const FlowOptionsMenu = ({
  isShowingMenu,
  anchorElement,
  handleEditFlow,
  handleDeleteFlow,
  handleHideOptionsMenu,
}) => {
  const { t } = useTranslation(['common']);
  const classes = useDeviceOptionsStyles();

  return (
    <Menu
      id='options-menu'
      open={isShowingMenu}
      anchorEl={anchorElement}
      onClose={handleHideOptionsMenu}
    >
      <MenuItem className={classes.menuItem} onClick={handleEditFlow}>
        <Edit />
        <span className={classes.menuItemText}>{t('common:edit')}</span>
      </MenuItem>

      <MenuItem className={classes.menuItem} onClick={handleDeleteFlow}>
        <Delete />
        <span className={classes.menuItemText}>{t('common:exclude')}</span>
      </MenuItem>
    </Menu>
  );
};

FlowOptionsMenu.propTypes = {
  isShowingMenu: PropTypes.bool,
  anchorElement: PropTypes.object,
  handleEditFlow: PropTypes.func,
  handleDeleteFlow: PropTypes.func,
  handleHideOptionsMenu: PropTypes.func,
};

FlowOptionsMenu.defaultProps = {
  isShowingMenu: false,
  anchorElement: null,
  handleEditFlow: null,
  handleDeleteFlow: null,
  handleHideOptionsMenu: null,
};

export default FlowOptionsMenu;
