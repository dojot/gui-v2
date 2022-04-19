import React from 'react';

import { WidgetCard } from 'sharedComponents/Cards';
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
import { formatDate, formatNumber } from 'sharedComponents/Utils';

export default ({ data, ...widgetProps }) => {
    return (
    <WidgetCard {...widgetProps}>
      <ResponsiveContainer width='100%' height='100%' minHeight='100%' minWidth='100%'>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <XAxis tickFormatter={formatDate} dataKey='timestamp' domain={['auto', 'auto']} />
          <YAxis domain={['auto', 'auto']} tickFormatter={formatNumber} />
          <CartesianGrid strokeDasharray='4 4' />
          <Tooltip />
          <Legend />
          {widgetProps.config.line.map(item => (
            <Line connectNulls isAnimationActive={false} key={item.dataKey} {...item} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </WidgetCard>
  );
};
