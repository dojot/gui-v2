import React from 'react';

import { WidgetCard } from 'Components/Cards';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatDate, formatNumber } from 'Utils';

export default ({ id, onDelete, onPin, data, config }) => {
  return (
    <WidgetCard id={id} onDelete={onDelete} onPin={onPin} config={config}>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 15,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis tickFormatter={formatDate} dataKey='timestamp' />
          <YAxis domain={['auto', 'auto']} tickFormatter={formatNumber} />
          <Tooltip />
          <Legend />
          {config.bar.map(item => (
            <Bar isAnimationActive={false} {...item} key={item.dataKey} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </WidgetCard>
  );
};
