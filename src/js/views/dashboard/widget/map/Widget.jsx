import React, { useCallback, useEffect, useRef } from 'react';

import { WidgetCard } from 'Components/Cards';
import { getMarkerColor } from 'Components/MapMarkers';
import _ from 'lodash';
import { Map, TileLayer, Marker, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import 'leaflet/dist/images/marker-shadow.png';

export default ({ id, onDelete, onPin, data, config, onEdit }) => {
  const mapRef = useRef();
  const { clientHeight, clientWidth } = !mapRef.current
    ? { clientHeight: 0, clientWidth: 0 }
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

  return (
    <WidgetCard id={id} onDelete={onDelete} onPin={onPin} config={config} onEdit={onEdit}>
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
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <MarkerClusterGroup>
          {config.map.map(item => {
            return _.isEmpty(data) ? null : (
              <Marker
                key={item.dataKey}
                position={data[item.dataKey] ? data[item.dataKey].value : [0, 0]}
                icon={getMarkerColor(item.markerColor)}
              >
                <GetToolTip {...item} />
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </Map>
    </WidgetCard>
  );
};
