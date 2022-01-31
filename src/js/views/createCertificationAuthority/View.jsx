import React, { useMemo, useState } from 'react';

import { Box, TextField, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { AlertDialog } from '../../common/components/Dialogs';
import { useIsLoading } from '../../common/hooks';
import { actions, constants } from '../../redux/modules/certificationAuthorities';
import { ViewContainer } from '../stateComponents';
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

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      actions.createCertificationAuthority({
        caPem,
        successCallback: handleGoBack,
      }),
    );
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
            onChange={handleChangeValue(setCaPem)}
            multiline
            fullWidth
          />

          <Box className={classes.bottomButtonsWrapper}>
            <Button size='large' onClick={handleLeaveCertificationAuthorityCreation}>
              {t('common:cancel')}
            </Button>

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
          </Box>
        </form>
      </Box>
    </ViewContainer>
  );
};

export default CreateCertificationAuthority;
