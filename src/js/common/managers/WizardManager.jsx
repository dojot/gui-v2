import React, { useCallback } from 'react';

import LazyLoading from 'Components/LazyLoading';
import { useTranslation } from 'react-i18next';

const Wizard = LazyLoading(() =>
  import('views/dashboard/widget/wizard/Wizard.jsx'),
);

const Manager = props => {
  const {
    match: {
      params: { id },
    },
    history,
  } = props;
  const { line, area, bar, pizza, donut, bubble } = __CONFIG__;

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
      case pizza:
        return t(['pizza.title', 'Pizza Chart']);
      case donut:
        return t(['donut.title', 'Donut Chart']);
      case bubble:
        return t(['bubble.title', 'Bubble Chart']);
      default:
        return '';
    }
  }, [area, bar, bubble, donut, line, id, pizza]);

  return <Wizard title={getTitle()} type={id} toDashboard={toDashboard} />;
};

export default Manager;
