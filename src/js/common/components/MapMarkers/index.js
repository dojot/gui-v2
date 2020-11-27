import beigeFilledMarker from 'Assets/images/markers/beige-pin.png';
import blackFilledMarker from 'Assets/images/markers/black-pin.png';
import blueFilledMarker from 'Assets/images/markers/blue-pin.png';
import burgundyFilledMarker from 'Assets/images/markers/burgundy-pin.png';
import darkBlueFilledMarker from 'Assets/images/markers/dark-blue-pin.png';
import darkGreenFilledMarker from 'Assets/images/markers/dark-green-pin.png';
import greenFilledMarker from 'Assets/images/markers/green-pin.png';
import lightGreenFilledMarker from 'Assets/images/markers/light-blue-pin.png';
import lightBlueFilledMarker from 'Assets/images/markers/light-green-pin.png';
import lightYellowFilledMarker from 'Assets/images/markers/light-yellow-pin.png';
import limeFilledMarker from 'Assets/images/markers/lime-pin.png';
import shadowFilledMarker from 'Assets/images/markers/markerShadow.png';
import orangeFilledMarker from 'Assets/images/markers/orange-pin.png';
import pinkFilledMarker from 'Assets/images/markers/pink-pin.png';
import purpleFilledMarker from 'Assets/images/markers/purple-pin.png';
import redFilledMarker from 'Assets/images/markers/red-pin.png';
import whiteFilledMarker from 'Assets/images/markers/white-pin.png';
import yellowFilledMarker from 'Assets/images/markers/yellow-pin.png';
import L from 'leaflet';

const getMarker = iconUrl => {
  return L.icon({
    iconUrl,
    shadowUrl: shadowFilledMarker,
    iconSize: [27, 41],
    iconAnchor: [13.5, 41],
    shadowSize: [52, 36],
    shadowAnchor: [9, 26],
  });
};

export const redMarker = getMarker(redFilledMarker);
export const yellowMarker = getMarker(yellowFilledMarker);
export const pinkMarker = getMarker(pinkFilledMarker);
export const beigeMarker = getMarker(beigeFilledMarker);
export const blackMarker = getMarker(blackFilledMarker);
export const blueMarker = getMarker(blueFilledMarker);
export const burgundyMarker = getMarker(burgundyFilledMarker);
export const darkBlueMarker = getMarker(darkBlueFilledMarker);
export const darkGreenMarker = getMarker(darkGreenFilledMarker);
export const greenMarker = getMarker(greenFilledMarker);
export const lightGreenMarker = getMarker(lightGreenFilledMarker);
export const lightBlueMarker = getMarker(lightBlueFilledMarker);
export const lightYellowMarker = getMarker(lightYellowFilledMarker);
export const limeMarker = getMarker(limeFilledMarker);
export const orangeMarker = getMarker(orangeFilledMarker);
export const purpleMarker = getMarker(purpleFilledMarker);
export const whiteMarker = getMarker(whiteFilledMarker);

export const getMarkerColor = color => {
  switch (color) {
    case '#b80000':
      return redMarker;
    case '#db3e00':
      return orangeMarker;
    case '#fccb00':
      return yellowMarker;
    case '#008b02':
      return darkGreenMarker;
    case '#006b76':
      return greenMarker;
    case '#1273de':
      return blueMarker;
    case '#004dcf':
      return darkBlueMarker;
    case '#5300eb':
      return purpleMarker;
    // case '#eb9694': return
    // case '#fad0c3': return ;
    case '#fef3bd':
      return beigeMarker;
    case '#c1e1c5':
      return limeMarker;
    case '#bedadc':
      return lightGreenMarker;
    // case '#c4def6': return
    // case '#bed3f3': return
    // case '#d4c4fb': return
    default:
      return blackMarker;
  }
};
