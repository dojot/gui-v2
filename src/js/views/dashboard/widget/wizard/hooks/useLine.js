import { useCallback } from 'react';

import { v4 as uuidv4 } from 'uuid';

export default (addWidget, addWidgetConfig, addWidgetSaga, generateScheme) => {
  const { line: lineID } = __CONFIG__;

  const generateLineConfig = useCallback(state => {
    const { attributes, general: generalState } = state;

    const meta = {
      title: generalState.name || '',
      subTitle: generalState.description || '',
    };

    const line = attributes.dynamicValues.map(item => ({
      type: 'monotone',
      dataKey: `${item.deviceID}${item.label}`,
      stroke: item.color,
      name: item.description || item.label,
    }));

    return { line, meta };
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
