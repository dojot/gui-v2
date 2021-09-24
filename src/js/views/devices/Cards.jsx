import React from 'react';

import { Box, Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import { Check, Close, DevicesOther, Star, StarBorderOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import DataCard from '../../common/components/Cards/DataCard';
import useStyles from './style';

const Cards = ({ page, devices, rowsPerPage, handleClickDevice, handleSetDeviceOptionsMenu }) => {
  const { t } = useTranslation(['devices', 'common']);
  const classes = useStyles();

  return (
    <Box padding={2}>
      <Grid spacing={2} container>
        {devices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(device => {
          const handleSeeDeviceDetails = () => {
            handleClickDevice(device);
          };

          const handleFavoriteDevice = e => {
            e.stopPropagation();
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
                className={classes.deviceCard}
                headerTitle={device.name}
                headerIcon={<DevicesOther />}
                onClick={handleSeeDeviceDetails}
                onOptionsClick={handleShowOptionsMenu}
                footer={
                  <>
                    <Tooltip
                      title={t(device.favorite ? 'removeFromFavoriteTooltip' : 'favoriteTooltip')}
                      placement='top'
                      arrow
                    >
                      <IconButton onClick={handleFavoriteDevice} size='small'>
                        {device.favorite ? (
                          <Star style={{ color: '#F1B44C' }} />
                        ) : (
                          <StarBorderOutlined />
                        )}
                      </IconButton>
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
                <Box marginBottom={1}>
                  <Typography variant='body2'>{device.attrsLength}</Typography>
                  <Typography variant='body2'>{t('cardData.properties')}</Typography>
                </Box>

                <Box>
                  <Typography variant='body2'>{device.lastUpdate}</Typography>
                  <Typography variant='body2'>{t('cardData.lastUpdate')}</Typography>
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
  page: PropTypes.number,
  devices: PropTypes.array,
  rowsPerPage: PropTypes.number,
  handleClickDevice: PropTypes.func,
  handleSetDeviceOptionsMenu: PropTypes.func,
};

Cards.defaultProps = {
  page: 0,
  devices: [],
  rowsPerPage: 0,
  handleClickDevice: null,
  handleSetDeviceOptionsMenu: null,
};

export default Cards;
