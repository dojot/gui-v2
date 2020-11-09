import React from 'react';

import { WidgetCard } from 'Components/Cards';
import {
  Area,
  AreaChart,
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
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <defs>
            {config.defsProps.map(item => (
              <linearGradient {...item} key={item.id}>
                <stop offset='5%' stopColor={item.color} stopOpacity={0.8} />
                <stop offset='95%' stopColor={item.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <XAxis tickFormatter={formatDate} dataKey='timestamp' />
          <YAxis domain={['auto', 'auto']} tickFormatter={formatNumber} />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Legend />
          {config.areaProps.map(item => (
            <Area
              connectNulls
              {...item}
              isAnimationActive={false}
              key={item.dataKey}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </WidgetCard>
  );
};
