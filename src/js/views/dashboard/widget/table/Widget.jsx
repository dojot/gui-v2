import React, { useCallback } from 'react';

import { WidgetCard, NoData } from 'Components/Cards';
import { SimpleTable } from 'Components/Table';

const TableWidget = ({ id, data, config, onDelete, onPin, onEdit }) => {
  const { table } = config;

  const renderTable = useCallback(() => {
    if (data && data.length) {
      return <SimpleTable columns={table} rows={data} hasTimestamp />;
    }
    return <NoData />;
  }, [data, table]);
  return (
    <WidgetCard id={id} onDelete={onDelete} onPin={onPin} config={config}>
      {renderTable()}
    </WidgetCard>
  );
};

export default TableWidget;
