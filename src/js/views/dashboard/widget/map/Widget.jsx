import React from 'react';

import { WidgetCard } from 'Components/Cards';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
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
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <XAxis
            tickFormatter={formatDate}
            dataKey='timestamp'
            domain={['auto', 'auto']}
          />
          <YAxis domain={['auto', 'auto']} tickFormatter={formatNumber} />
          <CartesianGrid strokeDasharray='4 4' />
          <Tooltip />
          <Legend />
          {config.line.map(item => (
            <Line
              connectNulls
              isAnimationActive={false}
              key={item.dataKey}
              {...item}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </WidgetCard>
  );
};
