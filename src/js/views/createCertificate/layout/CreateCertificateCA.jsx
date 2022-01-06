import React, { useState } from 'react';

import { Box, TextField, Typography, Button } from '@material-ui/core';
import { CollapsibleList } from 'Components/CollapsibleList';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';

import GeneratedCertificateResume from './GeneratedCertificateResume';
import useStyles from './style';

const CreateCertificateCA = ({
  isGeneratedCertificate,
  isShowing,
  handleToggleContent,
  certificateData,
}) => {
  const classes = useStyles();
  const { t } = useTranslation('createCertificate');

  const [caPEM, setCaPEM] = useState('');

  return (
    <CollapsibleList
      title={t('createCertificateCA.title')}
      subtitle={t('createCertificateCA.subTitle')}
      isContentVisible={isShowing}
      handleToggleContent={handleToggleContent}
      isCaptionHighlighted
      disabled={certificateData}
    >
      {!isGeneratedCertificate ? (
        <Box padding={4}>
          <Typography marginBottom={3}>{t('createCertificateCA.inputDataLabel')}</Typography>

          <TextField
            value={caPEM}
            onChange={e => setCaPEM(e.target.value)}
            placeholder={t('createCertificateCA.inputPlaceholder')}
            multiline
            rows={10}
            variant='outlined'
            fullWidth
            marginBottom={3}
          />

          <Typography align='right'>
            <Button
              // onClick={generateCertificate}
              className={classes.generateCertificateButton}
              variant='text'
              color='primary'
              disabled={!caPEM}
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
  isGeneratedCertificate: PropTypes.bool,
  isShowing: PropTypes.bool,
  handleToggleContent: PropTypes.func,
};

CreateCertificateCA.defaultProps = {
  isGeneratedCertificate: false,
  isShowing: false,
  handleToggleContent: null,
};

export default CreateCertificateCA;
