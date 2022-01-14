import React from 'react';

import {
  Grow,
  List,
  Paper,
  Popper,
  ListItem,
  ListItemText,
  ListItemIcon,
  ClickAwayListener,
  Switch,
} from '@material-ui/core';
import { BookmarkBorder, ExitToApp, Lock } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useStyles } from './style';

const UserMenu = ({
  tenant,
  version,
  anchorElement,
  isShowingUserMenu,
  isDarkModeActivated,
  handleChangeTheme,
  handleChangePassword,
  handleShowLogoutModal,
  handleClickAwayUserMenu,
}) => {
  const { t } = useTranslation('userInfo');
  const classes = useStyles();

  return (
    <Popper
      open={isShowingUserMenu}
      anchorEl={anchorElement}
      placement='bottom-end'
      transition
      disablePortal
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps}>
          <Paper>
            <ClickAwayListener onClickAway={handleClickAwayUserMenu}>
              <List className={classes.list}>
                <ListItem data-testid='tenant'>
                  <ListItemIcon className={classes.listItemIcon}>
                    <BookmarkBorder />
                  </ListItemIcon>

                  <ListItemText>{t('tenant', { tenant })}</ListItemText>
                </ListItem>

                <ListItem data-testid='version'>
                  <ListItemIcon className={classes.listItemIcon}>
                    <BookmarkBorder />
                  </ListItemIcon>

                  <ListItemText>{t('version', { version })}</ListItemText>
                </ListItem>

                <ListItem data-testid='darkMode'>
                  <ListItemIcon className={classes.listItemIcon}>
                    <BookmarkBorder />
                  </ListItemIcon>

                  <ListItemText>{t('darkMode')}</ListItemText>

                  <Switch
                    className={classes.listItemSwitch}
                    checked={isDarkModeActivated}
                    onChange={handleChangeTheme}
                    color='primary'
                  />
                </ListItem>

                {false && (
                  // TODO: Show again when possible
                  <ListItem
                    data-testid='changePassword'
                    className={classes.clickableListItem}
                    onClick={handleChangePassword}
                    disabled
                  >
                    <ListItemIcon className={classes.listItemIcon}>
                      <Lock />
                    </ListItemIcon>

                    <ListItemText>{t('changePassword')}</ListItemText>
                  </ListItem>
                )}

                <ListItem
                  data-testid='logout'
                  className={classes.clickableListItem}
                  onClick={handleShowLogoutModal}
                >
                  <ListItemIcon className={classes.listItemIcon}>
                    <ExitToApp />
                  </ListItemIcon>

                  <ListItemText>{t('logout')}</ListItemText>
                </ListItem>
              </List>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

UserMenu.propTypes = {
  tenant: PropTypes.string,
  version: PropTypes.string,
  anchorElement: PropTypes.object,
  isShowingUserMenu: PropTypes.bool,
  isDarkModeActivated: PropTypes.bool,
  handleChangeTheme: PropTypes.func,
  handleChangePassword: PropTypes.func,
  handleShowLogoutModal: PropTypes.func,
  handleClickAwayUserMenu: PropTypes.func,
};

UserMenu.defaultProps = {
  tenant: '',
  version: '',
  anchorElement: null,
  isShowingUserMenu: false,
  isDarkModeActivated: false,
  handleChangeTheme: null,
  handleChangePassword: null,
  handleShowLogoutModal: null,
  handleClickAwayUserMenu: null,
};

export default UserMenu;
