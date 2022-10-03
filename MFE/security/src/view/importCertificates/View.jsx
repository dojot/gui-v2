import React, { useMemo, useState } from 'react';

import { Box, Button, TextField, Typography } from '@material-ui/core';
import { Publish } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { AlertDialog } from 'sharedComponents/Dialogs';
import { useIsLoading, dispatchEvent } from 'sharedComponents/Hooks';
import { EVENT } from 'sharedComponents/Constants';
// import { dispatchEvent } from 'Hooks';
import { actions, constants } from '../../redux/modules/certificates';
import { ViewContainer } from 'sharedComponents/Containers';
import ActionButtons from './layout/ActionButtons';
import useStyles from './style';

const ImportCertificates = () => {
  const { t } = useTranslation(['importCertificates', 'common']);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [isShowingCancelModal, setIsShowingCancelModal] = useState(false);
  const [caRoot, setCaRoot] = useState({
    inputValue: '',
    file: null,
  });
  const [certificates, setCertificates] = useState({
    inputValue: '',
    files: null,
  });

  const canSave = useMemo(() => {
    return !!caRoot.file && !!certificates.files;
  }, [caRoot.file, certificates.files]);

  const isLoading = useIsLoading(constants.IMPORT_CERTIFICATES_IN_BATCH);

  const handleCancelCertificatesCreation = () => {
    setIsShowingCancelModal(true);
  };

  const handleHideCancelModal = () => {
    setIsShowingCancelModal(false);
  };

  const handleGoToCertificates = () => {
    history.push('/certificates');
  };

  const handleSaveImportCertificatesInBatch = () => {
    dispatch(
      actions.importCertificatesInBatch({
        caRoot: caRoot.file,
        certificates: certificates.files,
        successCallback: handleGoToCertificates,
      }),
    );
  };

  const handleChangeCaRootFile = e => {
    const file = e.target.files[0];

    setCaRoot({ inputValue: file.name, file: file });
  };

  const handleChangeCertificatesFiles = e => {
    const files = Object.values(e.target.files);

    if (files.length > 999) {
      setCertificates({ inputValue: '', certificates: [] });
      dispatchEvent(EVENT.GLOBAL_TOAST, {
        duration: 15000,
        i18nMessage: 'maxNumberFiles',
        type: 'warning',
      });
    } else {
      const filesNames = files.map(file => `${file.name}\n`);

      setCertificates({
        files: files,
        inputValue: filesNames.join(''),
      });
    }
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
        handleConfirm={handleGoToCertificates}
        handleClose={handleHideCancelModal}
      />

      <Box className={classes.container}>
        <div className={classes.content}>
          <Box marginY={4}>
            <Typography className={classes.formTitle}>{t('formTitle')}</Typography>
          </Box>

          <Box className={classes.caRootWrapper} marginBottom={4}>
            <Typography>{t('caRootInputTitle')}</Typography>

            <Box>
              <TextField
                label={t('caRootInputPh')}
                value={caRoot.inputValue}
                variant='outlined'
                disabled
              />
            </Box>

            <Box>
              <input
                id='ca-root-file'
                type='file'
                accept='.pem'
                style={{ display: 'none' }}
                onChange={handleChangeCaRootFile}
              />

              <Box>
                <label htmlFor='ca-root-file'>
                  <Button
                    startIcon={<Publish />}
                    color='inherit'
                    variant='outlined'
                    size='small'
                    component='span'
                  >
                    {t('importFile')}
                  </Button>
                </label>
              </Box>
            </Box>
          </Box>

          <Box className={classes.certificatesWrapper} marginBottom={4}>
            <Typography>{t('certificatesInputTitle')}</Typography>

            <TextField
              label={t('certificatesInputPh')}
              multiline
              rows={8}
              value={certificates.inputValue}
              variant='outlined'
              fullWidth
              disabled
            />

            <Box>
              <input
                id='certificates-files'
                type='file'
                accept='.crt'
                style={{ display: 'none' }}
                onChange={handleChangeCertificatesFiles}
                multiple
              />

              <Box>
                <label htmlFor='certificates-files'>
                  <Button
                    startIcon={<Publish />}
                    color='inherit'
                    variant='outlined'
                    size='small'
                    component='span'
                  >
                    {t('importFile')}
                  </Button>
                </label>
              </Box>
            </Box>
          </Box>
        </div>

        <Box className={classes.actionButtonsWrapper}>
          <ActionButtons
            handleClickNextButton={handleSaveImportCertificatesInBatch}
            handleClickCancelButton={handleCancelCertificatesCreation}
            isNextButtonDisabled={isLoading || !canSave}
            isCancelButtonDisabled={isLoading}
          />
        </Box>
      </Box>
    </ViewContainer>
  );
};

export default ImportCertificates;
