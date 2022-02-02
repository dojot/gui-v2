import React, { useCallback } from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { ViewContainer } from '../../stateComponents';
import { AreaChartCard } from './areaChart';
import { BarChartCard } from './barChart';
import { LineChartCard } from './lineChart';
import { MapCard } from './map';
import { TableCard } from './table';

const useStyles = makeStyles(() => {
  return {
    root: {
      flexGrow: 1,
    },
  };
});

const WidgetView = props => {
  const classes = useStyles();
  const { history } = props;
  const { line, area, bar, table, map } = __CONFIG__;
  const { t } = useTranslation(['dashboard', 'common']);

  const handleClick = useCallback(
    id => {
      history.push(`/dashboard/widget/wizard/${id}`);
    },
    [history],
  );

  const handleBack = useCallback(() => {
    history.push('/dashboard');
  }, [history]);

  const getHeaderContent = useCallback(() => {
    return (
      <Button
        style={{ marginLeft: 10 }}
        size='small'
        variant='outlined'
        color='inherit'
        startIcon={<ArrowBack />}
        onClick={() => handleBack()}
      >
        {t('common:back')}
      </Button>
    );
  }, [handleClick]);

  return (
    <ViewContainer headerTitle={t('widget')} headerContent={getHeaderContent}>
      <Grid container justify='flex-start' className={classes.root}>
        <LineChartCard onClick={() => handleClick(line)} />
        <AreaChartCard onClick={() => handleClick(area)} />
        <BarChartCard onClick={() => handleClick(bar)} />
        <TableCard onClick={() => handleClick(table)} />
        <MapCard onClick={() => handleClick(map)} />
      </Grid>
    </ViewContainer>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WidgetView);
