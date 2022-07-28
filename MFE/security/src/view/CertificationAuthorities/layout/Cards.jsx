import React from 'react';

import { Box, Chip, Grid, Typography } from '@material-ui/core';
import { VerifiedUserOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { DataCard } from 'sharedComponents/Cards';
import { isSomeHoursAgo } from 'sharedComponents/Utils';
import { NEW_CHIP_HOURS_AGO } from 'sharedComponents/Constants';
import { useCertificateComputedData } from 'sharedComponents/Hooks';
import { useCardsStyles } from './style';

const Cards = ({ certificationAuthorities, handleSetOptionsMenu }) => {
  const { t } = useTranslation(['certificationAuthorities', 'common']);
  const classes = useCardsStyles();

  const handleGetCertificateComputedData = useCertificateComputedData();

  return (
    <Box padding={2}>
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
  certificationAuthorities: PropTypes.array,
  handleSetOptionsMenu: PropTypes.func,
};

Cards.defaultProps = {
  certificationAuthorities: [],
  handleSetOptionsMenu: null,
};

export default Cards;
