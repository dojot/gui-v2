import React, { useRef, useState } from 'react';

import { Button, Divider, Box } from '@material-ui/core';
import { ArrowDropDown, Language } from '@material-ui/icons';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { getUserInformation, logout } from 'Utils';

import { AlertDialog } from '../../../common/components/Dialogs';
import { useChangeLanguage } from '../../../common/hooks';
import LanguagesMenu from './LanguagesMenu';
import { useStyles } from './style';
import UserMenu from './UserMenu';

const DEFAULT_USER_DATA = { userName: '', tenant: '', profile: '' };

export const UserInfo = () => {
  const { t, i18n } = useTranslation(['userInfo', 'languages']);
  const history = useHistory();
  const classes = useStyles();

  const { languages, handleChangeLanguage } = useChangeLanguage();

  const menuButtonRef = useRef(null);
  const switchLanguageButtonRef = useRef(null);

  const [isShowingUserMenu, setIsShowingUserMenu] = useState(false);
  const [isDarkModeActivated, setIsDarkModeActivated] = useState(false);
  const [isShowingLogoutModal, setIsShowingLogoutModal] = useState(false);
  const [isShowingLanguagesMenu, setIsShowingLanguagesMenu] = useState(false);

  const version = `${GUI_VERSION || t('notDefined')}`;
  const user = getUserInformation() || DEFAULT_USER_DATA;

  const handleToggleUserMenu = () => {
    setIsShowingUserMenu(isShowing => !isShowing);
  };

  const handleClickAwayUserMenu = event => {
    if (menuButtonRef.current?.contains(event.target)) return;
    setIsShowingUserMenu(false);
  };

  const handleToggleLanguagesMenu = () => {
    setIsShowingLanguagesMenu(isShowing => !isShowing);
  };

  const handleClickAwayLanguagesMenu = event => {
    if (switchLanguageButtonRef.current?.contains(event.target)) return;
    setIsShowingLanguagesMenu(false);
  };

  const handleHideLanguagesMenu = () => {
    setIsShowingLanguagesMenu(false);
  };

  const handleShowLogoutModal = () => {
    setIsShowingLogoutModal(true);
    setIsShowingUserMenu(false);
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

  const handleChangeTheme = e => {
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

      <LanguagesMenu
        languages={languages}
        isShowingLanguagesMenu={isShowingLanguagesMenu}
        anchorElement={switchLanguageButtonRef.current}
        handleChangeLanguage={handleChangeLanguage}
        handleHideLanguagesMenu={handleHideLanguagesMenu}
        handleClickAwayLanguagesMenu={handleClickAwayLanguagesMenu}
      />

      <UserMenu
        version={version}
        tenant={user.tenant}
        anchorElement={menuButtonRef.current}
        isShowingUserMenu={isShowingUserMenu}
        isDarkModeActivated={isDarkModeActivated}
        handleChangeTheme={handleChangeTheme}
        handleChangePassword={handleChangePassword}
        handleShowLogoutModal={handleShowLogoutModal}
        handleClickAwayUserMenu={handleClickAwayUserMenu}
      />

      <Button
        ref={switchLanguageButtonRef}
        className={classes.buttonWithRightMargin}
        color='inherit'
        aria-haspopup='true'
        data-testid='switchLanguageButton'
        onClick={handleToggleLanguagesMenu}
        endIcon={<ArrowDropDown />}
        startIcon={<Language />}
        aria-controls={isShowingUserMenu ? 'menu-list-grow' : undefined}
      >
        {t(`languages:${i18n.language}`)}
      </Button>

      <Button
        ref={menuButtonRef}
        className={classes.button}
        color='inherit'
        aria-haspopup='true'
        data-testid='menuButton'
        onClick={handleToggleUserMenu}
        endIcon={<ArrowDropDown />}
        startIcon={<AccountCircle />}
        aria-controls={isShowingUserMenu ? 'menu-list-grow' : undefined}
      >
        {user.userName}
      </Button>
    </Box>
  );
};
