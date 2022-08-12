import { useCallback } from 'react';

import { object2Array } from 'sharedComponents/Utils';
import { WIDGET } from 'sharedComponents/Constants';
import { v4 as uuidv4 } from 'uuid';

export default (addWidget, addWidgetConfig, addWidgetSaga, generateScheme, addWizardState) => {
  const barID = WIDGET.BAR;

  const generateBarConfig = useCallback(state => {
    const { attributes, name, description } = state;

    const meta = {
      title: name || '',
      subTitle: description || '',
    };

    const bar = object2Array(attributes).map(item => ({
      dataKey: item.attributeID,
      fill: item.color,
      name: item.description || item.label,
    }));

    return { bar, meta };
  }, []);

  const createBarWidget = useCallback(
    (attributes, id) => {
      const widgetId = id || `${barID}/${uuidv4()}`;
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
      addWidgetConfig({ [widgetId]: generateBarConfig(attributes) });
      addWidgetSaga({ [widgetId]: generateScheme(attributes) });
      addWizardState({ [widgetId]: attributes });
    },
    [
      addWidget,
      addWidgetConfig,
      addWidgetSaga,
      barID,
      generateBarConfig,
      generateScheme,
      addWizardState,
    ],
  );

  return { createBarWidget };
};
