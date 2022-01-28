import React from 'react';

import { Box, Grid, Typography } from '@material-ui/core';
import { FilterNone } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import DataCard from '../../../common/components/Cards/DataCard';
import { useCardsStyles } from './style';

const Cards = ({ templates, handleClickTemplate, handleSetTemplateOptionsMenu }) => {
  const { t } = useTranslation(['templates', 'common']);
  const classes = useCardsStyles();

  return (
    <Box padding={2}>
      <Grid spacing={2} container>
        {templates.map(template => {
          const attrsLength = template.attrs?.length || 0;

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
  templates: PropTypes.array.isRequired,
  handleClickTemplate: PropTypes.func.isRequired,
  handleSetTemplateOptionsMenu: PropTypes.func.isRequired,
};

export default Cards;
