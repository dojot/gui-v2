import React from 'react';

import { Box, Grid, Step, StepLabel, Stepper } from '@material-ui/core';
import { StepIcon } from 'Components/StepIcon';
import { StepLine } from 'Components/StepLine';
import { useTranslation } from 'react-i18next';

import { ViewContainer } from '../stateComponents';
import useStyles from './style';

const CreateDevice = () => {
  const { t } = useTranslation('createDevice');
  const classes = useStyles();

  return (
    <ViewContainer headerTitle={t('title')}>
      <Box className={classes.container}>
        <Grid className={classes.content} alignItems='stretch' container>
          <Grid item sm={2}>
            <Stepper
              className={classes.stepper}
              activeStep={0}
              orientation='vertical'
              connector={<StepLine />}
            >
              <Step>
                <StepLabel StepIconComponent={StepIcon}>{t('stepper.templates')}</StepLabel>
              </Step>

              <Step>
                <StepLabel StepIconComponent={StepIcon}>{t('stepper.attrs')}</StepLabel>
              </Step>

              <Step>
                <StepLabel StepIconComponent={StepIcon}>{t('stepper.certificates')}</StepLabel>
              </Step>

              <Step>
                <StepLabel StepIconComponent={StepIcon}>{t('stepper.summary')}</StepLabel>
              </Step>
            </Stepper>
          </Grid>

          <Grid item sm={10}>
            Forms
          </Grid>
        </Grid>
      </Box>
    </ViewContainer>
  );
};

export default CreateDevice;
