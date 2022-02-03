import React from 'react';

import { Box, Grid, Typography } from '@material-ui/core';
import { LocalOffer } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import DataCard from '../../../common/components/Cards/DataCard';
import { TEMPLATE_ATTR_TYPES, TEMPLATE_ATTR_VALUE_TYPES } from '../../../common/constants';
import { useCardsStyles } from './style';

const ATTR_TYPE_TRANSLATIONS = {};
Object.values(TEMPLATE_ATTR_TYPES).forEach(({ value, translation }) => {
  ATTR_TYPE_TRANSLATIONS[value] = translation;
});

const ATTR_VALUE_TYPE_TRANSLATIONS = {};
Object.values(TEMPLATE_ATTR_VALUE_TYPES).forEach(({ value, translation }) => {
  ATTR_VALUE_TYPE_TRANSLATIONS[value] = translation;
});

const Cards = ({ page, attrs, rowsPerPage, handleSetAttrOptionsMenu }) => {
  const { t } = useTranslation(['templateAttrs', 'common']);
  const classes = useCardsStyles();

  return (
    <Box padding={2}>
      <Grid spacing={2} container alignItems='stretch'>
        {attrs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(attr => {
          const attrTypeTranslation = ATTR_TYPE_TRANSLATIONS[attr.type] || attr.type;

          const valueTypeTranslation =
            ATTR_VALUE_TYPE_TRANSLATIONS[attr.valueType] || attr.valueType;

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
                <Box marginBottom={1}>
                  <Typography variant='body2'>{t('attrData.id')}</Typography>
                  <Typography variant='body2'>
                    <strong>{attr.id}</strong>
                  </Typography>
                </Box>

                <Box marginBottom={1}>
                  <Typography variant='body2'>{t('attrData.type')}</Typography>
                  <Typography variant='body2'>
                    <strong>{t(attrTypeTranslation)}</strong>
                  </Typography>
                </Box>

                <Box marginBottom={1}>
                  <Typography variant='body2'>{t('attrData.valueType')}</Typography>
                  <Typography variant='body2'>
                    <strong>{t(valueTypeTranslation)}</strong>
                  </Typography>
                </Box>

                {attr.staticValue && (
                  <Box>
                    <Typography variant='body2'>{t('attrData.staticValue')}</Typography>
                    <Typography variant='body2'>
                      <strong>{attr.staticValue}</strong>
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
  rowsPerPage: PropTypes.number.isRequired,
  attrs: PropTypes.array.isRequired,
  handleSetAttrOptionsMenu: PropTypes.func.isRequired,
};

export default Cards;
