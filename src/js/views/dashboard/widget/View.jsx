// import PropTypes from 'prop-types'
import React, { useCallback } from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { ViewContainer } from '../../stateComponents';
import { AreaChartCard } from './areaChart';
import { BarChartCard } from './barChart';
import { BubbleChartCard } from './bubbleChart';
import { DonutChartCard } from './donutChart';
import { LineChartCard } from './lineChart';
import { PizzaChartCard } from './pizzaChart';
import { TableCard } from './table';
import { MapCard } from './map';

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
  const { line, area, bar, pizza, donut, bubble, table, map } = __CONFIG__;
  const { t } = useTranslation(['dashboard']);

  const handleClick = useCallback(
    id => {
      history.push(`/dashboard/widget/wizard/${id}`);
    },
    [history],
  );

  return (
    <ViewContainer headerTitle={t('dashboard:widget')}>
      <Grid container justify='flex-start' className={classes.root}>
        <LineChartCard onClick={() => handleClick(line)} />
        <AreaChartCard onClick={() => handleClick(area)} />
        <PizzaChartCard onClick={() => handleClick(pizza)} />
        <DonutChartCard onClick={() => handleClick(donut)} />
        <BubbleChartCard onClick={() => handleClick(bubble)} />
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
