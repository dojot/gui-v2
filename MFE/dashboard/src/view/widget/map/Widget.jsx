import React, { useCallback, useEffect, useRef } from 'react';

import { IMAGERY_MODE } from 'sharedComponents/Constants';
import { WidgetCard } from 'sharedComponents/Cards';
import { getMarkerColor } from 'sharedComponents/MapMarkers';
import _ from 'lodash';
import { Map, TileLayer, Marker, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import 'leaflet/dist/images/marker-shadow.png';

export default ({ data, ...widgetProps }) => {
  const mapRef = useRef();
  const { clientHeight, clientWidth } = !mapRef.current
    ? {
        clientHeight: 0,
        clientWidth: 0,
      }
    : mapRef.current.container;

  useEffect(() => {
    mapRef.current.leafletElement.invalidateSize();
  }, [clientHeight, clientWidth]);

  const getBounds = useCallback(list => {
    const coordinates = _.isEmpty(list) ? [[0, 0]] : [];
    if (list) {
      Object.keys(list).forEach(key => {
        coordinates.push(list[key].value);
      });
    }
    return coordinates;
  }, []);
  const GetToolTip = useCallback(
    item => {
      const label = data[item.dataKey] ? data[item.dataKey].deviceLabel : 'undefined';
      return (
        <Tooltip>
          <span>{`${label}: ${item.name}`}</span>
        </Tooltip>
      );
    },
    [data],
  );

  const getMarkers = map => {
    if (_.isEmpty(data)) return null;
    const markers = [];
    if (widgetProps.config.isDevice) {
      map.forEach(item => {
        markers.push(
          <Marker
            key={item.dataKey}
            position={data[item.dataKey] ? data[item.dataKey].value : [0, 0]}
            icon={getMarkerColor(item.markerColor)}
          >
            <GetToolTip {...item} />
          </Marker>,
        );
      });
    } else {
      Object.values(data).forEach(device => {
        const { templateKey, value = [0, 0], deviceLabel = '' } = device;
        markers.push(
          <Marker
            key={`${map[templateKey].name}_${deviceLabel}_${templateKey}`}
            position={value}
            icon={getMarkerColor(map[templateKey].markerColor)}
          >
            <Tooltip>
              <span>{`${deviceLabel}: ${map[templateKey].name}`}</span>
            </Tooltip>
          </Marker>,
        );
      });
    }
    return markers;
  };

  return (
    <WidgetCard {...widgetProps}>
      <Map
        ref={mapRef}
        className='markercluster-map'
        bounds={getBounds(data)}
        zoom={7}
        maxZoom={18}
        minZoom={2}
        style={{
          height: '100%',
          width: '100%',
          borderRadius: 5,
          overflow: 'hidden',
        }}
      >
        <TileLayer
          url={IMAGERY_MODE.LIGHT}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <MarkerClusterGroup>{getMarkers(widgetProps.config.map)}</MarkerClusterGroup>
      </Map>
    </WidgetCard>
  );
};
