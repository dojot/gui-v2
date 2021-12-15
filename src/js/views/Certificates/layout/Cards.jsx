import React from 'react';

import { Box, Grid, Typography, Tooltip } from '@material-ui/core';
import { VerifiedUserOutlined } from '@material-ui/icons';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import DataCard from '../../../common/components/Cards/DataCard';
import { useCardsStyles } from './style';

const Cards = ({ certificates, handleClickCertificate, handleSetCertificateOptionsMenu }) => {
  const { t } = useTranslation(['certificates', 'common']);
  const classes = useCardsStyles();

  return (
    <Box padding={2}>
      <Grid spacing={2} container>
        {certificates.map(certificate => {
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
                  <Typography className={classes.cardTitle}>{certificate.label}</Typography>
                }
                footer={
                  <>
                    <Tooltip title={t('lastUpdateTooltip')} placement='right' arrow>
                      <div>
                        <Typography variant='body2'>
                          {moment(certificate.updated || certificate.created).format(
                            'DD/MM/YYYY HH:mm:ss',
                          )}
                        </Typography>
                      </div>
                    </Tooltip>
                  </>
                }
              >
                <Box marginBottom={1}>
                  <Typography variant='body2' className={certificate.deviceId && classes.deviceId}>
                    {t(
                      certificate.deviceId
                        ? certificate.deviceId
                        : 'certificates:noAssociatedDeviceTooltip',
                    )}
                  </Typography>
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
