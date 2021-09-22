import React from 'react';

import { Box, Grid, IconButton } from '@material-ui/core';
import { Check, Close, Devices, Star } from '@material-ui/icons';
import PropTypes from 'prop-types';

import DataCard from '../../common/components/Cards/DataCard';

const Cards = ({ devices }) => {
  return (
    <Box padding={2}>
      <Grid spacing={2} container>
        {devices.map(device => {
          const handleFavorite = () => {
            console.log(device);
          };

          return (
            <Grid key={device} xs={12} sm={6} md={4} xl={3} item>
              <DataCard
                headerIcon={<Devices />}
                headerTitle='Device Name'
                footer={
                  <>
                    <IconButton onClick={handleFavorite} size='small'>
                      <Star style={{ color: '#F1B44C' }} />
                    </IconButton>

                    <Check color='primary' />
                    <Close color='error' />
                  </>
                }
              >
                DataCard
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
};

Cards.defaultProps = {
  devices: [],
};

export default Cards;
