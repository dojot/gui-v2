import React from 'react';

import { Box, Grid, Typography, Chip, MenuItem, TextField } from '@material-ui/core';
import { FilterNone } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { DataCard } from 'sharedComponents/Cards';
import { isSomeHoursAgo } from 'sharedComponents/Utils';
import { NEW_CHIP_HOURS_AGO, DATA_ORDER } from 'sharedComponents/Constants';
import { useCardsStyles } from './style';

const Cards = ({
  order,
  orderBy,
  templates,
  setOrder,
  setOrderBy,
  handleClickTemplate,
  handleSetTemplateOptionsMenu,
}) => {
  const { t } = useTranslation(['templates', 'common']);
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

              {['label', 'id', 'created', 'updated'].map(orderByItem => {
                return (
                  <MenuItem key={orderByItem} value={orderByItem}>
                    {t(`dataTableHead.${orderByItem}`)}
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

      <Grid spacing={2} container>
        {templates.map(template => {
          const attrsLength = template.attrs?.length || 0;
          const isNew = isSomeHoursAgo(template.created, NEW_CHIP_HOURS_AGO);

          const handleSeeTemplateDetails = () => {
            handleClickTemplate(template);
          };

          const handleShowOptionsMenu = e => {
            e.stopPropagation();
            handleSetTemplateOptionsMenu({
              anchorElement: e.target,
              template,
            });
          };

          return (
            <Grid key={template.id} xs={12} sm={6} md={4} xl={3} item>
              <DataCard
                className={classes.card}
                onClick={handleSeeTemplateDetails}
                onOptionsClick={handleShowOptionsMenu}
                headerIcon={<FilterNone className={classes.cardIcon} />}
                headerTitle={
                  <Typography className={classes.cardTitle}>{template.label}</Typography>
                }
                footer={
                  isNew ? <Chip color='primary' label={t('common:new')} size='small' /> : null
                }
              >
                <Box marginBottom={1}>
                  <Typography variant='body2'>
                    <strong>{template.id}</strong>
                  </Typography>

                  <Typography variant='body2'>{t('cardData.templateId')}</Typography>
                </Box>

                <Box>
                  <Typography variant='body2'>
                    <strong>{attrsLength}</strong>
                  </Typography>

                  <Typography variant='body2'>
                    {t('cardData.attrsLength', { count: attrsLength })}
                  </Typography>
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
  order: PropTypes.oneOf([DATA_ORDER.ASC, DATA_ORDER.DESC]).isRequired,
  orderBy: PropTypes.string.isRequired,
  templates: PropTypes.array.isRequired,
  setOrder: PropTypes.func.isRequired,
  setOrderBy: PropTypes.func.isRequired,
  handleClickTemplate: PropTypes.func.isRequired,
  handleSetTemplateOptionsMenu: PropTypes.func.isRequired,
};

export default Cards;
