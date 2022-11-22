import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
} from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useReportErrorAlert } from './style';
import { useTranslation } from 'react-i18next';

const ReportErrorAlert = ({ isOpen, handleClose }) => {
  const classes = useReportErrorAlert();
  const { t } = useTranslation(['myReports', 'common']);

  return (
    <Dialog fullWidth maxWidth='sm' open={isOpen} onClose={handleClose}>
      <DialogTitle className={classes.dialogTitle} id='alert-dialog-title'>
        <Cancel className={classes.icon} />
      </DialogTitle>

      <DialogContent className={classes.dialogContent}>
        <Typography variant='h6'>{t('reportErrorAlertMessage')}</Typography>
      </DialogContent>

      <DialogActions className={classes.dialogActions}>
        <Button color='inherit' className={classes.cancelButton} onClick={handleClose}>
          {t('common:ok')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ReportErrorAlert.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ReportErrorAlert;
