import { useCallback } from 'react';

import _ from 'lodash';
import { Device as DeviceService } from 'Services';
import { v4 as uuidv4 } from 'uuid';

export default (addWidget, addWidgetConfig, addWidgetSaga) => {
  const { line: lineID } = __CONFIG__;

  const generateLineConfig = useCallback(state => {
    const { attributes, general: generalState } = state;

    const meta = {
      title: generalState.name || '',
      subTitle: generalState.description || '',
    };

    const line = attributes.map(item => ({
      type: 'monotone',
      dataKey: `${item.deviceID}${item.label}`,
      stroke: item.color,
      name: item.description || item.label,
    }));

    return { line, meta };
  }, []);

  const generateScheme = useCallback(state => {
    const { lastN, operationType, dateFrom, dateTo, isRealTime } = state.filter;

    return DeviceService.parseHistoryQuery({
      devices: _.values(
        _.mapValues(_.groupBy(state.attributes, 'deviceID'), (value, key) => ({
          deviceID: key,
          attrs: value.map(val => val.label),
        })),
      ),
      dateFrom,
      dateTo,
      operationType,
      lastN,
      isRealTime,
    });
  }, []);

  const createLineWidget = useCallback(
    attributes => {
      const widgetId = `${lineID}/${uuidv4()}`;

      const newWidget = {
        i: widgetId,
        x: 0,
        y: Infinity,
        w: 6,
        h: 10,
        minW: 3,
        minH: 6,
        static: false,
        moved: false,
      };

      addWidget(newWidget);
      addWidgetConfig({ [widgetId]: generateLineConfig(attributes) });
      addWidgetSaga({ [widgetId]: generateScheme(attributes) });
    },
    [
      addWidget,
      addWidgetConfig,
      addWidgetSaga,
      lineID,
      generateLineConfig,
      generateScheme,
    ],
  );

  return { createLineWidget };
};
