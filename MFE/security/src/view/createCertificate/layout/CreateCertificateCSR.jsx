import React, { useState } from 'react';

import { Box, Collapse, Typography, TextField, Button, Input } from '@material-ui/core';
import { CollapsibleList } from 'sharedComponents/CollapsibleList';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { CopyTextToClipboardButton } from 'sharedComponents/CopyTextToClipboardButton';
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

  const handleSubmit = e => {
    e.preventDefault();
    handleCreateCertificateCSR();
  };

  const handleSaveWithKeyboard = e => {
    if (!csrPEM) return;
    const event = e.nativeEvent;
    const isEnterKey = event.key === 'Enter';
    const isPressingAltOrCtrl = event.ctrlKey || event.altKey;
    if (isEnterKey && isPressingAltOrCtrl) handleCreateCertificateCSR();
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
        <Box padding={4} component='form' onSubmit={handleSubmit} noValidate>
          <Typography
            className={classes.csrHelpLink}
            cursor='pointer'
            align='right'
            onClick={handleToggleCsrHelp}
          >
            {t('createCertificateCSR.generateCsrHelp')}
          </Typography>

          <Collapse in={csrHelp}>
            <Box className={classes.csrHelpSteps}>
              <Box display='flex' alignItems='center'>
                <Typography>
                  <b>{t('createCertificateCSR.csrHelpSteps.step1')}</b>{' '}
                  {t('createCertificateCSR.csrHelpSteps.runTheCommand')}
                </Typography>
                <Input
                  value={t('createCertificateCSR.csrHelpSteps.generateCsrCommand')}
                  className={classes.inputCommand}
                  readOnly
                />
                <CopyTextToClipboardButton
                  textToCopy={t('createCertificateCSR.csrHelpSteps.generateCsrCommand')}
                />
              </Box>

              <Box display='flex' alignItems='center' marginTop={1}>
                <Typography>
                  <b>{t('createCertificateCSR.csrHelpSteps.step2')}</b>{' '}
                  {t('createCertificateCSR.csrHelpSteps.step2Text')}
                </Typography>
              </Box>
            </Box>
          </Collapse>

          <TextField
            value={csrPEM}
            variant='outlined'
            onChange={handleChangeCsrPEM}
            onKeyDown={handleSaveWithKeyboard}
            label={t('createCertificateCSR.inputPlaceholder')}
            rows={10}
            multiline
            fullWidth
            required
          />

          <Typography align='right'>
            <Button
              className={classes.generateCertificateButton}
              variant='outlined'
              disabled={!csrPEM}
              color='secondary'
              type='submit'
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
