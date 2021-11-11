import React from 'react';

import { Slide, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../../../redux/modules/success';
import { successToastSelector } from '../../../redux/selectors/successSelector';

const GlobalSuccessToast = () => {
  const { t } = useTranslation('success');
  const dispatch = useDispatch();

  const successToast = useSelector(successToastSelector);
  const autoHideDuration = successToast.duration > 0 ? successToast.duration : null;
  const toastMessage = successToast.i18nMessage ? t(`messages.${successToast.i18nMessage}`) : null;

  const handleHideSuccessToast = () => {
    dispatch(actions.hideSuccessToast());
  };

  return (
    <Snackbar
      TransitionComponent={Slide}
      open={successToast.isShowing}
      onClose={handleHideSuccessToast}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        elevation={2}
        variant='filled'
        severity='success'
        style={{ minWidth: '20rem' }}
        onClose={handleHideSuccessToast}
        closeText={t('closeToastText')}
      >
        {toastMessage}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSuccessToast;
