import React, { useMemo, useState } from 'react';

import { Box, TextField, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { AlertDialog } from 'sharedComponents/Dialogs';
import { useIsLoading } from 'sharedComponents/Hooks';
import { actions, constants } from '../../redux/modules/certificationAuthorities';
import { ViewContainer } from 'sharedComponents/Containers';
import useStyles from './style';

const CreateCertificationAuthority = () => {
  const { t } = useTranslation(['createCertificationAuthority', 'common']);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [caPem, setCaPem] = useState('');
  const [isShowingCancelModal, setIsShowingCancelModal] = useState(false);

  const canSave = useMemo(() => {
    return !!caPem;
  }, [caPem]);

  const isSaving = useIsLoading(constants.CREATE_CERTIFICATION_AUTHORITY);

  const handleChangeValue = setValueFn => {
    return e => setValueFn(e.target.value);
  };

  const handleLeaveCertificationAuthorityCreation = () => {
    setIsShowingCancelModal(true);
  };

  const handleHideCancelModal = () => {
    setIsShowingCancelModal(false);
  };

  const handleGoBack = () => {
    if (history.length) history.goBack();
    else history.push('/certification-authorities');
  };

  const handleSaveCertificationAuthority = () => {
    dispatch(
      actions.createCertificationAuthority({
        caPem,
        successCallback: handleGoBack,
      }),
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleSaveCertificationAuthority();
  };

  const handleSaveWithKeyboard = e => {
    if (!canSave) return;
    const event = e.nativeEvent;
    const isEnterKey = event.key === 'Enter';
    const isPressingAltOrCtrl = event.ctrlKey || event.altKey;
    if (isEnterKey && isPressingAltOrCtrl) handleSaveCertificationAuthority();
  };

  return (
    <ViewContainer headerTitle={t('title')}>
      <AlertDialog
        isOpen={isShowingCancelModal}
        cancelButtonText={t('common:no')}
        autoFocusConfirmationButton={false}
        title={t('cancelCaCreationTitle')}
        confirmButtonText={t('common:yesImSure')}
        message={t('cancelCaCreationMessage')}
        handleConfirm={handleGoBack}
        handleClose={handleHideCancelModal}
      />

      <Box className={classes.container}>
        <form className={classes.content} noValidate onSubmit={handleSubmit}>
          <TextField
            label={t('caPemLabel')}
            variant='outlined'
            value={caPem}
            rows={20}
            onKeyDown={handleSaveWithKeyboard}
            onChange={handleChangeValue(setCaPem)}
            multiline
            fullWidth
          />

          <Box className={classes.bottomButtonsWrapper}>
            <Button
              className={classes.saveButton}
              disabled={isSaving || !canSave}
              variant='contained'
              color='primary'
              type='submit'
              size='large'
            >
              {t('common:save')}
            </Button>

            <Button size='large' onClick={handleLeaveCertificationAuthorityCreation}>
              {t('common:cancel')}
            </Button>
          </Box>
        </form>
      </Box>
    </ViewContainer>
  );
};

export default CreateCertificationAuthority;
