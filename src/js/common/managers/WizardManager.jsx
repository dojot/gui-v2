import React, { useCallback } from 'react';

import LazyLoading from 'Components/LazyLoading';
import { useTranslation } from 'react-i18next';

const Wizard = LazyLoading(() =>
  import('views/dashboard/widget/wizard/Wizard.jsx'),
);
const MapWizard = LazyLoading(() =>
  import('views/dashboard/widget/map/Wizard'),
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

  const getWizard = useCallback(() => {
    switch (id) {
      case line:
        return (
          <Wizard
            title={t(['line.title', 'Line Chart'])}
            type={id}
            toDashboard={toDashboard}
          />
        );
      case area:
        return (
          <Wizard
            title={t(['area.title', 'Area Chart'])}
            type={id}
            toDashboard={toDashboard}
          />
        );
      case bar:
        return (
          <Wizard
            title={t(['bar.title', 'Bar Chart'])}
            type={id}
            toDashboard={toDashboard}
          />
        );
      case table:
        return (
          <Wizard
            title={t(['table.title', 'Table'])}
            type={id}
            toDashboard={toDashboard}
          />
        );
      case map:
        return (
          <MapWizard
            title={t(['map.title', 'Mapa'])}
            toDashboard={toDashboard}
          />
        );
      default:
        return '';
    }
  }, [area, bar, line, map, id, t, toDashboard]);

  return getWizard();
};

export default Manager;
