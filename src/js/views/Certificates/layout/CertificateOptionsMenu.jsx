import React from 'react';

import { Menu, MenuItem } from '@material-ui/core';
import { Delete, InsertLink, LinkOff, Loop } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useCertificateOptionsStyles } from './style';

const CertificateOptionsMenu = ({
  isShowingMenu,
  anchorElement,
  handleDeleteCertificate,
  handleHideOptionsMenu,
  certificate,
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
        disabled={certificate?.deviceId !== null}
        onClick={() => handleShowDevicesToAssociate(certificate)}
      >
        <InsertLink />
        <span className={classes.menuItemText}>{t('certificates:associateToDevice')}</span>
      </MenuItem>

      <MenuItem className={classes.menuItem} disabled={!certificate?.deviceId}>
        <LinkOff />
        <span className={classes.menuItemText}>{t('certificates:disassociateDevice')}</span>
      </MenuItem>

      <MenuItem className={classes.menuItem} disabled={!certificate?.deviceId}>
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
  isShowingMenu: PropTypes.bool,
  anchorElement: PropTypes.object,
  handleDeleteCertificate: PropTypes.func,
  handleHideOptionsMenu: PropTypes.func,
  certificate: PropTypes.object,
  handleShowDevicesToAssociate: PropTypes.func,
};

CertificateOptionsMenu.defaultProps = {
  isShowingMenu: false,
  anchorElement: null,
  handleDeleteCertificate: null,
  handleHideOptionsMenu: null,
  certificate: null,
  handleShowDevicesToAssociate: null,
};

export default CertificateOptionsMenu;
