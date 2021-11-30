import React from 'react';

import { Box, Grid, Typography } from '@material-ui/core';
import { VerifiedUserOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';

import DataCard from '../../../common/components/Cards/DataCard';
import { useCardsStyles } from './style';

const Cards = ({ certificationAuthorities, handleSetCaOptionsMenu }) => {
  const classes = useCardsStyles();

  return (
    <Box padding={2}>
      <Grid spacing={2} container>
        {certificationAuthorities.map(certificationAuthority => {
          const handleShowOptionsMenu = e => {
            e.stopPropagation();
            handleSetCaOptionsMenu({
              anchorElement: e.target,
              certificationAuthority,
            });
          };

          return (
            <Grid key={certificationAuthority.id} xs={12} sm={6} md={4} xl={3} item>
              <DataCard
                className={classes.certificationAuthorityCard}
                headerIcon={
                  <VerifiedUserOutlined className={classes.certificationAuthorityCardIcon} />
                }
                headerTitle={
                  <Typography className={classes.certificationAuthorityCardTitle}>
                    {certificationAuthority.name}
                  </Typography>
                }
                onOptionsClick={handleShowOptionsMenu}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

Cards.propTypes = {
  certificationAuthorities: PropTypes.array,
  handleSetCaOptionsMenu: PropTypes.func,
};

Cards.defaultProps = {
  certificationAuthorities: [],
  handleSetCaOptionsMenu: null,
};

export default Cards;
