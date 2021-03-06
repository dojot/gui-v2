import { useCallback } from 'react';

import { object2Array } from 'Utils';
import { v4 as uuidv4 } from 'uuid';

export default (addWidget, addWidgetConfig, addWidgetSaga, generateScheme, addWizardState) => {
  const { table: tableID } = __CONFIG__;

  const generateTableConfig = useCallback(state => {
    const { attributes, general: generalState } = state;

    const meta = {
      title: generalState.name || '',
      subTitle: generalState.description || '',
    };

    const table = object2Array(attributes).map(item => ({
      dataKey: `${item.deviceID}${item.label}`,
      name: item.description || item.label,
    }));

    return { table, meta };
  }, []);

  const createTableWidget = useCallback(
    (attributes, id) => {
      const widgetId = id || `${tableID}/${uuidv4()}`;

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

      if (!id) {
        addWidget(newWidget);
      }
      addWidgetConfig({ [widgetId]: generateTableConfig(attributes) });
      addWidgetSaga({ [widgetId]: generateScheme(attributes) });
      addWizardState({ [widgetId]: attributes });
    },
    [
      addWidget,
      addWidgetConfig,
      addWidgetSaga,
      tableID,
      generateTableConfig,
      generateScheme,
      addWizardState,
    ],
  );

  return { createTableWidget };
};
