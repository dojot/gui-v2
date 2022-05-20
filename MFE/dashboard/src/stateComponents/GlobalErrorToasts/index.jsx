import React, { useEffect } from 'react';

import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

const ToastHandler = ({ detail }) => {
  const { t } = useTranslation('error');

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { errors } = detail;

  Object.values(errors).forEach(error => {
    const errorMessage = error.i18nMessage ? t(`messages.${error.i18nMessage}`) : error.message;

    enqueueSnackbar(errorMessage, {
      variant: 'error',
      persist: !error.duration, // Use Falsy values to persist (zero, null, undefined)
      action(snackBarKey) {
        const handleCloseSnackbarAndRemoveError = () => {
          closeSnackbar(snackBarKey);
        };

        return (
          <IconButton onClick={handleCloseSnackbarAndRemoveError} color='inherit' size='small'>
            <Close />
          </IconButton>
        );
      },
    });
  });

  return null;
};

const GlobalErrorToasts = () => {
  useEffect(() => {
    window.addEventListener("@Dojot/GLOBAL_TOAST" , ToastHandler);
    return () => window.removeEventListener("@Dojot/GLOBAL_TOAST", ToastHandler, false);
  }, []);
};

export default GlobalErrorToasts;
