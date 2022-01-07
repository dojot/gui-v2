import React from 'react';

import { Link, Typography, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import useStyles from './style';

function GeneratedCertificateResume({ certificateData }) {
  const classes = useStyles();
  const { t } = useTranslation(['createCertificate', 'common']);

  const download = (filename, text) => {
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  return (
    <Box marginBottom={3}>
      <Box marginBottom={3}>
        <Box component='span' marginRight={1}>
          <Typography component='span'>
            {t('generatedCertificateResume.certificateAndKeysTitle')}
          </Typography>
        </Box>
      </Box>

      {certificateData?.certificatePem && (
        <Box className={classes.certificateData}>
          <Typography>{t('generatedCertificateResume.certificate')}</Typography>
          <Link
            href='https://www.google.com'
            component='button'
            onClick={() => download('certificate.pem', certificateData.pem)}
          >
            {t('common:download')}
          </Link>
        </Box>
      )}

      {certificateData?.privateKeyPEM && (
        <Box className={classes.certificateData}>
          <Typography>{t('generatedCertificateResume.privateKey')}</Typography>
          <Link
            href='https://www.google.com'
            component='button'
            onClick={() => download('privateKey.pem', certificateData.privateKeyPEM)}
          >
            {t('common:download')}
          </Link>
        </Box>
      )}

      {certificateData?.publicKeyPEM && (
        <Box className={classes.certificateData}>
          <Typography>{t('generatedCertificateResume.publicKey')}</Typography>
          <Link
            href='https://www.google.com'
            component='button'
            onClick={() => download('publicKey.pem', certificateData.publicKeyPEM)}
          >
            {t('common:download')}
          </Link>
        </Box>
      )}

      {certificateData?.caCertificate && (
        <Box className={classes.certificateData}>
          <Typography>{t('generatedCertificateResume.caCertificate')}</Typography>
          <Link
            href='https://www.google.com'
            component='button'
            onClick={() => download('ca.pem', certificateData.caPem)}
          >
            {t('common:download')}
          </Link>
        </Box>
      )}
    </Box>
  );
}

export default GeneratedCertificateResume;
