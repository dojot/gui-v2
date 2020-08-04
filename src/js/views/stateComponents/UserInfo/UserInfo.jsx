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
import { getUserInformation } from 'Utils';

import { useStyles } from './style';

export const UserInfo = () => {
  const classes = useStyles();
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
      <Fragment>
        <Divider orientation="vertical" flexItem className={classes.divider} />
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          color="inherit"
          size="small"
          className={classes.button}
          onClick={handleToggle}
          startIcon={<AccountCircle />}
        >
          {`Olá, ${user.userName}`}
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <List className={classes.list}>
                    <ListItem>
                      <ListItemText primary={guiVersion} secondary="Versão" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText primary={user.profile} secondary="Perfil" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={user.tenant} secondary="Tenant" />
                    </ListItem>
                  </List>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Fragment>
    </div>
  );
};
