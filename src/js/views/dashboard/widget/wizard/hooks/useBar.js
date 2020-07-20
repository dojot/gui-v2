import { useCallback } from 'react';

import { Device as DeviceService } from 'Services';
import { v4 as uuidv4 } from 'uuid';

export default (addWidget, addWidgetConfig, addWidgetSaga) => {
  const { bar: barID } = __CONFIG__;

  const generateBarConfig = useCallback(state => {
    const { attributes, general: generalState } = state;

    const meta = {
      title: generalState.name || '',
      subTitle: generalState.description || '',
    };

    const bar = attributes.map(item => ({
      dataKey: item.attributeID,
      fill: item.color,
      name: item.description || item.label,
    }));

    return { bar, meta };
  }, []);

  const generateScheme = useCallback(state => {
    return DeviceService.parseHistoryQuery({
      devices: _.values(
        _.mapValues(_.groupBy(state.attributes, 'deviceID'), (value, key) => ({
          deviceID: key,
          attrs: value.map(val => val.label),
        })),
      ),
      lastN: 15,
    });
  }, []);

  const createBarWidget = useCallback(
    attributes => {
      const widgetId = `${barID}/${uuidv4()}`;
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
      addWidgetConfig({ [widgetId]: generateBarConfig(attributes) });
      addWidgetSaga({ [widgetId]: generateScheme(attributes) });
    },
    [
      addWidget,
      addWidgetConfig,
      addWidgetSaga,
      barID,
      generateBarConfig,
      generateScheme,
    ],
  );

  return { createBarWidget };
};
