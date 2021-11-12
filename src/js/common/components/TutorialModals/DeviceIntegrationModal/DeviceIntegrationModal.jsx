import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { DialogHeader } from '../../Dialogs';

const DeviceIntegrationModal = ({ isOpen, handleClose }) => {
  const { t } = useTranslation('deviceIntegrationModal');

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogHeader id='alert-dialog-title' title={t('title')} handleHideDialog={handleClose} />

      <DialogContent>
        <DialogContentText id='alert-dialog-description'>{t('message')}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Box padding={1}>
          <Button variant='outlined' color='primary' size='large' onClick={handleClose}>
            {t('cancelButton')}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

DeviceIntegrationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default DeviceIntegrationModal;
