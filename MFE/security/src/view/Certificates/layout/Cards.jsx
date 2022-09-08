import React from 'react';

import PropTypes from 'prop-types';
import { Box, Grid, Typography, Chip, TextField, MenuItem } from '@material-ui/core';
import { DataCard } from 'sharedComponents/Cards';
import { Link as RouterLink } from 'react-router-dom';
import { VerifiedUserOutlined } from '@material-ui/icons';
import { useCardsStyles } from './style';
import { isSomeHoursAgo } from 'sharedComponents/Utils';
import { NEW_CHIP_HOURS_AGO, DATA_ORDER } from 'sharedComponents/Constants';
import { useCertificateComputedData } from 'sharedComponents/Hooks';
import { useTranslation } from 'react-i18next';

const Cards = ({
  order,
  orderBy,
  certificates,
  setOrder,
  setOrderBy,
  handleSetCertificateOptionsMenu,
}) => {
  const { t } = useTranslation(['certificates', 'common']);
  const classes = useCardsStyles();

  const handleGetCertificateComputedData = useCertificateComputedData();

  return (
    <Box padding={2}>
      <Box mb={1}>
        <Grid spacing={2} container>
          <Grid xs={2} item>
            <TextField
              value={orderBy}
              variant='outlined'
              label={t('sorting.orderBy')}
              onChange={e => setOrderBy(e.target.value)}
              fullWidth
              select
            >
              <MenuItem value=''>{t('common:none')}</MenuItem>

              {['fingerprint', 'subjectDN', 'validity.notBefore', 'validity.notAfter'].map(
                orderByItem => {
                  return (
                    <MenuItem key={orderByItem} value={orderByItem}>
                      {t(`dataLabels.${orderByItem}`)}
                    </MenuItem>
                  );
                },
              )}
            </TextField>
          </Grid>

          <Grid xs={2} item>
            <TextField
              value={order}
              variant='outlined'
              label={t('sorting.order')}
              onChange={e => setOrder(e.target.value)}
              fullWidth
              select
            >
              {Object.values(DATA_ORDER).map(dataOrder => {
                return (
                  <MenuItem key={dataOrder} value={dataOrder}>
                    {t(`common:${dataOrder.toLowerCase()}`)}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>
        </Grid>
      </Box>

      <Grid spacing={2} container>
        {certificates.map(certificate => {
          const isNew = isSomeHoursAgo(certificate.createdAt, NEW_CHIP_HOURS_AGO);

          const { statusText, statusColor, validityInitialDate, validityFinalDate } =
            handleGetCertificateComputedData(certificate.validity);

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
                footer={
                  isNew ? <Chip color='primary' label={t('common:new')} size='small' /> : null
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
                    <RouterLink
                      to={`/devices/${certificate.belongsTo.device}`}
                      className={classes.link}
                    >
                      {certificate.belongsTo.device}
                    </RouterLink>
                  ) : (
                    <Typography variant='body2'>
                      <strong>{t('noAssociatedDeviceTooltip')}</strong>
                    </Typography>
                  )}
                </Box>

                {validityInitialDate && validityFinalDate && (
                  <Box marginBottom={1}>
                    <Typography variant='body2'>{t('dataLabels.validity.both')}</Typography>

                    <Typography variant='body2'>
                      <strong>
                        {validityInitialDate} - {validityFinalDate}
                      </strong>
                    </Typography>
                  </Box>
                )}

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
  order: PropTypes.oneOf([DATA_ORDER.ASC, DATA_ORDER.DESC]),
  orderBy: PropTypes.string,
  certificates: PropTypes.array,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  handleSetCertificateOptionsMenu: PropTypes.func,
};

Cards.defaultProps = {
  order: DATA_ORDER.ASC,
  orderBy: '',
  certificates: [],
  setOrder: null,
  setOrderBy: null,
  handleSetCertificateOptionsMenu: null,
};

export default Cards;
