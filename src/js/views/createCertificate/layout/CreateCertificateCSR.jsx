import React, { useState } from 'react';

import { AccordionDetails, Collapse, Typography, TextField, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

// import { actions as certificateActions } from '../../../redux/modules/certificates';

import GeneratedCertificateResume from './GeneratedCertificateResume';
import useStyles from './style';

function CreateCertificateCSR() {
  const classes = useStyles();
  const { t } = useTranslation('createCertificate');

  const [csrHelp, setCsrHelp] = useState(false);
  const [text, setText] = useState('');
  const [isGeneratedCertificate, setIsGeneratedCertificate] = useState(false);

  const toggleCsrHelp = () => setCsrHelp(!csrHelp);

  const handleChangeText = e => {
    setText(e.target.value);
  };

  const generateCertificate = () => {
    setIsGeneratedCertificate(true);
  };

  return (
    <>
      {!isGeneratedCertificate ? (
        <AccordionDetails className={classes.createCertificateCSR}>
          <Typography onClick={toggleCsrHelp} align='right' className={classes.csrHelpLink}>
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
          <br />
          <TextField
            value={text}
            onChange={handleChangeText}
            placeholder={t('createCertificateCSR.inputPlaceholder')}
            multiline
            rows={20}
            variant='outlined'
            fullWidth
          />
          <br />
          <Typography align='right'>
            <Button
              onClick={generateCertificate}
              className={classes.generateCertificateButton}
              variant='text'
              color='primary'
              disabled={!text}
            >
              {t('createCertificateCSR.generateCertificate')}
            </Button>
          </Typography>
        </AccordionDetails>
      ) : (
        <GeneratedCertificateResume />
      )}
    </>
  );
}

export default CreateCertificateCSR;
