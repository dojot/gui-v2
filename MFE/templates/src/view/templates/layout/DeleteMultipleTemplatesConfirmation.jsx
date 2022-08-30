import React from 'react';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const DeleteMultipleTemplatesConfirmation = ({
  isOpen,
  title,
  cancelButtonText,
  confirmButtonText,
  shouldCloseWhenCancel,
  shouldCloseWhenConfirm,
  autoFocusConfirmationButton,
  handleClose,
  handleConfirm,
  handleCancel,
  selectedTemplates,
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
          {selectedTemplates.map(selectedTemplate => (
            <li key={selectedTemplate.id}>
              <strong>{selectedTemplate.label}</strong>
            </li>
          ))}
        </ul>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancelDialog}>{cancelButtonText}</Button>

        <Button
          color='primary'
          onClick={handleConfirmDialog}
          autoFocus={autoFocusConfirmationButton}
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteMultipleTemplatesConfirmation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.node.isRequired,
  cancelButtonText: PropTypes.node.isRequired,
  confirmButtonText: PropTypes.node.isRequired,
  shouldCloseWhenCancel: PropTypes.bool,
  shouldCloseWhenConfirm: PropTypes.bool,
  autoFocusConfirmationButton: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  handleCancel: PropTypes.func,
  selectedTemplates: PropTypes.array.isRequired,
};

DeleteMultipleTemplatesConfirmation.defaultProps = {
  shouldCloseWhenCancel: true,
  shouldCloseWhenConfirm: true,
  autoFocusConfirmationButton: true,
  handleCancel: null,
};

export default DeleteMultipleTemplatesConfirmation;
