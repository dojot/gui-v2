import React from 'react';

import { Box, TextField, Typography, Button } from '@material-ui/core';
import { CollapsibleList } from 'Components/CollapsibleList';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import GeneratedCertificateResume from './GeneratedCertificateResume';
import useStyles from './style';

const CreateCertificateCA = ({
  isShowing,
  certificateData,
  handleToggleContent,
  handleRegisterExternalCertificate,
  certificateChain,
  handleChangeCertificateChain,
}) => {
  const classes = useStyles();
  const { t } = useTranslation('createCertificate');

  const handleSubmit = e => {
    e.preventDefault();
    handleRegisterExternalCertificate();
  };

  const handleSaveWithKeyboard = e => {
    if (!certificateChain) return;
    const event = e.nativeEvent;
    const isEnterKey = event.key === 'Enter';
    const isPressingAltOrCtrl = event.ctrlKey || event.altKey;
    if (isEnterKey && isPressingAltOrCtrl) handleRegisterExternalCertificate();
  };

  return (
    <CollapsibleList
      title={t('createCertificateCA.title')}
      subtitle={t('createCertificateCA.subTitle')}
      isContentVisible={isShowing}
      canToggleContent={!certificateData}
      disabled={!!certificateData && !isShowing}
      handleToggleContent={handleToggleContent}
    >
      {!certificateData ? (
        <Box padding={4} component='form' onSubmit={handleSubmit} noValidate>
          <Box mb={2}>
            <Typography>{t('createCertificateCA.inputDataLabel')}</Typography>
          </Box>

          <TextField
            rows={10}
            variant='outlined'
            value={certificateChain}
            onKeyDown={handleSaveWithKeyboard}
            onChange={handleChangeCertificateChain}
            placeholder={t('createCertificateCA.inputPlaceholder')}
            multiline
            fullWidth
          />

          <Typography align='right'>
            <Button
              className={classes.generateCertificateButton}
              disabled={!certificateChain}
              variant='outlined'
              color='primary'
              type='submit'
            >
              {t('createCertificateCA.generateCertificate')}
            </Button>
          </Typography>
        </Box>
      ) : (
        <Box padding={4}>
          <GeneratedCertificateResume certificateData={certificateData} />
        </Box>
      )}
    </CollapsibleList>
  );
};

CreateCertificateCA.propTypes = {
  isShowing: PropTypes.bool,
  certificateData: PropTypes.object,
  handleToggleContent: PropTypes.func,
  handleRegisterExternalCertificate: PropTypes.func,
  certificateChain: PropTypes.string,
  handleChangeCertificateChain: PropTypes.func,
};

CreateCertificateCA.defaultProps = {
  isShowing: false,
  certificateData: null,
  handleToggleContent: null,
  handleRegisterExternalCertificate: null,
  certificateChain: '',
  handleChangeCertificateChain: null,
};

export default CreateCertificateCA;
