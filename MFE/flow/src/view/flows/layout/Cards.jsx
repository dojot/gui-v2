import React from 'react';

import { Box, Chip, Grid, Typography } from '@material-ui/core';
import { DevicesOther } from '@material-ui/icons';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { DataCard } from 'sharedComponents/Cards';
import { NEW_CHIP_HOURS_AGO } from 'sharedComponents/Constants';
import { isSomeHoursAgo } from 'sharedComponents/Utils';

import { useCardsStyles } from './style';

const Cards = ({ flows, handleClickFlow, handleSetFlowOptionsMenu }) => {
  const { t } = useTranslation(['flows', 'common']);
  const classes = useCardsStyles();

  return (
    <Box padding={2}>
      <Grid spacing={2} container>
        {flows.map(flow => {
          const isNew = isSomeHoursAgo(flow.created, NEW_CHIP_HOURS_AGO);

          const handleSeeDeviceDetails = () => {
            handleClickFlow(flow);
          };

          const handleShowOptionsMenu = e => {
            e.stopPropagation();
            handleSetFlowOptionsMenu({
              anchorElement: e.target,
              flow,
            });
          };

          return (
            <Grid key={flow.id} xs={12} sm={6} md={4} xl={3} item>
              <DataCard
                className={classes.card}
                onClick={handleSeeDeviceDetails}
                onOptionsClick={handleShowOptionsMenu}
                headerIcon={<DevicesOther className={classes.cardIcon} />}
                headerTitle={<Typography className={classes.cardTitle}>{flow.name}</Typography>}
                footer={
                  <Box className={classes.cardFooter} display='flex' alignItems='center'>
                    {isNew && <Chip color='primary' label={t('common:new')} size='small' />}
                  </Box>
                }
              >
                <Box marginBottom={1}>
                  <Typography variant='body2'>
                    <strong>{flow.id}</strong>
                  </Typography>
                  <Typography variant='body2'>{t('cardData.flowId')}</Typography>
                </Box>

                {!!flow.created && (
                  <Box marginBottom={1}>
                    <Typography variant='body2'>
                      <strong>{moment(flow.created).format('L LTS')}</strong>
                    </Typography>
                    <Typography variant='body2'>{t('flows:cardData.created')}</Typography>
                  </Box>
                )}

                {!!flow.updated && (
                  <Box>
                    <Typography variant='body2'>
                      <strong>{moment(flow.updated).format('L LTS')}</strong>
                    </Typography>
                    <Typography variant='body2'>{t('cardData.updated')}</Typography>
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
  flows: PropTypes.array.isRequired,
  handleClickFlow: PropTypes.func.isRequired,
  handleSetFlowOptionsMenu: PropTypes.func.isRequired,
};

export default Cards;
