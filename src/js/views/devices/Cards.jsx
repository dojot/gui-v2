import React, { useState } from 'react';

import { Box, Grid, IconButton, Menu, MenuItem, Tooltip, Typography } from '@material-ui/core';
import { Check, Close, Delete, DevicesOther, Edit, Star } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import DataCard from '../../common/components/Cards/DataCard';
import useStyles from './style';

const Cards = ({ devices, handleClickDevice }) => {
  const { t } = useTranslation(['devices', 'common']);
  const classes = useStyles();

  const [deviceOptionsMenu, setDeviceOptionsMenu] = useState(null);

  const handleHideOptionsMenu = () => {
    setDeviceOptionsMenu(null);
  };

  const handleEditOptionSelected = () => {
    handleHideOptionsMenu();
  };

  const handleDeleteOptionSelected = () => {
    handleHideOptionsMenu();
  };

  return (
    <Box padding={2}>
      <Menu
        id='options-menu'
        onClose={handleHideOptionsMenu}
        open={!!deviceOptionsMenu}
        anchorEl={deviceOptionsMenu?.anchorElement}
      >
        <MenuItem className={classes.menuItem} onClick={handleEditOptionSelected}>
          <Edit />
          <span className={classes.menuItemText}>{t('common:edit')}</span>
        </MenuItem>

        <MenuItem className={classes.menuItem} onClick={handleDeleteOptionSelected}>
          <Delete />
          <span className={classes.menuItemText}>{t('common:exclude')}</span>
        </MenuItem>
      </Menu>

      <Grid spacing={2} container>
        {devices.map(device => {
          const hasCertificate = device % 2 === 0;

          const handleSeeDeviceDetails = () => {
            handleClickDevice(device);
          };

          const handleFavoriteDevice = e => {
            e.stopPropagation();
          };

          const handleShowOptionsMenu = e => {
            e.stopPropagation();
            setDeviceOptionsMenu({
              anchorElement: e.target,
              device,
            });
          };

          return (
            <Grid key={device} xs={12} sm={6} md={4} xl={3} item>
              <DataCard
                className={classes.deviceCard}
                headerTitle='Device Name'
                headerIcon={<DevicesOther />}
                onClick={handleSeeDeviceDetails}
                onOptionsClick={handleShowOptionsMenu}
                footer={
                  <>
                    <Tooltip title={t('favoriteTooltip')} placement='top' arrow>
                      <IconButton onClick={handleFavoriteDevice} size='small'>
                        <Star style={{ color: '#F1B44C' }} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip
                      title={t(hasCertificate ? 'hasCertificateTooltip' : 'noCertificateTooltip')}
                      placement='right'
                      arrow
                    >
                      <div>
                        <IconButton size='small' disabled>
                          {hasCertificate ? <Check color='primary' /> : <Close color='error' />}
                        </IconButton>
                      </div>
                    </Tooltip>
                  </>
                }
              >
                <Box marginBottom={1}>
                  <Typography variant='body2'>5</Typography>
                  <Typography variant='body2'>Certificados</Typography>
                </Box>

                <Box>
                  <Typography variant='body2'>02/03/2021</Typography>
                  <Typography variant='body2'>Última Atualização</Typography>
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
  devices: PropTypes.array,
  handleClickDevice: PropTypes.func,
};

Cards.defaultProps = {
  devices: [],
  handleClickDevice: null,
};

export default Cards;
