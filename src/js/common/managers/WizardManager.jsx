import React, { useCallback } from 'react';

import LazyLoading from 'Components/LazyLoading';
import { useTranslation } from 'react-i18next';

const AreaWizard = LazyLoading(() =>
  import('views/dashboard/widget/areaChart/wizard'),
);
const BarWizard = LazyLoading(() =>
  import('views/dashboard/widget/barChart/wizard'),
);
const TableWizard = LazyLoading(() =>
  import('views/dashboard/widget/table/wizard'),
);
const LineWizard = LazyLoading(() =>
  import('views/dashboard/widget/lineChart/wizard'),
);
const MapWizard = LazyLoading(() =>
  import('views/dashboard/widget/map/wizard'),
);

const Manager = props => {
  const {
    match: {
      params: { id },
    },
    history,
  } = props;
  const { line, area, bar, table, map } = __CONFIG__;

  const toDashboard = useCallback(() => {
    history.push('/dashboard');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { t } = useTranslation(['dashboard']);

  const getTitle = useCallback(() => {
    switch (id) {
      case line:
        return t(['line.title', 'Line Chart']);
      case area:
        return t(['area.title', 'Area Chart']);
      case bar:
        return t(['bar.title', 'Bar Chart']);
      case map:
        return t(['map.title', 'Mapa']);
      case table:
        return t(['table.title', 'Table Chart']);
      default:
        return '';
    }
  }, [area, bar, line, map, id, t, toDashboard]);

  switch (id) {
    case area:
      return <AreaWizard title={getTitle()} toDashboard={toDashboard} />;
    case line:
      return <LineWizard title={getTitle()} toDashboard={toDashboard} />;
    case bar:
      return <BarWizard title={getTitle()} toDashboard={toDashboard} />;
    case table:
      return <TableWizard title={getTitle()} toDashboard={toDashboard} />;
    case map:
      return <MapWizard title={getTitle()} toDashboard={toDashboard} />;
    default:
      return <div />;
  }
};

export default Manager;
