import React from 'react';

import { Link, Typography, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { downloadTextFile } from '../../../common/utils';
import useStyles from './style';

const GeneratedCertificateResume = ({ certificateData }) => {
  const { t } = useTranslation(['createCertificate', 'common']);
  const classes = useStyles();

  return (
    <Box marginBottom={2}>
      <Box marginBottom={3}>
        <Box component='span' marginRight={1}>
          <Typography component='span'>
            {t('generatedCertificateResume.certificateAndKeysTitle')}
          </Typography>
        </Box>
      </Box>

      {!!certificateData?.certificatePem && (
        <Box className={classes.certificateData}>
          <Typography>{t('generatedCertificateResume.certificate')}</Typography>
          <Link
            href='_'
            component='button'
            onClick={() => downloadTextFile('certificate.pem', certificateData.certificatePem)}
          >
            {t('common:download')}
          </Link>
        </Box>
      )}

      {!!certificateData?.privateKeyPEM && (
        <Box className={classes.certificateData}>
          <Typography>{t('generatedCertificateResume.privateKey')}</Typography>
          <Link
            href='_'
            component='button'
            onClick={() => downloadTextFile('privateKey.pem', certificateData.privateKeyPEM)}
          >
            {t('common:download')}
          </Link>
        </Box>
      )}

      {!!certificateData?.publicKeyPEM && (
        <Box className={classes.certificateData}>
          <Typography>{t('generatedCertificateResume.publicKey')}</Typography>
          <Link
            href='_'
            component='button'
            onClick={() => downloadTextFile('publicKey.pem', certificateData.publicKeyPEM)}
          >
            {t('common:download')}
          </Link>
        </Box>
      )}

      {!!certificateData?.caCertificate && (
        <Box className={classes.certificateData}>
          <Typography>{t('generatedCertificateResume.caCertificate')}</Typography>
          <Link
            href='_'
            component='button'
            onClick={() => downloadTextFile('ca.pem', certificateData.caPem)}
          >
            {t('common:download')}
          </Link>
        </Box>
      )}
    </Box>
  );
};

GeneratedCertificateResume.propTypes = {
  certificateData: PropTypes.object,
};

GeneratedCertificateResume.defaultProps = {
  certificateData: null,
};

export default GeneratedCertificateResume;
