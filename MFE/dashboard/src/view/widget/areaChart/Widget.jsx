import React from 'react';

import { WidgetCard } from 'sharedComponents/Cards';
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
import { formatDate, formatNumber } from 'sharedComponents/Utils';

export default ({ data, ...widgetProps }) => {
  return (
    <WidgetCard {...widgetProps}>
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
            {widgetProps.config.defsProps.map(item => (
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
          {widgetProps.config.areaProps.map(item => (
            <Area connectNulls {...item} isAnimationActive={false} key={item.dataKey} />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </WidgetCard>
  );
};
