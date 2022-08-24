import { useCallback } from 'react';

import { object2Array } from 'sharedComponents/Utils';
import { WIDGET } from 'sharedComponents/Constants';
import { v4 as uuidv4 } from 'uuid';

export default (addWidget, addWidgetConfig, addWidgetSaga, generateScheme, addWizardState) => {
  const areaID = WIDGET.AREA;

  const generateAreaConfig = useCallback(state => {
    const { attributes, name, description } = state;

    const meta = {
      title: name || '',
      subTitle: description || '',
    };

    const areaProps = object2Array(attributes).map(item => ({
      type: 'monotone',
      dataKey: item.attributeID,
      stroke: item.color,
      fillOpacity: 1,
      fill: `url(#color${item.attributeID})`,
      name: item.description || item.label,
    }));

    const defsProps = object2Array(attributes).map(item => ({
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
    (attributes, id) => {
      const widgetId = id || `${areaID}/${uuidv4()}`;

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
      addWidgetConfig({ [widgetId]: generateAreaConfig(attributes) });
      addWidgetSaga({ [widgetId]: generateScheme(attributes) });
      addWizardState({ [widgetId]: attributes });
    },
    [
      generateAreaConfig,
      addWidget,
      addWidgetSaga,
      addWidgetConfig,
      areaID,
      generateScheme,
      addWizardState,
    ],
  );

  return { createAreaWidget };
};
