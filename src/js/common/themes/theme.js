import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import RalewayTtf from 'Assets/fonts/Raleway-Regular.ttf';

const raleway = {
  fontFamily: 'Raleway',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Raleway'),
    local('Raleway-Regular'),
    url(${RalewayTtf}) format('ttf')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Raleway, Arial',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [raleway],
      },
    },
    MuiMenuItem: {
      root: {
        '&$selected': {
          backgroundColor: 'rgba(13, 123, 191, 0.1)',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#4788DC',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#EEE',
    },
  },
});

export default theme;
