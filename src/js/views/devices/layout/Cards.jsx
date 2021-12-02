import React from 'react';

import { Box, Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import { Check, Close, DevicesOther, Star, StarBorderOutlined } from '@material-ui/icons';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import DataCard from '../../../common/components/Cards/DataCard';
import { useCardsStyles } from './style';

const Cards = ({
  devices,
  handleClickDevice,
  handleFavoriteDevice,
  handleSetDeviceOptionsMenu,
}) => {
  const { t } = useTranslation(['devices', 'common']);
  const classes = useCardsStyles();

  return (
    <Box padding={2}>
      <Grid spacing={2} container>
        {devices.map(device => {
          const lastUpdate = device.updated || device.created;

          const handleSeeDeviceDetails = () => {
            handleClickDevice(device);
          };

          const handleFavoriteThisDevice = e => {
            e.stopPropagation();
            handleFavoriteDevice(device);
          };

          const handleShowOptionsMenu = e => {
            e.stopPropagation();
            handleSetDeviceOptionsMenu({
              anchorElement: e.target,
              device,
            });
          };

          return (
            <Grid key={device.id} xs={12} sm={6} md={4} xl={3} item>
              <DataCard
                className={classes.card}
                onClick={handleSeeDeviceDetails}
                onOptionsClick={handleShowOptionsMenu}
                headerIcon={<DevicesOther className={classes.cardIcon} />}
                headerTitle={<Typography className={classes.cardTitle}>{device.label}</Typography>}
                footer={
                  <>
                    <Tooltip
                      title={t(device.favorite ? 'removeFromFavoriteTooltip' : 'favoriteTooltip')}
                      placement='top'
                      arrow
                    >
                      <div>
                        <IconButton
                          onClick={handleFavoriteThisDevice}
                          size='small'
                          disabled // TODO: Enable again when Backstage implement this action
                        >
                          {device.favorite ? (
                            <Star style={{ color: '#F1B44C' }} />
                          ) : (
                            <StarBorderOutlined />
                          )}
                        </IconButton>
                      </div>
                    </Tooltip>

                    <Tooltip
                      title={t(
                        device.hasCertificate ? 'hasCertificateTooltip' : 'noCertificateTooltip',
                      )}
                      placement='right'
                      arrow
                    >
                      <div>
                        <IconButton size='small' disabled>
                          {device.hasCertificate ? (
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
                {device.attrsLength >= 0 && (
                  <Box marginBottom={1}>
                    <Typography variant='body2'>
                      <strong>{device.attrsLength}</strong>
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
  devices: PropTypes.array,
  handleClickDevice: PropTypes.func,
  handleFavoriteDevice: PropTypes.func,
  handleSetDeviceOptionsMenu: PropTypes.func,
};

Cards.defaultProps = {
  devices: [],
  handleClickDevice: null,
  handleFavoriteDevice: null,
  handleSetDeviceOptionsMenu: null,
};

export default Cards;
