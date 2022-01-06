import React, { useEffect, useState } from 'react';

import { Box, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { actions } from '../../redux/modules/certificates';
import { certificateDataSelector } from '../../redux/selectors/certificatesSelector';
import { ViewContainer } from '../stateComponents';
import { CONSTANTS } from './constants';
import CreateCertificateCA from './layout/CreateCertificateCA';
import CreateCertificateCSR from './layout/CreateCertificateCSR';
import CreateCertificateOneClick from './layout/CreateCertificateOneClick';
import useStyles from './style';

const CreateCertificate = () => {
  const { t } = useTranslation('createCertificate');
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const certificateData = useSelector(certificateDataSelector);

  const [expandedCard, setExpandedCard] = useState('');

  useEffect(() => {
    return () => {
      dispatch(actions.saveCertificateData({ certificateData: null }));
    };
  }, []);

  const handleLeaveCertificateCreation = () => {
    if (history.length) history.goBack();
    else history.push('/certificates');
  };

  const handleToggleContent = constant => () => {
    if (certificateData) return;

    if (expandedCard === constant) {
      setExpandedCard('');
    } else {
      setExpandedCard(constant);
    }
  };

  const handleCreateCertificateOneClick = () => {
    if (expandedCard !== CONSTANTS.ONE_CLICK) {
      dispatch(actions.createCertificateOneClick());
    }
    handleToggleContent(CONSTANTS.ONE_CLICK)();
  };

  const handleCreateCertificateCSR = csrPEM => () => {
    dispatch(actions.createCertificateCSR({ csrPEM }));
  };

  return (
    <ViewContainer headerTitle={t('Novo certificado')}>
      <Box className={classes.container}>
        <Box className={classes.content}>
          <Box className={classes.collapsibleCardsWrapper}>
            <CreateCertificateOneClick
              isShowing={expandedCard === CONSTANTS.ONE_CLICK}
              handleToggleContent={handleCreateCertificateOneClick}
              certificateData={certificateData}
            />

            <CreateCertificateCSR
              isShowing={expandedCard === CONSTANTS.CSR}
              handleToggleContent={handleToggleContent(CONSTANTS.CSR)}
              handleCreateCertificateCSR={handleCreateCertificateCSR}
              certificateData={certificateData}
            />

            <CreateCertificateCA
              isShowing={expandedCard === CONSTANTS.CA}
              handleToggleContent={handleToggleContent(CONSTANTS.CA)}
              certificateData={certificateData}
            />
          </Box>
        </Box>

        <Box className={classes.footer}>
          <Box className={classes.actionButtonsWrapper}>
            {certificateData ? (
              <Button variant='contained' color='primary' onClick={handleLeaveCertificateCreation}>
                {t('finishButton')}
              </Button>
            ) : (
              <Button className={classes.cancelButton} onClick={handleLeaveCertificateCreation}>
                {t('cancelButton')}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </ViewContainer>
  );
};

export default CreateCertificate;
