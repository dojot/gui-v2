import React, { useState } from 'react';

import { AccordionDetails, Typography, TextField, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import GeneratedCertificateResume from './GeneratedCertificateResume';
import useStyles from './style';

function CreateCertificateCA() {
  const classes = useStyles();
  const { t } = useTranslation('createCertificate');

  const [text, setText] = useState('');
  const [isGeneratedCertificate, setIsGeneratedCertificate] = useState(false);

  const handleChangeText = e => {
    setText(e.target.value);
  };

  const generateCertificate = () => {
    setIsGeneratedCertificate(true);
  };

  return (
    <>
      {!isGeneratedCertificate ? (
        <AccordionDetails className={classes.createCertificateCA}>
          <Typography>{t('createCertificateCA.inputDataLabel')}</Typography>
          <br />
          <TextField
            value={text}
            onChange={handleChangeText}
            placeholder={t('createCertificateCA.inputPlaceholder')}
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
              {t('createCertificateCA.generateCertificate')}
            </Button>
          </Typography>
        </AccordionDetails>
      ) : (
        <GeneratedCertificateResume />
      )}
    </>
  );
}

export default CreateCertificateCA;
