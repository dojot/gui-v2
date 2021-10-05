import React from 'react';

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
} from '@material-ui/core';
import { ArrowDropDown, BookmarkBorder, ExitToApp, Lock } from '@material-ui/icons';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { getUserInformation } from 'Utils';

import { useStyles } from './style';

export const UserInfo = () => {
  const { t } = useTranslation(['common']);
  const history = useHistory();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const user = getUserInformation() || { userName: '', tenant: '', profile: '' };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current?.contains(event.target)) return;
    setOpen(false);
  };

  const handleChangePassword = () => {
    history.push('/change-password');
  };

  const handleLogout = () => {
    console.log('logout');
  };

  const version = GUI_VERSION || t('notDefined');

  return (
    <div className={classes.root}>
      <>
        <Divider orientation='vertical' flexItem className={classes.divider} />

        <Button
          ref={anchorRef}
          className={classes.button}
          color='inherit'
          onClick={handleToggle}
          startIcon={<AccountCircle />}
          endIcon={<ArrowDropDown />}
          aria-haspopup='true'
          data-testid='buttonMenu'
          aria-controls={open ? 'menu-list-grow' : undefined}
        >
          {user.userName}
        </Button>

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement='bottom-end'
          transition
          disablePortal
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={handleClose}>
                  <List className={classes.list}>
                    <ListItem>
                      <ListItemIcon className={classes.listItemIcon}>
                        <BookmarkBorder />
                      </ListItemIcon>
                      <ListItemText>{t('tenant', { tenant: user.tenant })}</ListItemText>
                    </ListItem>

                    <ListItem>
                      <ListItemIcon className={classes.listItemIcon}>
                        <BookmarkBorder />
                      </ListItemIcon>
                      <ListItemText>{t('version', { version })}</ListItemText>
                    </ListItem>

                    <ListItem divider>
                      <ListItemIcon className={classes.listItemIcon}>
                        <BookmarkBorder />
                      </ListItemIcon>
                      <ListItemText>{t('tenant', { tenant: user.tenant })}</ListItemText>
                    </ListItem>

                    <ListItem onClick={handleChangePassword}>
                      <ListItemIcon className={classes.listItemIcon}>
                        <Lock />
                      </ListItemIcon>
                      <ListItemText>{t('changePassword')}</ListItemText>
                    </ListItem>

                    <ListItem onClick={handleLogout}>
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
      </>
    </div>
  );
};
