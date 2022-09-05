import React from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  Collapse,
} from '@material-ui/core';
import { Warning, SubdirectoryArrowRight } from '@material-ui/icons';
import PropTypes from 'prop-types';
import useStyles from './style';
import TemplateItem from './TemplateItem';
import { useTranslation } from 'react-i18next';

const WarningDialog = ({ isOpen, message, cancelButtonText, handleClose, devices, templates }) => {
  const classes = useStyles();
  const { t } = useTranslation(['devices', 'templates']);

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

      <DialogContent className={classes.dialogContent}>
        {!!devices && (
          <ul>
            {devices.map(({ id, label, error }) => (
              <li key={id} className={classes.itemBox}>
                <strong>{label}</strong>
                <SubdirectoryArrowRight /> {error.message}
              </li>
            ))}
          </ul>
        )}

        {!!templates &&
          templates.map(({ id, name, type, associateDevices }) => (
            <TemplateItem
              key={id}
              id={id}
              name={name}
              type={type}
              associateDevices={associateDevices}
            />
          ))}
      </DialogContent>

      <DialogActions className={classes.dialogActions}>
        <Typography>{!!templates && t('templates:theOtherTemplatesWereExcluded')}</Typography>
        <Button color='primary' className={classes.cancelButton} onClick={handleClose}>
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
  templates: PropTypes.array,
};

WarningDialog.defaultProps = {
  devices: undefined,
  templates: undefined,
};

export default WarningDialog;
