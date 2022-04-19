import React, { useCallback } from 'react';

import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowBack } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { WIDGET } from 'sharedComponents/Constants';

import { ViewContainer } from 'sharedComponents/Containers';
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
    const { LINE, AREA, BAR, TABLE, MAP } = WIDGET;
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
                size="small"
                variant="outlined"
                color="inherit"
                startIcon={<ArrowBack/>}
                onClick={() => handleBack()}
            >
                {t('common:back')}
            </Button>
        );
    }, [handleClick]);

    return (
        <ViewContainer headerTitle={t('widget')} headerContent={getHeaderContent}>
            <Grid container justifyContent="flex-start" className={classes.root}>
                <LineChartCard onClick={() => handleClick(LINE)}/>
                <AreaChartCard onClick={() => handleClick(AREA)}/>
                <BarChartCard onClick={() => handleClick(BAR)}/>
                <TableCard onClick={() => handleClick(TABLE)}/>
                <MapCard onClick={() => handleClick(MAP)}/>
            </Grid>
        </ViewContainer>
    );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WidgetView);
