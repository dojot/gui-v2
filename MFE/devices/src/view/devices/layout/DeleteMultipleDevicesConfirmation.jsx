import React from 'react';

import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@material-ui/core';
import PropTypes from 'prop-types';

const DeleteMultipleDevicesConfirmation = ({
  isOpen,
  title,
  cancelButtonText,
  confirmButtonText,
  shouldCloseWhenCancel,
  shouldCloseWhenConfirm,
  handleClose,
  handleConfirm,
  handleCancel,
  selectedDevices,
}) => {
  const handleCancelDialog = () => {
    if (handleCancel) handleCancel();
    if (shouldCloseWhenCancel) handleClose();
  };

  const handleConfirmDialog = () => {
    if (handleConfirm) handleConfirm();
    if (shouldCloseWhenConfirm) handleClose();
  };

  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>

      <DialogContent>
        <ul>
          {selectedDevices.map(selectedDevice => (
            <li key={selectedDevice.id}>
              <strong>{selectedDevice.label}</strong>
            </li>
          ))}
        </ul>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancelDialog}>{cancelButtonText}</Button>

        <Button color='secondary' onClick={handleConfirmDialog}>
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteMultipleDevicesConfirmation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.node.isRequired,
  cancelButtonText: PropTypes.node.isRequired,
  confirmButtonText: PropTypes.node.isRequired,
  shouldCloseWhenCancel: PropTypes.bool,
  shouldCloseWhenConfirm: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  handleCancel: PropTypes.func,
  selectedDevices: PropTypes.array.isRequired,
};

DeleteMultipleDevicesConfirmation.defaultProps = {
  shouldCloseWhenCancel: true,
  shouldCloseWhenConfirm: true,
  handleCancel: null,
};

export default DeleteMultipleDevicesConfirmation;
