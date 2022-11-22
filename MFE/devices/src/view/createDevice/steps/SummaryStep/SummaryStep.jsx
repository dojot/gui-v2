import React from 'react';

import {
  Box,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { Close, Warning, CloudDownloadTwoTone } from '@material-ui/icons';
import PropTypes from 'prop-types';
import b64ToBlob from 'b64-to-blob';
import fileSaver from 'file-saver';
import { Trans, useTranslation } from 'react-i18next';

import { downloadTextFile } from 'sharedComponents/Utils';
import ActionButtons from '../../layout/ActionButtons';
import { useSummaryStepStyles } from './style';

const SummaryStep = ({
  deviceName,
  isDisabled,
  isCreatingDevice,
  selectedTemplates,
  selectedCertificate,
  setDeviceName,
  handleCreateService,
  handleToggleDisabled,
  handleGoToPreviousStep,
  handleCancelDeviceCreation,
}) => {
  const { t } = useTranslation(['createDevice', 'common']);
  const classes = useSummaryStepStyles();

  const handleClearDeviceName = () => {
    setDeviceName('');
  };

  const downloadCertificateAndKeys = () => {
    const blob = b64ToBlob(selectedCertificate.certificateAndKeys, 'application/zip');
    fileSaver.saveAs(blob, `${t('summaryStep.certificateAndKeys')}.zip`);
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        <Box marginBottom={3}>
          <Typography>
            <strong>{t('summaryStep.title')}</strong>
          </Typography>

          <Typography variant='body2'>
            <i>{t('summaryStep.hint')}</i>
          </Typography>
        </Box>

        <Box marginBottom={3}>
          <Box marginBottom={1.5}>
            <Typography className={classes.deviceNameHint}>
              <Trans t={t} i18nKey='summaryStep.deviceNameHint' />
            </Typography>
          </Box>

          <TextField
            variant='outlined'
            value={deviceName}
            label={t('summaryStep.deviceNamePh')}
            onChange={e => setDeviceName(e.target.value)}
            InputProps={{
              endAdornment: deviceName ? (
                <InputAdornment position='end'>
                  <IconButton onClick={handleClearDeviceName}>
                    <Close />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
            required
            fullWidth
          />
        </Box>

        <Box marginBottom={3}>
          <FormControlLabel
            label={t('summaryStep.disabledCheckboxLabel')}
            control={
              <Checkbox checked={isDisabled} onChange={handleToggleDisabled} color='primary' />
            }
          />
        </Box>

        <Box marginBottom={3}>
          <Box marginBottom={1}>
            <Typography>
              <strong>{t('summaryStep.templatesListTitle')}</strong>
            </Typography>
          </Box>

          {Object.values(selectedTemplates).map(template => {
            return <Typography key={template.id}>{template.label}</Typography>;
          })}
        </Box>

        {Object.keys(selectedCertificate).length > 0 && (
          <Box marginBottom={3}>
            <Box marginBottom={3} display='flex' flexDirection='column'>
              <Box component='span' marginRight={1}>
                <Typography component='span'>
                  <strong>{t('summaryStep.certificateAndKeysTitle')}</strong>
                </Typography>
              </Box>

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
                  <Trans t={t} i18nKey='summaryStep.certificateAndKeysWarning' />
                </Typography>
              </Box>
            </Box>

            {!!selectedCertificate.certificateAndKeys && (
              <Box>
                <Link
                  className={classes.certificateData}
                  href='_'
                  component='button'
                  onClick={() => downloadCertificateAndKeys()}
                >
                  <CloudDownloadTwoTone />
                  <strong>{t('summaryStep.certificateAndKeys')}.zip</strong>
                </Link>
              </Box>
            )}

            {!!selectedCertificate.pem && (
              <Box>
                <Link
                  className={classes.certificateData}
                  href='_'
                  tabIndex={0}
                  component='button'
                  onClick={() =>
                    downloadTextFile(`${t('summaryStep.certificate')}.pem`, selectedCertificate.pem)
                  }
                >
                  <CloudDownloadTwoTone />
                  <strong> {t('summaryStep.certificate')}.pem</strong>
                </Link>
              </Box>
            )}
          </Box>
        )}
      </Box>

      <ActionButtons
        isBackButtonDisabled={isCreatingDevice}
        isCancelButtonDisabled={isCreatingDevice}
        isNextButtonDisabled={isCreatingDevice || !deviceName.trim()}
        handleClickNextButton={handleCreateService}
        handleClickBackButton={handleGoToPreviousStep}
        handleClickCancelButton={handleCancelDeviceCreation}
        isLastStep
        withBackButton
      />
    </Box>
  );
};

SummaryStep.propTypes = {
  deviceName: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isCreatingDevice: PropTypes.bool.isRequired,
  selectedTemplates: PropTypes.object.isRequired,
  setDeviceName: PropTypes.func.isRequired,
  handleCreateService: PropTypes.func.isRequired,
  handleToggleDisabled: PropTypes.func.isRequired,
  handleGoToPreviousStep: PropTypes.func.isRequired,
  handleCancelDeviceCreation: PropTypes.func.isRequired,
};

export default SummaryStep;
