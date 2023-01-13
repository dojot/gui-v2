import React from 'react';

import L from 'leaflet';
import './style.css';

export const getMarkerColor = color => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="marker" style="background: ${color}" />`,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });
};
