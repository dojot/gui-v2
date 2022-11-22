import React from 'react';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const AlertDialog = ({
  isOpen,
  title,
  message,
  cancelButtonText,
  confirmButtonText,
  shouldCloseWhenCancel,
  shouldCloseWhenConfirm,
  autoFocusConfirmationButton,
  handleClose,
  handleConfirm,
  handleCancel,
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
        <DialogContentText id='alert-dialog-description'>{message}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancelDialog}>{cancelButtonText}</Button>

        <Button
          color='secondary'
          onClick={handleConfirmDialog}
          autoFocus={autoFocusConfirmationButton}
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AlertDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.node.isRequired,
  message: PropTypes.node.isRequired,
  cancelButtonText: PropTypes.node.isRequired,
  confirmButtonText: PropTypes.node.isRequired,
  shouldCloseWhenCancel: PropTypes.bool,
  shouldCloseWhenConfirm: PropTypes.bool,
  autoFocusConfirmationButton: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  handleCancel: PropTypes.func,
};

AlertDialog.defaultProps = {
  shouldCloseWhenCancel: true,
  shouldCloseWhenConfirm: true,
  autoFocusConfirmationButton: true,
  handleCancel: null,
};

export default AlertDialog;
