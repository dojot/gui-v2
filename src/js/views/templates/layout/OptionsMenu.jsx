import React from 'react';

import { Menu, MenuItem } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useOptionsMenuStyles } from './style';

const OptionsMenu = ({
  isShowingMenu,
  anchorElement,
  handleEditTemplate,
  handleDeleteTemplate,
  handleHideOptionsMenu,
  handleDuplicateTemplate,
}) => {
  const { t } = useTranslation(['templates', 'common']);
  const classes = useOptionsMenuStyles();

  return (
    <Menu
      id='options-menu'
      open={isShowingMenu}
      anchorEl={anchorElement}
      onClose={handleHideOptionsMenu}
    >
      <MenuItem className={classes.menuItem} onClick={handleEditTemplate}>
        <Edit />
        <span className={classes.menuItemText}>{t('common:edit')}</span>
      </MenuItem>

      <MenuItem className={classes.menuItem} onClick={handleDuplicateTemplate}>
        <Edit />
        <span className={classes.menuItemText}>{t('common:duplicate')}</span>
      </MenuItem>

      <MenuItem className={classes.menuItem} onClick={handleDeleteTemplate}>
        <Delete />
        <span className={classes.menuItemText}>{t('common:exclude')}</span>
      </MenuItem>
    </Menu>
  );
};

OptionsMenu.propTypes = {
  isShowingMenu: PropTypes.bool.isRequired,
  anchorElement: PropTypes.object.isRequired,
  handleEditTemplate: PropTypes.func.isRequired,
  handleDeleteTemplate: PropTypes.func.isRequired,
  handleHideOptionsMenu: PropTypes.func.isRequired,
  handleDuplicateTemplate: PropTypes.func.isRequired,
};

export default OptionsMenu;
