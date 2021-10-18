import React from 'react';

import { Box, Grid, Typography } from '@material-ui/core';
import { LocalOffer } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import DataCard from '../../../common/components/Cards/DataCard';
import { TEMPLATE_ATTR_TYPES, TEMPLATE_ATTR_VALUE_TYPES } from '../../../common/constants';
import { useCardsStyles } from './style';

const Cards = ({ page, attrs, rowsPerPage, handleSetAttrOptionsMenu }) => {
  const { t } = useTranslation(['templateAttrs', 'common']);
  const classes = useCardsStyles();

  return (
    <Box padding={2}>
      <Grid spacing={2} container alignItems='stretch'>
        {attrs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(attr => {
          const typeConstantKey = attr.type?.replace(/:/g, '_').toUpperCase() || '';
          const typeText = TEMPLATE_ATTR_TYPES[typeConstantKey]?.translation;

          const valueTypeConstantKey = attr.valueType?.replace(/:/g, '_').toUpperCase() || '';
          const valueTypeText = TEMPLATE_ATTR_VALUE_TYPES[valueTypeConstantKey]?.translation;

          const handleShowOptionsMenu = e => {
            e.stopPropagation();
            handleSetAttrOptionsMenu({
              anchorElement: e.target,
              attr,
            });
          };

          return (
            <Grid key={attr.id} xs={12} sm={6} md={4} xl={3} item>
              <DataCard
                className={classes.card}
                onOptionsClick={handleShowOptionsMenu}
                headerIcon={<LocalOffer className={classes.cardIcon} />}
                headerTitle={<Typography className={classes.cardTitle}>{attr.label}</Typography>}
              >
                {attr.type && (
                  <Box marginBottom={1}>
                    <Typography variant='body2'>{t('attrData.type')}</Typography>
                    <Typography variant='body2'>
                      <strong>{typeText ? t(typeText) : attr.type}</strong>
                    </Typography>
                  </Box>
                )}

                {attr.valueType && (
                  <Box marginBottom={1}>
                    <Typography variant='body2'>{t('attrData.valueType')}</Typography>
                    <Typography variant='body2'>
                      <strong>{valueTypeText ? t(valueTypeText) : attr.valueType}</strong>
                    </Typography>
                  </Box>
                )}

                {attr.value && (
                  <Box marginBottom={1}>
                    <Typography variant='body2'>{t('attrData.value')}</Typography>
                    <Typography variant='body2'>
                      <strong>{attr.value}</strong>
                    </Typography>
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
  page: PropTypes.number.isRequired,
  attrs: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleSetAttrOptionsMenu: PropTypes.func.isRequired,
};

export default Cards;
