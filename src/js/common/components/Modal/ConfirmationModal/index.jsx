import React from 'react';

import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  deleteButton: {
    color: theme.palette.error.main,
  },
  breakLine: {
    whiteSpace: 'pre-wrap',
  },
}));

const ConfirmationModal = ({ open, onClose, callback }) => {
  const handleClose = () => {
    onClose(false);
  };

  const handleCallback = () => {
    callback();
    onClose(false);
  };

  const classes = useStyles();

  const { t } = useTranslation(['modal', 'common']);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{t('modal:title')}</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.breakLine} id='alert-dialog-description'>
          {t('modal:info_text')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          {t('common:cancel')}
        </Button>
        <Button onClick={handleCallback} className={classes.deleteButton} autoFocus>
          {t('common:delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;

ConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,
};
