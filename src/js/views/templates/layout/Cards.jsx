import React from 'react';

import { Box, Grid, Typography } from '@material-ui/core';
import { FilterNone } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import DataCard from '../../../common/components/Cards/DataCard';
import { useCardsStyles } from './style';

const Cards = ({
  page,
  templates,
  rowsPerPage,
  handleClickTemplate,
  handleSetTemplateOptionsMenu,
}) => {
  const { t } = useTranslation(['templates', 'common']);
  const classes = useCardsStyles();

  return (
    <Box padding={2}>
      <Grid spacing={2} container>
        {templates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(template => {
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
                className={classes.templateCard}
                onClick={handleSeeTemplateDetails}
                onOptionsClick={handleShowOptionsMenu}
                headerIcon={<FilterNone className={classes.templateCardIcon} />}
                headerTitle={
                  <Typography className={classes.templateCardTitle}>{template.label}</Typography>
                }
              >
                {template.attrsLength >= 0 && (
                  <Box marginBottom={1}>
                    <Typography variant='body2'>
                      <strong>{template.attrsLength}</strong>
                    </Typography>
                    <Typography variant='body2'>{t('cardData.attrsLength')}</Typography>
                  </Box>
                )}

                {!!template.devicesLength && (
                  <Box>
                    <Typography variant='body2'>
                      <strong>template.devicesLength</strong>
                    </Typography>
                    <Typography variant='body2'>{t('cardData.devicesLength')}</Typography>
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
  templates: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleClickTemplate: PropTypes.func.isRequired,
  handleSetTemplateOptionsMenu: PropTypes.func.isRequired,
};

export default Cards;
