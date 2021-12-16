import React from 'react';

import { Menu, MenuItem } from '@material-ui/core';
import { Delete, InsertLink, LinkOff, Loop } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useCertificateOptionsStyles } from './style';

const CertificateOptionsMenu = ({
  certificate,
  isShowingMenu,
  anchorElement,
  handleHideOptionsMenu,
  handleDeleteCertificate,
  handleDisassociateDevice,
  handleShowDevicesToAssociate,
}) => {
  const { t } = useTranslation(['certificates', 'common']);
  const classes = useCertificateOptionsStyles();

  return (
    <Menu
      id='options-menu'
      open={isShowingMenu}
      anchorEl={anchorElement}
      onClose={handleHideOptionsMenu}
    >
      <MenuItem
        className={classes.menuItem}
        disabled={!!certificate?.belongsTo?.device}
        onClick={handleShowDevicesToAssociate}
      >
        <InsertLink />
        <span className={classes.menuItemText}>{t('certificates:associateToDevice')}</span>
      </MenuItem>

      <MenuItem
        className={classes.menuItem}
        disabled={!certificate?.belongsTo?.device}
        onClick={handleDisassociateDevice}
      >
        <LinkOff />
        <span className={classes.menuItemText}>{t('certificates:disassociateDevice')}</span>
      </MenuItem>

      <MenuItem className={classes.menuItem} disabled={!certificate?.belongsTo?.device}>
        <Loop />
        <span className={classes.menuItemText}>{t('certificates:changeAssociation')}</span>
      </MenuItem>

      <MenuItem className={classes.menuItem} onClick={handleDeleteCertificate}>
        <Delete />
        <span className={classes.menuItemText}>{t('common:exclude')}</span>
      </MenuItem>
    </Menu>
  );
};

CertificateOptionsMenu.propTypes = {
  certificate: PropTypes.object,
  isShowingMenu: PropTypes.bool,
  anchorElement: PropTypes.object,
  handleHideOptionsMenu: PropTypes.func,
  handleDeleteCertificate: PropTypes.func,
  handleDisassociateDevice: PropTypes.func,
  handleShowDevicesToAssociate: PropTypes.func,
};

CertificateOptionsMenu.defaultProps = {
  certificate: null,
  isShowingMenu: false,
  anchorElement: null,
  handleHideOptionsMenu: null,
  handleDeleteCertificate: null,
  handleDisassociateDevice: null,
  handleShowDevicesToAssociate: null,
};

export default CertificateOptionsMenu;
