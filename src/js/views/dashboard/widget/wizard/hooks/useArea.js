import { useCallback } from 'react';

import { v4 as uuidv4 } from 'uuid';

export default (addWidget, addWidgetConfig, addWidgetSaga, generateScheme) => {
  const { area: areaID } = __CONFIG__;

  const generateAreaConfig = useCallback(state => {
    const { attributes, general: generalState } = state;

    const meta = {
      title: generalState.name || '',
      subTitle: generalState.description || '',
    };

    const areaProps = attributes.dynamicValues.map(item => ({
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
