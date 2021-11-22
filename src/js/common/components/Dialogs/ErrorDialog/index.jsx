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

const ErrorModal = ({ isOpen, title, message, closeButtonText, handleClose }) => {
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
        <Button color='primary' onClick={handleClose}>
          {closeButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ErrorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.node.isRequired,
  message: PropTypes.node.isRequired,
  closeButtonText: PropTypes.node.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ErrorModal;
