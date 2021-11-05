import React from 'react';

import { Box, Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import { Check, Close, CertificatesOther, Star, StarBorderOutlined } from '@material-ui/icons';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import DataCard from '../../../common/components/Cards/DataCard';
import { useCardsStyles } from './style';

const Cards = ({
  page,
  certificates,
  rowsPerPage,
  handleClickCertificate,
  handleFavoriteCertificate,
  handleSetCertificateOptionsMenu,
}) => {
  const { t } = useTranslation(['certificates', 'common']);
  const classes = useCardsStyles();

  return (
    <Box padding={2}>
      <Grid spacing={2} container>
        {certificates
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map(certificate => {
            const lastUpdate = certificate.updated || certificate.created;

            const handleSeeCertificateDetails = () => {
              handleClickCertificate(certificate);
            };

            const handleFavoriteThisCertificate = e => {
              e.stopPropagation();
              handleFavoriteCertificate(certificate);
            };

            const handleShowOptionsMenu = e => {
              e.stopPropagation();
              handleSetCertificateOptionsMenu({
                anchorElement: e.target,
                certificate,
              });
            };

            return (
              <Grid key={certificate.id} xs={12} sm={6} md={4} xl={3} item>
                <DataCard
                  className={classes.card}
                  onClick={handleSeeCertificateDetails}
                  onOptionsClick={handleShowOptionsMenu}
                  headerIcon={<CertificatesOther className={classes.cardIcon} />}
                  headerTitle={
                    <Typography className={classes.cardTitle}>{certificate.label}</Typography>
                  }
                  footer={
                    <>
                      <Tooltip
                        title={t(
                          certificate.favorite ? 'removeFromFavoriteTooltip' : 'favoriteTooltip',
                        )}
                        placement='top'
                        arrow
                      >
                        <IconButton onClick={handleFavoriteThisCertificate} size='small'>
                          {certificate.favorite ? (
                            <Star style={{ color: '#F1B44C' }} />
                          ) : (
                            <StarBorderOutlined />
                          )}
                        </IconButton>
                      </Tooltip>

                      <Tooltip
                        title={t(
                          certificate.hasCertificate
                            ? 'hasCertificateTooltip'
                            : 'noCertificateTooltip',
                        )}
                        placement='right'
                        arrow
                      >
                        <div>
                          <IconButton size='small' disabled>
                            {certificate.hasCertificate ? (
                              <Check color='primary' />
                            ) : (
                              <Close color='error' />
                            )}
                          </IconButton>
                        </div>
                      </Tooltip>
                    </>
                  }
                >
                  {certificate.attrsLength >= 0 && (
                    <Box marginBottom={1}>
                      <Typography variant='body2'>
                        <strong>{certificate.attrsLength}</strong>
                      </Typography>
                      <Typography variant='body2'>{t('cardData.properties')}</Typography>
                    </Box>
                  )}

                  {!!lastUpdate && (
                    <Box>
                      <Typography variant='body2'>
                        <strong>{moment(lastUpdate).format('DD/MM/YYYY HH:mm:ss')}</strong>
                      </Typography>
                      <Typography variant='body2'>{t('cardData.updated')}</Typography>
                    </Box>
                  )}
                </DataCard>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

Cards.propTypes = {
  page: PropTypes.number,
  certificates: PropTypes.array,
  rowsPerPage: PropTypes.number,
  handleClickCertificate: PropTypes.func,
  handleFavoriteCertificate: PropTypes.func,
  handleSetCertificateOptionsMenu: PropTypes.func,
};

Cards.defaultProps = {
  page: 0,
  certificates: [],
  rowsPerPage: 0,
  handleClickCertificate: null,
  handleFavoriteCertificate: null,
  handleSetCertificateOptionsMenu: null,
};

export default Cards;
