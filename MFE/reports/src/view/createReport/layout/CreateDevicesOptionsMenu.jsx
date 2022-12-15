import React from 'react';

import { Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { PhoneIphone, DevicesOther } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { EVENT } from 'sharedComponents/Constants';
import { dispatchEvent } from 'sharedComponents/Hooks';

const CreateDevicesOptionsMenu = ({ anchorElement, handleClose }) => {
  const { t } = useTranslation('createReport');

  return (
    <Menu
      id='devices-creation-menu'
      anchorEl={anchorElement}
      keepMounted
      open={!!anchorElement}
      onClose={handleClose}
    >
      <MenuItem onClick={() => dispatchEvent(EVENT.CHANGE_ROUTE, { pathname: '/devices/new' })}>
        <ListItemIcon>
          <PhoneIphone />
        </ListItemIcon>
        <ListItemText primary={t('devicesCreationMenu.createOneDevice')} />
      </MenuItem>

      <MenuItem
        onClick={() => dispatchEvent(EVENT.CHANGE_ROUTE, { pathname: '/devices/new/multiple' })}
      >
        <ListItemIcon>
          <DevicesOther />
        </ListItemIcon>
        <ListItemText primary={t('devicesCreationMenu.createManyDevices')} />
      </MenuItem>

      {/* Descomentar quando a funcionalidade estiver disponível */}
      {/* <MenuItem onClick={() => history.push('/devices/new/csv')}>
        <ListItemIcon>
          <Publish />
        </ListItemIcon>
        <ListItemText primary={t('devicesCreationMenu.importUsingCSV')} />
      </MenuItem> */}
    </Menu>
  );
};

CreateDevicesOptionsMenu.propTypes = {
  anchorElement: PropTypes.element,
  handleClose: PropTypes.func.isRequired,
};

CreateDevicesOptionsMenu.defaultProps = {
  anchorElement: null,
};

export default CreateDevicesOptionsMenu;
