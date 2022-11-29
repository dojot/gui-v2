import React from 'react';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
} from '@material-ui/core';
import { Warning } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useDeleteMultipleTemplatesErrorAlert } from './style';
import { useTranslation } from 'react-i18next';
import TemplateNotExcludedItem from './TemplateNotExcludedItem';

const DeleteMultipleTemplatesErrorAlert = ({
  isOpen,
  handleClose,
  templatesAssociatedDevices,
  deletedTemplates,
}) => {
  const classes = useDeleteMultipleTemplatesErrorAlert();
  const { t } = useTranslation('templates');

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
        <Typography id='alert-dialog-description'>
          <strong>{t('multipleTemplatesDeletionError.alertMessage')}</strong>
        </Typography>
      </DialogTitle>

      <DialogContent className={classes.dialogContent}>
        {!!templatesAssociatedDevices &&
          templatesAssociatedDevices.map(({ id, label, associated_devices }) => (
            <TemplateNotExcludedItem
              key={id}
              id={id}
              label={label}
              associated_devices={associated_devices}
            />
          ))}
      </DialogContent>

      <DialogActions className={classes.dialogActions}>
        {!!deletedTemplates.length && (
          <Typography>
            {t('multipleTemplatesDeletionError.theOtherTemplatesWereExcluded')}
          </Typography>
        )}
        <Button color='inherit' className={classes.cancelButton} onClick={handleClose}>
          {t('multipleTemplatesDeletionError.closeButtonText')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteMultipleTemplatesErrorAlert.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  templatesAssociatedDevices: PropTypes.array.isRequired,
  deletedTemplates: PropTypes.array.isRequired,
};

export default DeleteMultipleTemplatesErrorAlert;
