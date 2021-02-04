import { useCallback } from 'react';

import { v4 as uuidv4 } from 'uuid';

export default (addWidget, addWidgetConfig, addWidgetSaga, generateScheme) => {
  const { map: mapID } = __CONFIG__;

  const generateMapConfig = useCallback(state => {
    const { attributes, general: generalState } = state;

    const meta = {
      title: generalState.name || '',
      subTitle: generalState.description || '',
    };

    const dynamicAttr = attributes.dynamicValues.map(item => ({
      dataKey: `${item.deviceID}${item.label}`,
      name: item.description || item.label,
      markerColor: item.color,
    }));

    const staticAttr = attributes.staticValues.map(item => ({
      dataKey: `${item.deviceID}${item.label}`,
      name: item.description || item.label,
      markerColor: item.color,
    }));

    const map = dynamicAttr.concat(staticAttr);

    return { map, meta };
  }, []);

  const createMapWidget = useCallback(
    attributes => {
      const widgetId = `${mapID}/${uuidv4()}`;

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
      addWidgetConfig({ [widgetId]: generateMapConfig(attributes) });
      addWidgetSaga({ [widgetId]: generateScheme(attributes) });
    },
    [
      addWidget,
      addWidgetConfig,
      addWidgetSaga,
      mapID,
      generateMapConfig,
      generateScheme,
    ],
  );

  return { createMapWidget };
};
