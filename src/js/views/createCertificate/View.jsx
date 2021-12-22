import React, { useCallback, useState } from 'react';

import { Box, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { ViewContainer } from '../stateComponents';
import { CONSTANTS } from './constants';
import CollapsibleCard from './layout/CollapsibleCard';
import useStyles from './style';

const CreateCertificate = () => {
  const { t } = useTranslation('createCertificate');
  const classes = useStyles();

  const [expanded, setExpanded] = useState('');
  const [isGeneratedCertificate, setIsGeneratedCertificate] = useState(false);

  const toggleCollapseCard = useCallback(
    clicked => {
      if (expanded === clicked) {
        setExpanded('');
      } else {
        setExpanded(clicked);
      }
    },
    [expanded],
  );

  return (
    <ViewContainer headerTitle={t('Novo certificado')}>
      <Box className={classes.container}>
        <Box className={classes.content}>
          {expanded !== CONSTANTS.CSR && expanded !== CONSTANTS.CA && (
            <CollapsibleCard
              expanded={expanded}
              handleChange={toggleCollapseCard}
              setIsGeneratedCertificate={setIsGeneratedCertificate}
              isGeneratedCertificate={isGeneratedCertificate}
              creationMethod={CONSTANTS.ONE_CLICK_CREATE}
              title={t('createCertificateOneClick.title')}
              subTitle={t('createCertificateOneClick.subTitle')}
            />
          )}

          {expanded !== CONSTANTS.CA && (
            <CollapsibleCard
              expanded={expanded}
              handleChange={toggleCollapseCard}
              setIsGeneratedCertificate={setIsGeneratedCertificate}
              isGeneratedCertificate={isGeneratedCertificate}
              creationMethod={CONSTANTS.CSR}
              title={t('createCertificateCSR.title')}
              subTitle={t('createCertificateCSR.subTitle')}
            />
          )}

          {expanded !== CONSTANTS.CSR && (
            <CollapsibleCard
              expanded={expanded}
              handleChange={toggleCollapseCard}
              setIsGeneratedCertificate={setIsGeneratedCertificate}
              isGeneratedCertificate={isGeneratedCertificate}
              creationMethod={CONSTANTS.CA}
              title={t('createCertificateCA.title')}
              subTitle={t('createCertificateCA.subTitle')}
            />
          )}
        </Box>

        <Box className={classes.footer}>
          <Button onClick={() => setExpanded('')} className={classes.cancelButton}>
            {t('cancelButton')}
          </Button>
          <Button
            className={classes.submitButton}
            variant='contained'
            color='primary'
            disabled={!isGeneratedCertificate}
          >
            {t('finishButton')}
          </Button>
        </Box>
      </Box>
    </ViewContainer>
  );
};

export default CreateCertificate;
