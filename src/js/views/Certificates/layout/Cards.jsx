import React from 'react';

import { Box, Grid, Typography, Link, Chip } from '@material-ui/core';
import { VerifiedUserOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import DataCard from '../../../common/components/Cards/DataCard';
import { useCertificateComputedData } from '../hooks';
import { useCardsStyles } from './style';

const Cards = ({ certificates, handleClickCertificate, handleSetCertificateOptionsMenu }) => {
  const { t } = useTranslation(['certificates', 'common']);
  const classes = useCardsStyles();

  const handleGetCertificateComputedData = useCertificateComputedData();

  return (
    <Box padding={2}>
      <Grid spacing={2} container>
        {certificates.map(certificate => {
          const {
            statusText,
            statusColor,
            validityInitialDate,
            validityFinalDate,
          } = handleGetCertificateComputedData(certificate.validity);

          const handleSeeCertificateDetails = () => {
            handleClickCertificate(certificate);
          };

          const handleShowOptionsMenu = e => {
            e.stopPropagation();
            handleSetCertificateOptionsMenu({
              anchorElement: e.target,
              certificate,
            });
          };

          return (
            <Grid key={certificate.fingerprint} xs={12} sm={6} md={4} xl={3} item>
              <DataCard
                className={classes.card}
                onClick={handleSeeCertificateDetails}
                onOptionsClick={handleShowOptionsMenu}
                headerIcon={<VerifiedUserOutlined className={classes.cardIcon} />}
                headerTitle={
                  <Typography className={classes.cardTitle}>{certificate.fingerprint}</Typography>
                }
              >
                <Box marginBottom={1}>
                  <Typography variant='body2'>
                    <strong>{t('dataLabels.deviceId')}</strong>
                  </Typography>

                  {certificate.belongsTo?.device ? (
                    <RouterLink
                      component={Link}
                      href={`/certificates/${certificate.belongsTo.device}`}
                    >
                      {certificate.belongsTo.device}
                    </RouterLink>
                  ) : (
                    <Typography variant='body2'>{t('noAssociatedDeviceTooltip')}</Typography>
                  )}
                </Box>

                <Box marginBottom={1}>
                  <Typography variant='body2'>
                    <strong>{t('dataLabels.validity')}</strong>
                  </Typography>

                  <Typography variant='body2'>
                    {validityInitialDate && validityFinalDate
                      ? `${validityInitialDate} - ${validityFinalDate}`
                      : t('validityNotDefined')}
                  </Typography>
                </Box>

                <Box marginBottom={1}>
                  <Chip
                    style={{ background: statusColor, color: 'white' }}
                    label={statusText}
                    size='small'
                  />
                </Box>
              </DataCard>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

Cards.propTypes = {
  certificates: PropTypes.array,
  handleClickCertificate: PropTypes.func,
  handleSetCertificateOptionsMenu: PropTypes.func,
};

Cards.defaultProps = {
  certificates: [],
  handleClickCertificate: null,
  handleSetCertificateOptionsMenu: null,
};

export default Cards;
