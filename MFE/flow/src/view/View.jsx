import React, { useEffect } from 'react';

import { Grid, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ViewContainer } from 'sharedComponents/Containers';

import { actions as flowActions } from '../redux/modules/flows';
import useStyles from './style';

const Flows = ({ isMenuOpen }) => {
  const { t } = useTranslation('home');
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <ViewContainer headerTitle={t('flow:title')} isMenuOpen={isMenuOpen}>
      <Box sx={{ flexGrow: 1 }} padding={2}>
        <Grid container wrap='wrap' spacing={4} />
      </Box>
    </ViewContainer>
  );
};

export default Flows;
