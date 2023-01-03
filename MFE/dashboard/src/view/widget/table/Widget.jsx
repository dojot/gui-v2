import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { WidgetCard, NoData } from 'sharedComponents/Cards';
import { SimpleTable } from 'sharedComponents/Table';

const TableWidget = ({ data, ...widgetProps }) => {
  const { t } = useTranslation('dashboard');
  const { table } = widgetProps.config;

  const renderTable = useCallback(() => {
    if (data && data.length) {
      return (
        <SimpleTable
          columns={table}
          rows={data}
          hasTimestamp
          name={t('table.name')}
          updatedAt={t('table.updatedAt')}
        />
      );
    }
    return <NoData />;
  }, [data, table]);
  return <WidgetCard {...widgetProps}>{renderTable()}</WidgetCard>;
};

export default TableWidget;
