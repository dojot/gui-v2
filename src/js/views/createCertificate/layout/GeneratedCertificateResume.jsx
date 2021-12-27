import React from 'react';

import { AccordionDetails, Typography, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import useStyles from './style';

function GeneratedCertificateResume({ data }) {
  const classes = useStyles();
  const { t } = useTranslation('createCertificate');

  return (
    <AccordionDetails className={classes.createCertificateOneClick}>
      <Typography>{t('generatedCertificateResume.downloadFilesMessage')}</Typography>
      <Box className={classes.filesWrapper}>
        <Box>
          <Typography>{t('generatedCertificateResume.certificate')}</Typography>
          <Typography>{t('generatedCertificateResume.privateKey')}</Typography>
          <Typography>{t('generatedCertificateResume.publicKey')}</Typography>
          <Typography>{t('generatedCertificateResume.caCertificate')}</Typography>
        </Box>

        <Box>
          <Typography className={classes.textLink}>{data?.certificate}</Typography>
          <Typography className={classes.textLink}>{data?.privateKey}</Typography>
          <Typography className={classes.textLink}>{data?.publicKey}</Typography>
          <Typography className={classes.textLink}>{data?.caCertificate}</Typography>
        </Box>
      </Box>
    </AccordionDetails>
  );
}

export default GeneratedCertificateResume;
