import React from 'react';

import { Menu, MenuItem } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useOptionsMenuStyles } from './style';

const OptionsMenu = ({
  isShowingMenu,
  anchorElement,
  handleEditAttr,
  handleDeleteAttr,
  handleHideOptionsMenu,
}) => {
  const { t } = useTranslation(['templateAttrs', 'common']);
  const classes = useOptionsMenuStyles();

  return (
    <Menu
      id='options-menu'
      open={isShowingMenu}
      anchorEl={anchorElement}
      onClose={handleHideOptionsMenu}
    >
      <MenuItem className={classes.menuItem} onClick={handleEditAttr}>
        <Edit />
        <span className={classes.menuItemText}>{t('common:edit')}</span>
      </MenuItem>

      <MenuItem className={classes.menuItem} onClick={handleDeleteAttr}>
        <Delete />
        <span className={classes.menuItemText}>{t('common:exclude')}</span>
      </MenuItem>
    </Menu>
  );
};

OptionsMenu.propTypes = {
  isShowingMenu: PropTypes.bool.isRequired,
  anchorElement: PropTypes.object,
  handleEditAttr: PropTypes.func.isRequired,
  handleDeleteAttr: PropTypes.func.isRequired,
  handleHideOptionsMenu: PropTypes.func.isRequired,
};

OptionsMenu.defaultProps = {
  anchorElement: undefined,
};

export default OptionsMenu;
