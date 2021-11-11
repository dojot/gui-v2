import React from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { ErrorDialog } from '../../../common/components/Dialogs';
import { actions } from '../../../redux/modules/errors';
import { errorsSelector } from '../../../redux/selectors/errorsSelector';

const GlobalErrorModal = () => {
  const { t } = useTranslation('error');
  const dispatch = useDispatch();

  const errors = useSelector(errorsSelector);

  return (
    <>
      {Object.values(errors).map(error => {
        const errorMessage = error.i18nMessage ? t(`messages.${error.i18nMessage}`) : error.message;

        const handleRemoveError = () => {
          dispatch(actions.removeError(error.id));
        };

        return (
          <ErrorDialog
            key={error.id}
            message={errorMessage}
            title={t('errorModal.title')}
            closeButtonText={t('errorModal.closeButton')}
            handleClose={handleRemoveError}
            isOpen
          />
        );
      })}
    </>
  );
};

export default GlobalErrorModal;
