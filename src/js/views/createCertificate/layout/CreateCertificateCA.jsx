import React, { useState } from 'react';

import { Box, TextField, Typography, Button } from '@material-ui/core';
import { CollapsibleList } from 'Components/CollapsibleList';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import GeneratedCertificateResume from './GeneratedCertificateResume';
import useStyles from './style';

const CreateCertificateCA = ({
  isShowing,
  handleToggleContent,
  certificateData,
  handleRegisterExternalCertificate,
}) => {
  const classes = useStyles();
  const { t } = useTranslation('createCertificate');

  const [certificateChain, setCertificateChain] = useState('');

  return (
    <CollapsibleList
      title={t('createCertificateCA.title')}
      subtitle={t('createCertificateCA.subTitle')}
      isContentVisible={isShowing}
      handleToggleContent={handleToggleContent}
      isCaptionHighlighted
      disabled={!!certificateData && !isShowing}
      canToggleContent={!certificateData}
    >
      {!certificateData ? (
        <Box padding={4}>
          <Typography>{t('createCertificateCA.inputDataLabel')}</Typography>

          <TextField
            value={certificateChain}
            onChange={e => setCertificateChain(e.target.value)}
            placeholder={t('createCertificateCA.inputPlaceholder')}
            multiline
            rows={10}
            variant='outlined'
            fullWidth
          />

          <Typography align='right'>
            <Button
              onClick={handleRegisterExternalCertificate(certificateChain)}
              className={classes.generateCertificateButton}
              variant='outlined'
              color='primary'
              disabled={!certificateChain}
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
  handleToggleContent: PropTypes.func,
  certificateData: PropTypes.object,
  handleRegisterExternalCertificate: PropTypes.func,
};

CreateCertificateCA.defaultProps = {
  isShowing: false,
  handleToggleContent: null,
  certificateData: null,
  handleRegisterExternalCertificate: null,
};

export default CreateCertificateCA;
