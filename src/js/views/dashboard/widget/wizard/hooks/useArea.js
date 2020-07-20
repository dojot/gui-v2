import { useCallback } from 'react';

import { Device as DeviceService } from 'Services';
import { v4 as uuidv4 } from 'uuid';

export default (addWidget, addWidgetConfig, addWidgetSaga) => {
  const { area: areaID } = __CONFIG__;

  const generateAreaConfig = useCallback(state => {
    const { attributes, general: generalState } = state;

    const meta = {
      title: generalState.name || '',
      subTitle: generalState.description || '',
    };

    const areaProps = attributes.map(item => ({
      type: 'monotone',
      dataKey: item.attributeID,
      stroke: item.color,
      fillOpacity: 1,
      fill: `url(#color${item.attributeID})`,
      name: item.description || item.label,
    }));

    const defsProps = attributes.map(item => ({
      id: `color${item.attributeID}`,
      x1: '0',
      y1: '0',
      x2: '0',
      y2: '1',
      color: item.color,
    }));

    return { areaProps, defsProps, meta };
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

  const createAreaWidget = useCallback(
    attributes => {
      const widgetId = `${areaID}/${uuidv4()}`;

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
      addWidgetConfig({ [widgetId]: generateAreaConfig(attributes) });
      addWidgetSaga({ [widgetId]: generateScheme(attributes) });
    },
    [
      generateAreaConfig,
      addWidget,
      addWidgetSaga,
      addWidgetConfig,
      areaID,
      generateScheme,
    ],
  );

  return { createAreaWidget };
};
