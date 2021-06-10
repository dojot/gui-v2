import React, { Fragment, useState, useEffect, useCallback } from 'react';

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Divider from '@material-ui/core/Divider';
import Grow from '@material-ui/core/Grow';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useTranslation } from 'react-i18next';
import { getUserInformation } from 'Utils';

import { useStyles } from './style';

export const UserInfo = () => {
  const classes = useStyles();
  const { t } = useTranslation(['common']);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [user, setUser] = useState({ userName: '', tenant: '', profile: '' });
  useEffect(() => {
    setUser(getUserInformation());
  }, [setUser]);

  const handleToggle = useCallback(() => {
    setOpen(prevOpen => !prevOpen);
  }, [setOpen]);

  const handleClose = useCallback(
    event => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    },
    [setOpen, anchorRef],
  );

  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  // eslint-disable-next-line no-undef
  const guiVersion = GUI_VERSION || 'undefined';

  return (
    <div className={classes.root}>
      <>
        <Divider orientation='vertical' flexItem className={classes.divider} />
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup='true'
          color='inherit'
          size='small'
          className={classes.button}
          onClick={handleToggle}
          startIcon={<AccountCircle />}
          data-testid='buttonMenu'
        >
          {`${t('common:hello')}, ${user.userName}`}
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <List className={classes.list}>
                    <ListItem>
                      <ListItemText
                        data-testid='version'
                        primary={guiVersion}
                        secondary={t('common:version')}
                      />
                    </ListItem>
                    <Divider />
                    <ListItem button component='a' href={user.profile} target='_blank'>
                      <ListItemText
                        data-testid='profile'
                        primary={user.userName}
                        secondary={t('common:profile')}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        data-testid='tenant'
                        primary={user.tenant}
                        secondary={t('common:tenant')}
                      />
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
