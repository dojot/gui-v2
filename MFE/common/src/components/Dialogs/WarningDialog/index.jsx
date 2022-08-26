import React from 'react';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
} from '@material-ui/core';
import { Warning, SubdirectoryArrowRight } from '@material-ui/icons';
import PropTypes from 'prop-types';
import useStyles from './style';

const WarningDialog = ({ isOpen, message, cancelButtonText, handleClose, devices }) => {
  const classes = useStyles();

  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle className={classes.dialogTitle} id='alert-dialog-title'>
        <Warning className={classes.icon} />
        <Typography id='alert-dialog-description'>{message}</Typography>
      </DialogTitle>

      <DialogContent>
        {devices && (
          <ul>
            {devices.map(({ id, label, error }) => (
              <li key={id} className={classes.itemList}>
                <strong>{label}</strong>
                <br />
                <SubdirectoryArrowRight /> {error.message}
              </li>
            ))}
          </ul>
        )}
      </DialogContent>

      <DialogActions className={classes.dialogActions}>
        <Button className={classes.cancelButton} onClick={handleClose}>
          {cancelButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

WarningDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.node.isRequired,
  cancelButtonText: PropTypes.node.isRequired,
  handleClose: PropTypes.func.isRequired,
  devices: PropTypes.array,
};

WarningDialog.defaultProps = {
  devices: undefined,
};

export default WarningDialog;
