import React, { useEffect } from 'react';

import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../../../redux/modules/errors';
import { errorsSelector } from '../../../redux/selectors/errorsSelector';

const GlobalErrorToasts = () => {
  const { t } = useTranslation('error');
  const dispatch = useDispatch();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const errors = useSelector(errorsSelector);

  useEffect(() => {
    Object.values(errors).forEach(error => {
      const errorMessage = error.i18nMessage ? t(`messages.${error.i18nMessage}`) : error.message;

      const handleRemoveError = () => {
        dispatch(actions.removeError(error.id));
      };

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

      // After passing the control to notistack the errors can be safely removed
      // from the redux store
      handleRemoveError();
    });
  }, [closeSnackbar, dispatch, enqueueSnackbar, errors, t]);

  return null;
};

export default GlobalErrorToasts;
