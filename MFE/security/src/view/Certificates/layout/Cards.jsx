import React from 'react';

import PropTypes from 'prop-types';
import { Box, Grid, Typography, Link, Chip } from '@material-ui/core';
import { DataCard } from 'sharedComponents/Cards';
import { Link as RouterLink } from 'react-router-dom';
import { VerifiedUserOutlined } from '@material-ui/icons';
import { useCardsStyles } from './style';
import { useCertificateComputedData } from 'sharedComponents/Hooks';
import { useTranslation } from 'react-i18next';

const Cards = ({ certificates, handleSetCertificateOptionsMenu }) => {
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
                onOptionsClick={handleShowOptionsMenu}
                headerIcon={<VerifiedUserOutlined className={classes.cardIcon} />}
                headerTitle={
                  <Typography className={classes.cardTitle}>{certificate.fingerprint}</Typography>
                }
              >
                <Box marginBottom={1}>
                  <Typography variant='body2'>{t('dataLabels.subjectDN')}</Typography>

                  <Typography variant='body2'>
                    <strong>{certificate.subjectDN}</strong>
                  </Typography>
                </Box>

                <Box marginBottom={1}>
                  <Typography variant='body2'>{t('dataLabels.deviceId')}</Typography>

                  {certificate.belongsTo?.device ? (
                    <RouterLink to={`/devices/${certificate.belongsTo.device}`}>
                      {certificate.belongsTo.device}
                    </RouterLink>
                  ) : (
                    <Typography variant='body2'>
                      <strong>{t('noAssociatedDeviceTooltip')}</strong>
                    </Typography>
                  )}
                </Box>

                <Box marginBottom={1}>
                  <Typography variant='body2'>{t('dataLabels.validity')}</Typography>

                  <Typography variant='body2'>
                    <strong>
                      {validityInitialDate && validityFinalDate
                        ? `${validityInitialDate} - ${validityFinalDate}`
                        : t('validityNotDefined')}
                    </strong>
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
  handleSetCertificateOptionsMenu: PropTypes.func,
};

Cards.defaultProps = {
  certificates: [],
  handleSetCertificateOptionsMenu: null,
};

export default Cards;
