import React from 'react';

import { Box, Grid, Typography, Chip, TextField, MenuItem } from '@material-ui/core';
import { LocalOffer } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { DataCard } from 'sharedComponents/Cards';
import {
  TEMPLATE_ATTR_TYPES,
  TEMPLATE_ATTR_VALUE_TYPES,
  DATA_ORDER,
  NEW_CHIP_HOURS_AGO,
} from 'sharedComponents/Constants';
import { getComparator, isSomeHoursAgo } from 'sharedComponents/Utils';
import { useCardsStyles } from './style';

const ATTR_TYPE_TRANSLATIONS = {};
Object.values(TEMPLATE_ATTR_TYPES).forEach(({ value, translation }) => {
  ATTR_TYPE_TRANSLATIONS[value] = translation;
});

const ATTR_VALUE_TYPE_TRANSLATIONS = {};
Object.values(TEMPLATE_ATTR_VALUE_TYPES).forEach(({ value, translation }) => {
  ATTR_VALUE_TYPE_TRANSLATIONS[value] = translation;
});

const Cards = ({
  page,
  attrs,
  order,
  orderBy,
  rowsPerPage,
  valueFormatters,
  setOrder,
  setOrderBy,
  handleSetAttrOptionsMenu,
}) => {
  const { t } = useTranslation(['templateAttrs', 'common']);
  const classes = useCardsStyles();

  return (
    <Box padding={2}>
      <Box mb={1}>
        <Grid spacing={2} container>
          <Grid xs={2} item>
            <TextField
              value={orderBy}
              variant='outlined'
              label={t('sorting.orderBy')}
              onChange={e => setOrderBy(e.target.value)}
              fullWidth
              select
            >
              <MenuItem value=''>{t('common:none')}</MenuItem>

              {['label', 'id', 'type', 'valueType', 'staticValue'].map(orderByItem => {
                return (
                  <MenuItem key={orderByItem} value={orderByItem}>
                    {t(`attrData.${orderByItem}`)}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>

          <Grid xs={2} item>
            <TextField
              value={order}
              variant='outlined'
              label={t('sorting.order')}
              onChange={e => setOrder(e.target.value)}
              fullWidth
              select
            >
              {Object.values(DATA_ORDER).map(dataOrder => {
                return (
                  <MenuItem key={dataOrder} value={dataOrder}>
                    {t(`common:${dataOrder.toLowerCase()}`)}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>
        </Grid>
      </Box>

      <Grid spacing={2} container alignItems='stretch'>
        {attrs
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .sort(getComparator(order === DATA_ORDER.DESC, orderBy, valueFormatters[orderBy]))
          .map(attr => {
            const attrTypeTranslation = ATTR_TYPE_TRANSLATIONS[attr.type] || attr.type;

            const valueTypeTranslation =
              ATTR_VALUE_TYPE_TRANSLATIONS[attr.valueType] || attr.valueType;

            const isNew = isSomeHoursAgo(attr.created, NEW_CHIP_HOURS_AGO);

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
                  footer={isNew && <Chip color='primary' label={t('common:new')} size='small' />}
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
  attrs: PropTypes.array.isRequired,
  order: PropTypes.oneOf([DATA_ORDER.ASC, DATA_ORDER.DESC]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  valueFormatters: PropTypes.object.isRequired,
  setOrder: PropTypes.func.isRequired,
  setOrderBy: PropTypes.func.isRequired,
  handleSetAttrOptionsMenu: PropTypes.func.isRequired,
};

export default Cards;
