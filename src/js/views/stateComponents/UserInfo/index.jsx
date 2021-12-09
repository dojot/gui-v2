import React, { useRef, useState } from 'react';

import {
  Grow,
  List,
  Paper,
  Button,
  Popper,
  Divider,
  ListItem,
  ListItemText,
  ListItemIcon,
  ClickAwayListener,
  Switch,
  Box,
} from '@material-ui/core';
import { ArrowDropDown, BookmarkBorder, ExitToApp, Lock } from '@material-ui/icons';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { getUserInformation, logout } from 'Utils';

import { AlertDialog } from '../../../common/components/Dialogs';
import { useStyles } from './style';

const DEFAULT_USER_DATA = { userName: '', tenant: '', profile: '' };

export const UserInfo = () => {
  const { t } = useTranslation('userInfo');
  const history = useHistory();
  const classes = useStyles();

  const anchorRef = useRef(null);

  const [isShowingMenu, setIsShowingMenu] = useState(false);
  const [isDarkModeActivated, setIsDarkModeActivated] = useState(false);
  const [isShowingLogoutModal, setIsShowingLogoutModal] = useState(false);

  const version = GUI_VERSION || t('notDefined');
  const user = getUserInformation() || DEFAULT_USER_DATA;

  const handleToggleMenu = () => {
    setIsShowingMenu(isShowing => !isShowing);
  };

  const handleHideMenu = event => {
    if (anchorRef.current?.contains(event.target)) return;
    setIsShowingMenu(false);
  };

  const handleShowLogoutModal = () => {
    setIsShowingLogoutModal(true);
    setIsShowingMenu(false);
  };

  const handleHideLogoutModal = () => {
    setIsShowingLogoutModal(false);
  };

  const handleChangePassword = () => {
    history.push('/change-password');
  };

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  const handleChangeDarkMode = e => {
    setIsDarkModeActivated(e.target.checked);
  };

  return (
    <Box className={classes.root}>
      <Divider orientation='vertical' flexItem className={classes.divider} />

      <AlertDialog
        isOpen={isShowingLogoutModal}
        title={t('logoutModal.title')}
        message={t('logoutModal.message')}
        cancelButtonText={t('logoutModal.cancelButton')}
        confirmButtonText={t('logoutModal.confirmButton')}
        handleConfirm={handleLogout}
        handleClose={handleHideLogoutModal}
      />

      <Button
        ref={anchorRef}
        className={classes.button}
        color='inherit'
        aria-haspopup='true'
        data-testid='menuButton'
        onClick={handleToggleMenu}
        endIcon={<ArrowDropDown />}
        startIcon={<AccountCircle />}
        aria-controls={isShowingMenu ? 'menu-list-grow' : undefined}
      >
        {user.userName}
      </Button>

      <Popper
        open={isShowingMenu}
        anchorEl={anchorRef.current}
        placement='bottom-end'
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleHideMenu}>
                <List className={classes.list}>
                  <ListItem data-testid='tenant'>
                    <ListItemIcon className={classes.listItemIcon}>
                      <BookmarkBorder />
                    </ListItemIcon>
                    <ListItemText>{t('tenant', { tenant: user.tenant })}</ListItemText>
                  </ListItem>

                  <ListItem data-testid='version'>
                    <ListItemIcon className={classes.listItemIcon}>
                      <BookmarkBorder />
                    </ListItemIcon>
                    <ListItemText>{t('version', { version })}</ListItemText>
                  </ListItem>

                  <ListItem data-testid='darkMode' divider>
                    <ListItemIcon className={classes.listItemIcon}>
                      <BookmarkBorder />
                    </ListItemIcon>

                    <ListItemText>{t('darkMode')}</ListItemText>

                    <Switch
                      className={classes.listItemSwitch}
                      checked={isDarkModeActivated}
                      onChange={handleChangeDarkMode}
                      color='primary'
                    />
                  </ListItem>

                  <ListItem
                    data-testid='changePassword'
                    className={classes.clickableListItem}
                    onClick={handleChangePassword}
                    // TODO: Enable again when possible
                    style={{ pointerEvents: 'none' }}
                    disabled
                  >
                    <ListItemIcon className={classes.listItemIcon}>
                      <Lock />
                    </ListItemIcon>
                    <ListItemText>{t('changePassword')}</ListItemText>
                  </ListItem>

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
    </Box>
  );
};
