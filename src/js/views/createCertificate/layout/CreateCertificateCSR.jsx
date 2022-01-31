import React, { useState } from 'react';

import { Box, Collapse, Typography, TextField, Button } from '@material-ui/core';
import { CollapsibleList } from 'Components/CollapsibleList';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import GeneratedCertificateResume from './GeneratedCertificateResume';
import useStyles from './style';

const CreateCertificateCSR = ({
  csrPEM,
  isShowing,
  certificateData,
  handleChangeCsrPEM,
  handleToggleContent,
  handleCreateCertificateCSR,
}) => {
  const { t } = useTranslation('createCertificate');
  const classes = useStyles();

  const [csrHelp, setCsrHelp] = useState(false);

  const handleToggleCsrHelp = () => {
    setCsrHelp(!csrHelp);
  };

  return (
    <CollapsibleList
      title={t('createCertificateCSR.title')}
      subtitle={t('createCertificateCSR.subTitle')}
      isContentVisible={isShowing}
      canToggleContent={!certificateData}
      disabled={!!certificateData && !isShowing}
      handleToggleContent={handleToggleContent}
    >
      {!certificateData ? (
        <Box padding={4}>
          <Typography
            className={classes.csrHelpLink}
            cursor='pointer'
            align='right'
            onClick={handleToggleCsrHelp}
          >
            {t('createCertificateCSR.generateCsrHelp')}
          </Typography>

          <Collapse in={csrHelp}>
            <Box mb={2}>
              <Typography>
                <b>{t('createCertificateCSR.csrHelpSteps.step1')}</b>
                <u>{t('createCertificateCSR.csrHelpSteps.step1Text')}</u>
              </Typography>

              <Typography>
                <b>{t('createCertificateCSR.csrHelpSteps.step2')}</b>
                {t('createCertificateCSR.csrHelpSteps.step2Text')}
              </Typography>
            </Box>
          </Collapse>

          <TextField
            value={csrPEM}
            variant='outlined'
            onChange={handleChangeCsrPEM}
            label={t('createCertificateCSR.inputPlaceholder')}
            rows={10}
            multiline
            fullWidth
          />

          <Typography align='right'>
            <Button
              onClick={handleCreateCertificateCSR}
              className={classes.generateCertificateButton}
              disabled={!csrPEM}
              variant='outlined'
              color='primary'
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
  csrPEM: PropTypes.string,
  isShowing: PropTypes.bool,
  certificateData: PropTypes.object,
  handleChangeCsrPEM: PropTypes.func,
  handleToggleContent: PropTypes.func,
  handleCreateCertificateCSR: PropTypes.func,
};

CreateCertificateCSR.defaultProps = {
  csrPEM: '',
  isShowing: false,
  certificateData: null,
  handleChangeCsrPEM: null,
  handleToggleContent: null,
  handleCreateCertificateCSR: null,
};

export default CreateCertificateCSR;
