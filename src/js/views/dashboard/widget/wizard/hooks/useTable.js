import { useCallback } from 'react';

import { v4 as uuidv4 } from 'uuid';

export default (addWidget, addWidgetConfig, addWidgetSaga, generateScheme) => {
  const { table: tableID } = __CONFIG__;

  const generateTableConfig = useCallback(state => {
    const { attributes, general: generalState } = state;

    const meta = {
      title: generalState.name || '',
      subTitle: generalState.description || '',
    };

    const table = attributes.dynamicValues.map(item => ({
      dataKey: `${item.deviceID}${item.label}`,
      name: item.description || item.label,
    }));

    return { table, meta };
  }, []);

  const createTableWidget = useCallback(
    attributes => {
      const widgetId = `${tableID}/${uuidv4()}`;

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
      addWidgetConfig({ [widgetId]: generateTableConfig(attributes) });
      addWidgetSaga({ [widgetId]: generateScheme(attributes) });
    },
    [
      addWidget,
      addWidgetConfig,
      addWidgetSaga,
      tableID,
      generateTableConfig,
      generateScheme,
    ],
  );

  return { createTableWidget };
};
