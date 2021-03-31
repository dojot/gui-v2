import { useCallback } from 'react';

import { origin } from 'Constants';
import { object2Array } from 'Utils/module/array';
import { v4 as uuidv4 } from 'uuid';

export default (addWidget, addWidgetConfig, addWidgetSaga, generateScheme, addWizardState) => {
  const { map: mapID } = __CONFIG__;

  const generateMapConfig = useCallback(state => {
    const { attributes, general: generalState, selector } = state;

    const meta = {
      title: generalState.name || '',
      subTitle: generalState.description || '',
    };

    let map;
    const isDevice = selector === origin.DEVICE;
    if (isDevice) {
      map = object2Array(attributes).map(item => ({
        dataKey: `${item.deviceID}${item.label}`,
        name: item.description || item.label,
        markerColor: item.color,
      }));
    } else {
      map = {};
      object2Array(attributes).forEach(item => {
        map[item.attributeID] = {
          dataKey: `${item.deviceID}${item.label}`,
          name: item.description || item.label,
          markerColor: item.color,
        };
      });
    }

    return { map, meta, isDevice };
  }, []);

  const createMapWidget = useCallback(
    (attributes, id) => {
      const widgetId = id || `${mapID}/${uuidv4()}`;

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
      addWidgetConfig({ [widgetId]: generateMapConfig(attributes) });
      addWidgetSaga({ [widgetId]: generateScheme(attributes) });
      addWizardState({ [widgetId]: attributes });
    },
    [
      addWidget,
      addWidgetConfig,
      addWidgetSaga,
      mapID,
      generateMapConfig,
      generateScheme,
      addWizardState,
    ],
  );

  return { createMapWidget };
};
