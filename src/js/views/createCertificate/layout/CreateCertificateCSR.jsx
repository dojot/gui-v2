import React, { useState } from 'react';

import { Box, Collapse, Typography, TextField, Button } from '@material-ui/core';
import { CollapsibleList } from 'Components/CollapsibleList';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import GeneratedCertificateResume from './GeneratedCertificateResume';
import useStyles from './style';

const CreateCertificateCSR = ({
  handleCreateCertificateCSR,
  isShowing,
  handleToggleContent,
  certificateData,
}) => {
  const { t } = useTranslation('createCertificate');
  const classes = useStyles();
  const [csrHelp, setCsrHelp] = useState(false);
  const [csrPEM, setCsrPEM] = useState('');

  const toggleCsrHelp = () => setCsrHelp(!csrHelp);

  const handleChangeText = e => {
    setCsrPEM(e.target.value);
  };

  return (
    <CollapsibleList
      title={t('createCertificateCSR.title')}
      subtitle={t('createCertificateCSR.subTitle')}
      isContentVisible={isShowing}
      handleToggleContent={handleToggleContent}
      isCaptionHighlighted
      disabled={!!certificateData && !isShowing}
      canToggleContent={!certificateData}
    >
      {!certificateData ? (
        <Box padding={4}>
          <Typography
            onClick={toggleCsrHelp}
            align='right'
            cursor='pointer'
            className={classes.csrHelpLink}
          >
            {t('createCertificateCSR.generateCsrHelp')}
          </Typography>
          <Collapse in={csrHelp}>
            <Typography>
              <b>{t('createCertificateCSR.csrHelpSteps.step1')}</b>
              <u>{t('createCertificateCSR.csrHelpSteps.step1Text')}</u>
            </Typography>
            <Typography>
              <b>{t('createCertificateCSR.csrHelpSteps.step2')}</b>
              {t('createCertificateCSR.csrHelpSteps.step2Text')}
            </Typography>
          </Collapse>
          <TextField
            value={csrPEM}
            onChange={handleChangeText}
            placeholder={t('createCertificateCSR.inputPlaceholder')}
            multiline
            rows={10}
            variant='outlined'
            fullWidth
          />
          <Typography align='right'>
            <Button
              onClick={handleCreateCertificateCSR(csrPEM)}
              className={classes.generateCertificateButton}
              variant='outlined'
              color='primary'
              disabled={!csrPEM}
            >
              {t('createCertificateCSR.generateCertificate')}
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

CreateCertificateCSR.propTypes = {
  handleCreateCertificateCSR: PropTypes.func,
  isShowing: PropTypes.bool,
  handleToggleContent: PropTypes.func,
  certificateData: PropTypes.object,
};

CreateCertificateCSR.defaultProps = {
  handleCreateCertificateCSR: null,
  isShowing: false,
  handleToggleContent: null,
  certificateData: null,
};

export default CreateCertificateCSR;
