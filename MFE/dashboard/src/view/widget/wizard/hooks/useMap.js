import { useCallback } from 'react';

import { SOURCE } from 'sharedComponents/Constants';
import { object2Array } from 'sharedComponents/Utils';
import { WIDGET } from 'sharedComponents/Constants';
import { v4 as uuidv4 } from 'uuid';

export default (addWidget, addWidgetConfig, addWidgetSaga, generateScheme, addWizardState) => {
  const mapID = WIDGET.MAP;

  const generateMapConfig = useCallback(state => {
    const { attributes, name, description, selector } = state;

    const meta = {
      title: name || '',
      subTitle: description || '',
    };

    let map;
    const isDevice = selector === SOURCE.DEVICE;
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
