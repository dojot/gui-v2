import React, { useCallback } from 'react';

import LazyLoading from 'Components/LazyLoading';

const Wizard = LazyLoading(() =>
  import('views/dashboard/widget/wizard/Wizard.jsx'),
);

const Manager = props => {
  const {
    match: { params },
    history,
  } = props;
  const { line, area, bar, pizza, donut, bubble } = __CONFIG__;

  const toDashboard = useCallback(() => {
    history.push('/dashboard');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTitle = useCallback(() => {
    switch (params.id) {
      case line:
        return 'Gráfico de Linha';
      case area:
        return 'Gráfico de Área';
      case bar:
        return 'Gráfico de Barra';
      case pizza:
        return 'Gráfico de Pizza';
      case donut:
        return 'Gráfico de Donut';
      case bubble:
        return 'Gráfico de Bolhas';
      default:
        return '';
    }
  }, [area, bar, bubble, donut, line, params.id, pizza]);

  return (
    <Wizard title={getTitle()} type={params.id} toDashboard={toDashboard} />
  );
};

export default Manager;
