import { useCallback } from 'react';

import { object2Array } from 'sharedComponents/Utils';
import { WIDGET } from 'sharedComponents/Constants';
import { v4 as uuidv4 } from 'uuid';

export default (addWidget, addWidgetConfig, addWidgetSaga, generateScheme, addWizardState) => {
  const lineID = WIDGET.LINE;

  const generateLineConfig = useCallback(state => {
    const { attributes, general: generalState } = state;

    const meta = {
      title: generalState.name || '',
      subTitle: generalState.description || '',
    };

    const line = object2Array(attributes).map(item => ({
      type: 'monotone',
      dataKey: `${item.deviceID}${item.label}`,
      stroke: item.color,
      name: item.description || item.label,
    }));

    return { line, meta };
  }, []);

  const createLineWidget = useCallback(
    (attributes, id) => {
      const widgetId = id || `${lineID}/${uuidv4()}`;

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
      addWidgetConfig({ [widgetId]: generateLineConfig(attributes) });
      addWidgetSaga({ [widgetId]: generateScheme(attributes) });
      addWizardState({ [widgetId]: attributes });
    },
    [
      addWidget,
      addWidgetConfig,
      addWidgetSaga,
      lineID,
      generateLineConfig,
      generateScheme,
      addWizardState,
    ],
  );

  return { createLineWidget };
};
