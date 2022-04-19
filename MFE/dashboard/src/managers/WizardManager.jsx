import React, { useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { WIDGET } from 'sharedComponents/Constants';

import AreaWizard from '../view/widget/areaChart/wizard'
import BarWizard from '../view/widget/barChart/wizard'
import TableWizard from '../view/widget/table/wizard'
import LineWizard from '../view/widget/lineChart/wizard'
import MapWizard from '../view/widget/map/wizard/index'

const Manager = props => {
  const {
    match: {
      params: { id },
      params,
    },
    history,
  } = props;
  const { LINE, AREA, BAR, TABLE, MAP } = WIDGET;

  const toDashboard = useCallback(() => {
    history.push('/dashboard');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { t } = useTranslation(['dashboard']);

  const getTitle = useCallback(() => {
    switch (id) {
      case LINE+'':
        return t(['line.title', 'Line Chart']);
      case AREA+'':
        return t(['area.title', 'Area Chart']);
      case BAR+'':
        return t(['bar.title', 'Bar Chart']);
      case MAP+'':
        return t(['map.title', 'Mapa']);
      case TABLE+'':
        return t(['table.title', 'Table Chart']);
      default:
        return '';
    }
  }, [AREA, BAR, LINE, MAP, id, t, toDashboard]);

  switch (id) {
    case LINE+'':
      return <LineWizard title={getTitle()} toDashboard={toDashboard} {...params} />;
    case AREA+'':
      return <AreaWizard title={getTitle()} toDashboard={toDashboard} {...params} />;
    case BAR+'':
      return <BarWizard title={getTitle()} toDashboard={toDashboard} {...params} />;
    case TABLE+'':
      return <TableWizard title={getTitle()} toDashboard={toDashboard} {...params} />;
    case MAP+'':
      return <MapWizard title={getTitle()} toDashboard={toDashboard} {...params} />;
    default:
      return <div />;
  }
};

export default Manager;
