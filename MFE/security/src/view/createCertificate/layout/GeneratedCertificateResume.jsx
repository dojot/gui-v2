import React from 'react';

import { Link, Typography, Box } from '@material-ui/core';
import { CloudDownloadTwoTone, Warning } from '@material-ui/icons';
import PropTypes from 'prop-types';
import b64ToBlob from 'b64-to-blob';
import fileSaver from 'file-saver';
import { Trans, useTranslation } from 'react-i18next';

import useStyles from './style';

const GeneratedCertificateResume = ({ certificateData }) => {
  const { t } = useTranslation(['createCertificate', 'common']);
  const classes = useStyles();

  const downloadCertificateAndKeys = () => {
    const blob = b64ToBlob(certificateData.certAndKeysAs64, 'application/zip');
    fileSaver.saveAs(blob, `${t('generatedCertificateResume.certificateAndKeys')}.zip`);
  };

  return (
    <Box marginBottom={2}>
      <Box marginBottom={3}>
        <Box
          component='span'
          className={classes.certificateAndKeysTitle}
          marginRight={1}
          display='flex'
          alignItems='center'
          flexGap
        >
          <Warning className={classes.warningIcon} />
          <Typography component='span'>
            <Trans t={t} i18nKey='generatedCertificateResume.certificateAndKeysTitle' />
          </Typography>
        </Box>
      </Box>

      <Link
        className={classes.certificateData}
        href='_'
        component='button'
        onClick={() => downloadCertificateAndKeys()}
      >
        <CloudDownloadTwoTone />
        <strong>{t('generatedCertificateResume.certificateAndKeys')}.zip</strong>
      </Link>
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
