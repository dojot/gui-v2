import React, { useCallback } from 'react';

import { WidgetCard, NoData } from 'Components/Cards';
import { SimpleTable } from 'Components/Table';

const TableWidget = ({ data, ...widgetProps }) => {
  const { table } = widgetProps.config;

  const renderTable = useCallback(() => {
    if (data && data.length) {
      return <SimpleTable columns={table} rows={data} hasTimestamp />;
    }
    return <NoData />;
  }, [data, table]);
  return <WidgetCard {...widgetProps}>{renderTable()}</WidgetCard>;
};

export default TableWidget;
