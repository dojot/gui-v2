import React from 'react';

import { Box, Chip, Grid, Typography, TextField, MenuItem } from '@material-ui/core';
import { VerifiedUserOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { DataCard } from 'sharedComponents/Cards';
import { isSomeHoursAgo } from 'sharedComponents/Utils';
import { NEW_CHIP_HOURS_AGO, DATA_ORDER } from 'sharedComponents/Constants';
import { useCertificateComputedData } from 'sharedComponents/Hooks';
import { useCardsStyles } from './style';

const Cards = ({
  order,
  orderBy,
  certificationAuthorities,
  setOrder,
  setOrderBy,
  handleSetOptionsMenu,
}) => {
  const { t } = useTranslation(['certificationAuthorities', 'common']);
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

              {['caFingerprint', 'subjectDN'].map(orderByItem => {
                return (
                  <MenuItem key={orderByItem} value={orderByItem}>
                    {t(`dataTableHead.${orderByItem}`)}
                  </MenuItem>
                );
              })}
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
        {certificationAuthorities.map(certificationAuthority => {
          const isNew = isSomeHoursAgo(certificationAuthority.createdAt, NEW_CHIP_HOURS_AGO);

          const { statusText, statusColor, validityInitialDate, validityFinalDate } =
            handleGetCertificateComputedData(certificationAuthority.validity);

          const handleShowOptionsMenu = e => {
            e.stopPropagation();
            handleSetOptionsMenu({
              anchorElement: e.target,
              certificationAuthority,
            });
          };

          return (
            <Grid key={certificationAuthority.caFingerprint} xs={12} sm={6} md={4} xl={3} item>
              <DataCard
                className={classes.card}
                headerIcon={<VerifiedUserOutlined className={classes.cardIcon} />}
                headerTitle={
                  <Typography className={classes.cardTitle}>
                    {certificationAuthority.caFingerprint}
                  </Typography>
                }
                footer={
                  isNew ? <Chip color='primary' label={t('common:new')} size='small' /> : null
                }
                onOptionsClick={handleShowOptionsMenu}
              >
                <Box marginBottom={1}>
                  <Typography variant='body2'>{t('dataTableHead.subjectDN')}</Typography>

                  <Typography variant='body2'>
                    <strong>{certificationAuthority.subjectDN}</strong>
                  </Typography>
                </Box>

                <Box marginBottom={1}>
                  <Typography variant='body2'>{t('dataTableHead.validity')}</Typography>

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
  order: PropTypes.oneOf([DATA_ORDER.ASC, DATA_ORDER.DESC]),
  orderBy: PropTypes.string,
  certificationAuthorities: PropTypes.array,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  handleSetOptionsMenu: PropTypes.func,
};

Cards.defaultProps = {
  order: DATA_ORDER.ASC,
  orderBy: '',
  certificationAuthorities: [],
  setOrder: null,
  setOrderBy: null,
  handleSetOptionsMenu: null,
};

export default Cards;
