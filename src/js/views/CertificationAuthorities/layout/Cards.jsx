import React from 'react';

import { Box, Grid, Typography } from '@material-ui/core';
import { VerifiedUserOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';

import DataCard from '../../../common/components/Cards/DataCard';
import { useCardsStyles } from './style';

const Cards = ({ page, certificationAuthorities, rowsPerPage, handleSetCaOptionsMenu }) => {
  const classes = useCardsStyles();

  return (
    <Box padding={2}>
      <Grid spacing={2} container>
        {certificationAuthorities
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map(certificationAuthority => {
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
                  headerIcon={<VerifiedUserOutlined className={classes.certificationAuthorityCardIcon} />}
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
  page: PropTypes.number,
  certificationAuthorities: PropTypes.array,
  rowsPerPage: PropTypes.number,
  handleSetCaOptionsMenu: PropTypes.func,
};

Cards.defaultProps = {
  page: 0,
  certificationAuthorities: [],
  rowsPerPage: 0,
  handleSetCaOptionsMenu: null,
};

export default Cards;
